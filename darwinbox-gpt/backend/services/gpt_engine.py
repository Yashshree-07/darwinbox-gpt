import openai
from config import OPENAI_API_KEY

openai.api_key = OPENAI_API_KEY

SYSTEM_PROMPT = (
    "You are DarwinboxGPT, an assistant for company employees. "
    "Always provide factual, concise answers based on company data, tickets, JIRA, and emails. "
    "If you don't know the answer, say so. Do not make up information."
)

def ask_gpt(prompt: str) -> str:
    # Sample conversation simulation for demo/testing
    if prompt.strip().lower() == "what are my tickets?":
        return (
            "You have 2 open tickets:\n"
            "1. Ticket #123: Login issue - Status: Open\n"
            "2. Ticket #456: Payroll discrepancy - Status: In Progress"
        )
    if "summarize the latest email from client" in prompt.strip().lower():
        return (
            "The latest email from the client is regarding the project deadline. "
            "They have requested an update on the current status and are concerned about potential delays."
        )
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": prompt}
        ]
    )
    return response.choices[0].message.content
