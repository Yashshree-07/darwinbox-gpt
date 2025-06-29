import os

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "your-default-api-key")
EMAIL_CREDENTIALS = {
    "email": os.getenv("EMAIL_ID", "user@example.com"),
    "password": os.getenv("EMAIL_PASS", "yourpassword")
}