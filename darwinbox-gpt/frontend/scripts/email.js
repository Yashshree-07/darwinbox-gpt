const emailLoading = document.getElementById('email-loading');
const emailList = document.getElementById('email-list');
emailLoading.style.display = 'block';
fetch('/api/emails/summary')
    .then(res => res.json())
    .then(data => {
        emailLoading.style.display = 'none';
        emailList.innerHTML = data.map(e => `
            <li>
                <strong>${e.subject}</strong><br>
                <span>Sentiment: <b>${e.sentiment}</b></span><br>
                <span>Summary: ${e.summary}</span>
            </li>`).join('');
    })
    .catch(() => {
        emailLoading.style.display = 'none';
        emailList.innerHTML = '<li style="color:#d9534f;">Error loading emails.</li>';
    });

function sendChat() {
    const input = document.getElementById('chat-input').value;
    fetch('/api/chat/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: input })
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById('chat-response').innerText = data.response;
    })
    .catch(() => {
        document.getElementById('chat-response').innerText = "Error contacting server.";
    });
}