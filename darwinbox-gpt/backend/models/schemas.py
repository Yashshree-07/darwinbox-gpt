from pydantic import BaseModel

class ChatRequest(BaseModel):
    query: str

class ChatResponse(BaseModel):
    response: str

class EmailSummary(BaseModel):
    subject: str
    sentiment: str
    summary: str

class EmailReply(BaseModel):
    reply: str
