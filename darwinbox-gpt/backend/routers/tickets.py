from fastapi import APIRouter

router = APIRouter(prefix="/tickets", tags=["tickets"])

@router.get("/")
def get_all_tickets():
    return [
        {"id": 1, "title": "Login issue", "status": "Open"},
        {"id": 2, "title": "App crash", "status": "Resolved"}
    ]