from fastapi import APIRouter

router = APIRouter(prefix="/nudges", tags=["nudges"])

@router.get("/")
def get_nudges():
    return [
        {"priority": "High", "message": "Critical ticket unresolved for 48 hrs. Please review Ticket #123."},
        {"priority": "Medium", "message": "You have a new email from HR regarding policy updates. Please respond."},
        {"priority": "High", "message": "JIRA issue JIRA-456 is overdue. Update the status or add a comment."},
        {"priority": "Low", "message": "Reminder: Daily standup pending response."},
        {"priority": "Medium", "message": "Customer complaint received: Login not working for user X."},
        {"priority": "High", "message": "You have 3 unread important emails. Check your inbox."},
        {"priority": "Medium", "message": "Ticket #789 has been resolved. Please close the loop with the customer."},
        {"priority": "Low", "message": "Don't forget to submit your weekly report by EOD."}
    ]
