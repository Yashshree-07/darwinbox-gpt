def summarize_text(text: str) -> str:
    sentences = text.split('.')
    return '. '.join(sentences[:2]) + '.' if len(sentences) >= 2 else text
