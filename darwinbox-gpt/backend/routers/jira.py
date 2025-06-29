from fastapi import APIRouter
from services.jira_integration import fetch_jira_tickets

router = APIRouter(prefix="/jira", tags=["jira"])

@router.get("/tickets")
def get_jira_tickets():
    return fetch_jira_tickets()