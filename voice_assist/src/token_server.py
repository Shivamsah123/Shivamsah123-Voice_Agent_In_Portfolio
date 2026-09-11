import os
import uuid
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from livekit import api

# Load .env.local first (local dev), then .env (fallback)
# On Render/production, env vars are injected directly — dotenv is a no-op
load_dotenv(Path(__file__).resolve().parents[1] / ".env.local")
load_dotenv(Path(__file__).resolve().parents[1] / ".env", override=False)

app = FastAPI()

# CORS: allow all origins (portfolio on Vercel, localhost dev)
# For tighter security, replace "*" with your Vercel URL after deploy
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "*").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {
        "message": "Voice Agent Token Server is running"
    }


@app.get("/token")
async def get_token(agent: str = "voice"):

    # Select agent name based on mode ("text" -> "text-agent", otherwise "my-agent")
    agent_name = "text-agent" if agent in ("text", "text-agent") else "my-agent"

    # Create a NEW room for every call
    room_name = (
        f"shivam-portfolio-{uuid.uuid4().hex[:8]}"
    )

    # Create a NEW participant identity
    participant_identity = (
        f"portfolio-user-{uuid.uuid4().hex[:8]}"
    )

    token = (
        api.AccessToken(
            os.getenv("LIVEKIT_API_KEY"),
            os.getenv("LIVEKIT_API_SECRET"),
        )
        .with_identity(participant_identity)
        .with_name("Portfolio User")
        .with_grants(
            api.VideoGrants(
                room_join=True,
                room=room_name,
                can_publish=True,
                can_subscribe=True,
            )
        )
        .with_room_config(
            api.RoomConfiguration(
                agents=[
                    api.RoomAgentDispatch(
                        agent_name=agent_name,
                    )
                ]
            )
        )
        .to_jwt()
    )

    return {
        "token": token,
        "roomName": room_name,
        "livekitUrl": os.getenv("LIVEKIT_URL"),
    }
