import { useState, useRef, useEffect } from 'react';
import { Room, RoomEvent, Track } from 'livekit-client';
import { Mic, PhoneOff, X, MessageSquare, Send } from 'lucide-react';
import './VoiceAgent.css';

const TOKEN_SERVER_URL = 'http://localhost:8000';

const VoiceAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [activeMode, setActiveMode] = useState('voice'); // 'voice' | 'text'
  const [room, setRoom] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [liveTranscript, setLiveTranscript] = useState('');
  const [agentState, setAgentState] = useState('idle');
  const [textInput, setTextInput] = useState('');

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, liveTranscript]);

  const toggleMicrophone = async () => {
    if (!room) return;
    const newMutedState = !isMuted;
    await room.localParticipant.setMicrophoneEnabled(!newMutedState);
    setIsMuted(newMutedState);
  };

  const connectToAgent = async (mode = 'voice') => {
    try {
      setIsConnecting(true);
      setActiveMode(mode);
      setIsOpen(true);
      setMessages([]);
      setLiveTranscript('');
      setTextInput('');
      setAgentState('connecting');

      // 1. Get token from Python backend (voice -> my-agent, text -> text-agent)
      const response = await fetch(
        `${TOKEN_SERVER_URL}/token?agent=${mode}`
      );

      if (!response.ok) {
        throw new Error(
          `Token request failed: ${response.status}`
        );
      }

      const data = await response.json();

      if (!data.token || !data.livekitUrl) {
        throw new Error(
          'Token response is missing token or LiveKit URL'
        );
      }

      console.log(`LiveKit token received for ${mode} agent`);

      // 2. Create LiveKit Room
      const newRoom = new Room();

      // Helper to append assistant messages avoiding immediate duplicates
      const addAssistantMessage = (rawText) => {
        const text = (rawText || '').trim();
        if (!text) return;

        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last && last.role === 'assistant' && last.text === text) {
            return prev;
          }
          return [
            ...prev,
            {
              id: `${Date.now()}-${Math.random()}`,
              role: 'assistant',
              text,
            },
          ];
        });
        setAgentState('listening');
      };

      // 3. Audio handling (for Voice Mode)
      if (mode === 'voice') {
        newRoom.on(
          RoomEvent.TrackSubscribed,
          (track, publication, participant) => {
            console.log('Track subscribed:', track.kind, participant.identity);

            if (track.kind === Track.Kind.Audio) {
              const audioElement = track.attach();
              audioElement.autoplay = true;
              audioElement.setAttribute('data-livekit-audio', 'true');
              document.body.appendChild(audioElement);

              audioElement.play().catch((error) => {
                console.error('Audio playback failed:', error);
              });

              setAgentState('speaking');
            }
          }
        );
      }

      // 4. Transcription received (Both Voice and Text stream output)
      newRoom.on(
        RoomEvent.TranscriptionReceived,
        (segments, participant) => {
          const isUser =
            participant?.identity === newRoom.localParticipant.identity;

          for (const segment of segments) {
            const text = segment.text?.trim();
            if (!text) continue;

            if (!segment.final) {
              setLiveTranscript(text);
              setAgentState(isUser ? 'listening' : 'speaking');
              continue;
            }

            setMessages((previousMessages) => {
              const last = previousMessages[previousMessages.length - 1];
              if (last && last.text === text && last.role === (isUser ? 'user' : 'assistant')) {
                return previousMessages;
              }
              return [
                ...previousMessages,
                {
                  id: `${Date.now()}-${Math.random()}`,
                  role: isUser ? 'user' : 'assistant',
                  text,
                },
              ];
            });

            setLiveTranscript('');
            setAgentState(isUser ? 'listening' : 'speaking');
          }
        }
      );

      // 5. Data Packet handling (For Text Agent responses)
      newRoom.on(RoomEvent.DataReceived, (payload, participant) => {
        try {
          const decoded = new TextDecoder().decode(payload);
          console.log('DataReceived packet:', decoded, participant?.identity);

          const isUser =
            participant?.identity === newRoom.localParticipant.identity;

          if (!isUser && decoded) {
            let messageText = decoded;
            try {
              const jsonMsg = JSON.parse(decoded);
              if (jsonMsg.message) {
                messageText = jsonMsg.message;
              }
            } catch (e) {
              // Plain string
            }
            addAssistantMessage(messageText);
          }
        } catch (err) {
          console.error('Error in DataReceived:', err);
        }
      });

      // 6. LiveKit Chat Message Event
      newRoom.on(RoomEvent.ChatMessageReceived, (message, participant) => {
        const isUser =
          participant?.identity === newRoom.localParticipant.identity;
        if (!isUser && message?.message) {
          addAssistantMessage(message.message);
        }
      });

      // 7. LiveKit Text Stream Handler
      try {
        newRoom.registerTextStreamHandler('lk.chat', async (reader, participant) => {
          const isUser =
            participant?.identity === newRoom.localParticipant.identity;
          const text = await reader.readAll();
          if (!isUser && text) {
            addAssistantMessage(text);
          }
        });
      } catch (e) {
        console.warn('TextStreamHandler registration note:', e);
      }

      // 8. Handle Disconnection (Timer or room deletion)
      newRoom.on(RoomEvent.Disconnected, (reason) => {
        console.log('LiveKit room disconnected:', reason);
        cleanupUI();
      });

      // 9. Handle participant disconnection
      newRoom.on(RoomEvent.ParticipantDisconnected, (participant) => {
        console.log('Participant left:', participant?.identity);
        if (newRoom.remoteParticipants.size === 0) {
          newRoom.disconnect();
          cleanupUI();
        }
      });

      // 10. Connect to LiveKit
      await newRoom.connect(data.livekitUrl, data.token);
      console.log('Connected to LiveKit Room');

      // 11. Enable microphone only if in voice mode
      if (mode === 'voice') {
        await newRoom.localParticipant.setMicrophoneEnabled(true);
        console.log('Microphone enabled');
      }

      setRoom(newRoom);
      setIsConnected(true);
      setIsConnecting(false);
      setAgentState('listening');

    } catch (error) {
      console.error('Agent connection failed:', error);
      setIsConnecting(false);
      setIsConnected(false);
      setAgentState('idle');
      alert(`Could not connect to the AI ${mode} assistant.`);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!textInput.trim() || !room || !isConnected) return;

    const userText = textInput.trim();
    setTextInput('');

    // Add user message to UI immediately
    setMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random()}`,
        role: 'user',
        text: userText,
      },
    ]);
    setAgentState('speaking');

    try {
      // 1. Data Packet (Primary reliable payload)
      const payload = new TextEncoder().encode(
        JSON.stringify({
          role: 'user',
          message: userText,
        })
      );
      await room.localParticipant.publishData(payload, {
        topic: 'lk.chat',
        reliable: true,
      });

      // 2. Built-in sendText
      if (room.localParticipant.sendText) {
        await room.localParticipant.sendText(userText, { topic: 'lk.chat' });
      }

      // 3. Built-in sendChatMessage
      if (room.localParticipant.sendChatMessage) {
        await room.localParticipant.sendChatMessage(userText);
      }
    } catch (err) {
      console.error('Failed to send text message:', err);
    }
  };

  const cleanupUI = () => {
    const audioElements = document.querySelectorAll(
      'audio[data-livekit-audio="true"]'
    );
    audioElements.forEach((audio) => {
      audio.pause();
      audio.srcObject = null;
      audio.remove();
    });

    setRoom(null);
    setMessages([]);
    setLiveTranscript('');
    setTextInput('');
    setIsConnected(false);
    setIsConnecting(false);
    setIsMuted(false);
    setAgentState('idle');
    setIsOpen(false);
  };

  const disconnectFromAgent = () => {
    if (room) {
      room.disconnect();
    }
    cleanupUI();
  };

  return (
    <>
      {/* AI ACTION BUTTONS */}
      <div className="ai-buttons-group">
        <button
          type="button"
          className="voice-agent-button"
          onClick={() => connectToAgent('voice')}
          disabled={isConnecting || isConnected}
        >
          <Mic size={18} />
          {isConnecting && activeMode === 'voice'
            ? 'Connecting...'
            : isConnected && activeMode === 'voice'
              ? 'Connected'
              : 'Talk to My AI'}
        </button>

        <button
          type="button"
          className="chat-textbox-button"
          onClick={() => connectToAgent('text')}
          disabled={isConnecting || isConnected}
        >
          <MessageSquare size={18} />
          {isConnecting && activeMode === 'text'
            ? 'Connecting...'
            : isConnected && activeMode === 'text'
              ? 'Chatting...'
              : 'Chat in Textbox'}
        </button>
      </div>

      {/* MODAL (VOICE OR TEXT CHAT) */}
      {isOpen && (
        <div className="voice-agent-overlay">
          <div className="voice-agent-modal">

            {/* HEADER */}
            <div className="voice-agent-header">
              <div>
                <h3>
                  {activeMode === 'text'
                    ? 'AI Text Chat (Kaira)'
                    : 'AI Voice Assistant'}
                </h3>

                <span
                  className={
                    isConnected
                      ? 'voice-agent-status connected'
                      : 'voice-agent-status'
                  }
                >
                  {agentState === 'connecting'
                    ? '● Connecting...'
                    : agentState === 'listening'
                      ? activeMode === 'text'
                        ? '● Ready to chat'
                        : '● Listening...'
                      : agentState === 'speaking'
                        ? '● AI Replying...'
                        : '● Ready'}
                </span>
              </div>

              <button
                type="button"
                className="voice-agent-close"
                onClick={disconnectFromAgent}
              >
                <X size={22} />
              </button>
            </div>

            {/* CONVERSATION HISTORY */}
            <div className="voice-agent-conversation">
              {messages.length === 0 && !liveTranscript ? (
                <div className="agent-message">
                  <span className="message-label">AI</span>
                  <p>
                    {activeMode === 'text'
                      ? "Hi, my name is Kaira! Type any weather question below to chat."
                      : "Hello! I'm Shivam's AI assistant. How can I help you?"}
                  </p>
                </div>
              ) : (
                <>
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={
                        message.role === 'user'
                          ? 'user-message'
                          : 'agent-message'
                      }
                    >
                      <span className="message-label">
                        {message.role === 'user' ? 'YOU' : 'AI'}
                      </span>
                      <p>{message.text}</p>
                    </div>
                  ))}

                  {/* LIVE TRANSCRIPT (VOICE MODE) */}
                  {liveTranscript && (
                    <div className="live-transcript">
                      <span className="message-label">
                        {agentState === 'listening' ? 'YOU' : 'AI'}
                      </span>
                      <p>{liveTranscript}</p>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* TEXT INPUT FORM (FOR TEXT CHAT MODE) */}
            {activeMode === 'text' && (
              <form onSubmit={handleSendMessage} className="voice-agent-input-form">
                <input
                  type="text"
                  className="voice-agent-text-input"
                  placeholder="Type your message to Kaira..."
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  autoFocus
                />
                <button
                  type="submit"
                  className="voice-agent-send-button"
                  disabled={!textInput.trim()}
                >
                  <Send size={18} />
                </button>
              </form>
            )}

            {/* CONTROLS */}
            <div className="voice-agent-controls">
              {activeMode === 'voice' && (
                <button
                  type="button"
                  className={`mic-button ${isMuted ? 'muted' : ''}`}
                  onClick={toggleMicrophone}
                  disabled={!isConnected}
                  title="Toggle Mic"
                >
                  <Mic size={20} />
                </button>
              )}

              <button
                type="button"
                className="end-call-button"
                onClick={disconnectFromAgent}
              >
                <PhoneOff size={18} />
                {activeMode === 'text' ? 'End Chat' : 'End Call'}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default VoiceAgent;