window.toggleNudgesPopup = function() {
    const popup = document.getElementById('nudges-popup');
    popup.style.display = popup.style.display === 'none' ? 'flex' : 'none';
    if (popup.style.display === 'flex') {
        loadNudges();
    }
};

function loadNudges() {
    const list = document.getElementById('nudges-list');
    list.innerHTML = '<li>Loading...</li>';
    fetch('/api/nudges')
        .then(res => res.json())
        .then(data => {
            if (!data.length) {
                list.innerHTML = '<li>No nudges right now.</li>';
                return;
            }
            list.innerHTML = data.map((nudge, idx) =>
                `<li onclick="handleNudgeClick(${idx})">
                    <b>${nudge.priority}</b>: ${nudge.message}
                </li>`
            ).join('');
            window._nudgesData = data;
        })
        .catch(() => {
            list.innerHTML = '<li style="color:#d9534f;">Error loading nudges.</li>';
        });
}

window.handleNudgeClick = function(idx) {
    const nudge = window._nudgesData[idx];
    if (/ticket|complaint|jira/i.test(nudge.message)) {
        loadComponent('tickets');
    } else if (/email|reply/i.test(nudge.message)) {
        loadComponent('email');
    } else {
        loadComponent('chat');
        setTimeout(() => {
            const chatInput = document.getElementById('chat-input');
            if (chatInput) chatInput.value = nudge.message;
        }, 500);
    }
    toggleNudgesPopup();
};

// Nudges window for /components/nudges.html
function renderNudgesWindow() {
    const container = document.getElementById('nudges-list-window');
    if (!container) return;
    container.innerHTML = '<div style="color:#888;">Loading...</div>';
    fetch('/api/nudges')
        .then(res => res.json())
        .then(data => {
            if (!data.length) {
                renderSampleNudges(container);
                return;
            }
            container.innerHTML = data.map(nudge => renderNudgeCard(nudge)).join('');
        })
        .catch(() => {
            renderSampleNudges(container);
        });
}

function renderSampleNudges(container) {
    const sampleNudges = [
        { priority: 'High', message: 'You have a new email from a client: Project deadline update. Please review and respond.', type: 'Email' },
        { priority: 'Medium', message: 'JIRA issue JIRA-456 is overdue. Update the status or add a comment.', type: 'Ticket' },
        { priority: 'High', message: 'Critical ticket unresolved for 48 hrs. Please review Ticket #123.', type: 'Ticket' },
        { priority: 'Low', message: 'Reminder: Daily standup pending response.', type: 'Task' },
        { priority: 'Medium', message: 'Customer complaint received: Login not working for user X.', type: 'Ticket' },
        { priority: 'High', message: 'You have 3 unread important emails. Check your inbox.', type: 'Email' },
        { priority: 'Medium', message: 'Ticket #789 has been resolved. Please close the loop with the customer.', type: 'Ticket' },
        { priority: 'Low', message: "Don't forget to submit your weekly report by EOD.", type: 'Task' }
    ];
    container.innerHTML = sampleNudges.map(nudge => renderNudgeCard(nudge)).join('');
}

function renderNudgeCard(nudge) {
    let badgeColor = '#d9534f';
    if (nudge.priority === 'Medium') badgeColor = '#f0ad4e';
    if (nudge.priority === 'Low') badgeColor = '#5bc0de';
    return `<div style="background:#fffbe7; border-radius:8px; box-shadow:0 1px 3px rgba(255,152,0,0.07); padding:14px 12px; margin-bottom:14px;">
        <span style="font-size:0.95em; color:#888;">${nudge.type || getNudgeType(nudge.message)}</span>
        <span style="float:right; background:${badgeColor}; color:#fff; border-radius:6px; padding:2px 10px; font-size:0.95em;">${nudge.priority}</span><br>
        <div style="margin-top:6px;">${nudge.message}</div>
    </div>`;
}

function getNudgeType(message) {
    if (/ticket|complaint|jira/i.test(message)) return 'Ticket';
    if (/email|reply/i.test(message)) return 'Email';
    return 'Task';
}

// If nudges-list-window exists, render nudges window
if (document.getElementById('nudges-list-window')) {
    renderNudgesWindow();
}
