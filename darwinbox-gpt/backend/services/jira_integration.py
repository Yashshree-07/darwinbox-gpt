import requests

# Dummy config, replace with real credentials and URL
JIRA_URL = "https://yourcompany.atlassian.net/rest/api/2/search"
JIRA_USER = "jira-user@example.com"
JIRA_TOKEN = "your-jira-api-token"

# Example: fetch open tickets assigned to a user

def fetch_jira_tickets():
    # This is a dummy implementation. Uncomment and configure for real use.
    # response = requests.get(
    #     JIRA_URL,
    #     params={"jql": "assignee=currentUser() AND status=Open"},
    #     auth=(JIRA_USER, JIRA_TOKEN)
    # )
    # return response.json().get("issues", [])
    return [
        {"id": "JIRA-101", "status": "Open", "description": "Fix login bug"},
        {"id": "JIRA-102", "status": "In Progress", "description": "Update onboarding flow"}
    ] 