from fastapi import APIRouter
from services.email_reader import fetch_emails
from services.sentiment_analyzer import analyze_sentiment
from services.summarizer import summarize_text
from services.reply_generator import generate_reply
from models.schemas import EmailSummary, EmailReply

router = APIRouter(prefix="/emails", tags=["emails"])

@router.get("/summary", response_model=list[EmailSummary])
def get_summaries():
    emails = fetch_emails()
    return [
        EmailSummary(
            subject=e["subject"],
            sentiment=analyze_sentiment(e["body"]),
            summary=summarize_text(e["body"])
        ) for e in emails
    ]

@router.post("/reply", response_model=EmailReply)
def generate_email_reply(summary: EmailSummary):
    reply = generate_reply(summary.summary)
    return EmailReply(reply=reply)
