import os
import signal
import subprocess
import sys
import time

def main():
    print("==================================================")
    print("Starting Kaira Voice Agent (src/agent2.py)...")
    print("==================================================")
    p_voice = subprocess.Popen([sys.executable, "src/agent2.py", "start"])

    print("==================================================")
    print("Starting Kaira Text Agent (src/agent3.py)...")
    print("==================================================")
    p_text = subprocess.Popen([sys.executable, "src/agent3.py", "start"])

    def shutdown(signum=None, frame=None):
        print("Shutting down agents...")
        p_voice.terminate()
        p_text.terminate()
        try:
            p_voice.wait(timeout=5)
        except subprocess.TimeoutExpired:
            p_voice.kill()
        try:
            p_text.wait(timeout=5)
        except subprocess.TimeoutExpired:
            p_text.kill()
        sys.exit(0)

    try:
        signal.signal(signal.SIGINT, shutdown)
        signal.signal(signal.SIGTERM, shutdown)
    except (ValueError, AttributeError):
        pass

    try:
        while True:
            if p_voice.poll() is not None:
                print(f"Voice agent (agent2.py) exited with code {p_voice.returncode}")
                shutdown()
            if p_text.poll() is not None:
                print(f"Text agent (agent3.py) exited with code {p_text.returncode}")
                shutdown()
            time.sleep(2)
    except KeyboardInterrupt:
        shutdown()

if __name__ == "__main__":
    main()
