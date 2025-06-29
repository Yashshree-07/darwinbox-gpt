from services.gpt_engine import ask_gpt

def generate_reply(summary: str) -> str:
    prompt = f"Generate a professional reply to the following summary:\n{summary}"
    return ask_gpt(prompt)
