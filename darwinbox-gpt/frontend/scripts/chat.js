let chatHistory = [];

function renderChatHistory() {
    const historyDiv = document.getElementById('chat-history');
    if (!historyDiv) return;
    if (chatHistory.length === 0) {
        historyDiv.innerHTML = '<div style="color:#888;">Start a conversation with Darwinbox GPT!</div>';
        return;
    }
    historyDiv.innerHTML = chatHistory.map(msg =>
        `<div style="margin-bottom:10px;">
            <span style="font-weight:bold;color:#007BFF;">You:</span> ${msg.user}<br>
            <span style="font-weight:bold;color:#222;">GPT:</span> ${msg.gpt}
        </div>`
    ).join('');
    historyDiv.scrollTop = historyDiv.scrollHeight;
}

function sendChat() {
    const inputElem = document.getElementById('chat-input');
    const input = inputElem.value;
    const loadingElem = document.getElementById('chat-loading');
    if (!input.trim()) return;
    loadingElem.style.display = 'block';
    inputElem.value = '';
    fetch('/api/chat/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: input })
    })
    .then(res => res.json())
    .then(data => {
        loadingElem.style.display = 'none';
        chatHistory.push({ user: input, gpt: data.response });
        renderChatHistory();
    })
    .catch(() => {
        loadingElem.style.display = 'none';
        chatHistory.push({ user: input, gpt: "Sorry, I couldn't reach the server. Please try again later." });
        renderChatHistory();
    });
}

// Sample questions logic (unchanged, but update to use chat window)
const sampleQuestions = [
    "What are my open tickets?",
    "Summarize the latest email from HR.",
    "Show me unresolved JIRA issues.",
    "What complaints are pending for my team?",
    "Draft a reply to the customer about ticket #123."
];

function renderSampleQuestions() {
    const container = document.createElement('div');
    container.id = 'sample-questions';
    container.style.marginTop = '18px';
    container.innerHTML = '<div style="font-size:0.98em;color:#888;margin-bottom:6px;">Try asking:</div>' +
        sampleQuestions.map(q => `<button class="sample-q-btn" onclick="sendSampleQuestion('${q.replace(/'/g, "\\'")}')">${q}</button>`).join(' ');
    const chatDiv = document.getElementById('chat-history').parentNode;
    chatDiv.appendChild(container);
}

window.sendSampleQuestion = function(q) {
    document.getElementById('chat-input').value = q;
    sendChat();
};

// On load, render the chat history and sample questions
if (document.getElementById('chat-history')) {
    renderChatHistory();
    renderSampleQuestions();
}
