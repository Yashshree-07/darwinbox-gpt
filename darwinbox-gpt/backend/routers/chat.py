from fastapi import APIRouter
from services.gpt_engine import ask_gpt
from models.schemas import ChatRequest, ChatResponse

router = APIRouter(prefix="/chat", tags=["chat"])

@router.post("/ask", response_model=ChatResponse)
def ask_question(request: ChatRequest):
    reply = ask_gpt(request.query)
    return ChatResponse(response=reply)