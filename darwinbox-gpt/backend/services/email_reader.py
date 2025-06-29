import imaplib
import email
from config import EMAIL_CREDENTIALS

# Dummy implementation for now

def fetch_emails():
    # Uncomment and configure for real use
    # mail = imaplib.IMAP4_SSL('imap.gmail.com')
    # mail.login(EMAIL_CREDENTIALS['email'], EMAIL_CREDENTIALS['password'])
    # mail.select('inbox')
    # status, data = mail.search(None, 'ALL')
    # email_ids = data[0].split()
    # emails = []
    # for eid in email_ids[-10:]:  # last 10 emails
    #     status, msg_data = mail.fetch(eid, '(RFC822)')
    #     msg = email.message_from_bytes(msg_data[0][1])
    #     subject = msg['subject']
    #     body = ""
    #     if msg.is_multipart():
    #         for part in msg.walk():
    #             if part.get_content_type() == 'text/plain':
    #                 body = part.get_payload(decode=True).decode()
    #     else:
    #         body = msg.get_payload(decode=True).decode()
    #     emails.append({"subject": subject, "body": body})
    # mail.logout()
    # return emails
    return [
        {"subject": "Project deadline", "body": "The deadline is approaching soon. Please submit your reports."},
        {"subject": "Team meeting", "body": "Reminder for the 11 AM sync-up."}
    ]
