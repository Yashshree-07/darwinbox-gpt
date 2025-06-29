const ticketsLoading = document.getElementById('tickets-loading');
const ticketList = document.getElementById('ticket-list');
ticketsLoading.style.display = 'block';
fetch('/api/tickets')
    .then(res => res.json())
    .then(data => {
        ticketsLoading.style.display = 'none';
        ticketList.innerHTML = data.map(t => `<li><strong>${t.title}</strong> - <span style='color:${t.status==="Open"?"#d9534f":t.status==="In Progress"?"#f0ad4e":"#28a745"}'>${t.status}</span></li>`).join('');
    })
    .catch(() => {
        ticketsLoading.style.display = 'none';
        ticketList.innerHTML = '';
    });

window.showSampleTicketDetails = function(ticketId) {
    const detailsDiv = document.getElementById('ticket-details');
    let details = '';
    if (ticketId === 123) {
        details = `<div style='background:#fffbe7; border-radius:8px; padding:14px 12px; margin-bottom:14px; box-shadow:0 1px 3px rgba(255,152,0,0.07);'>
            <strong>Ticket #123</strong><br>
            <b>Title:</b> Login issue<br>
            <b>Status:</b> <span style='color:#d9534f;'>Open</span><br>
            <b>Description:</b> User unable to login to the portal since yesterday.<br>
            <b>Created:</b> 2024-06-20<br>
            <b>Assigned to:</b> IT Support Team
        </div>`;
    } else if (ticketId === 456) {
        details = `<div style='background:#fffbe7; border-radius:8px; padding:14px 12px; margin-bottom:14px; box-shadow:0 1px 3px rgba(255,152,0,0.07);'>
            <strong>Ticket #456</strong><br>
            <b>Title:</b> Payroll discrepancy<br>
            <b>Status:</b> <span style='color:#f0ad4e;'>In Progress</span><br>
            <b>Description:</b> Employee salary not credited correctly for May.<br>
            <b>Created:</b> 2024-06-18<br>
            <b>Assigned to:</b> Payroll Team
        </div>`;
    } else if (ticketId === 789) {
        details = `<div style='background:#fffbe7; border-radius:8px; padding:14px 12px; margin-bottom:14px; box-shadow:0 1px 3px rgba(255,152,0,0.07);'>
            <strong>Ticket #789</strong><br>
            <b>Title:</b> App crash on iOS<br>
            <b>Status:</b> <span style='color:#28a745;'>Resolved</span><br>
            <b>Description:</b> Mobile app crashes on launch for iOS users.<br>
            <b>Created:</b> 2024-06-15<br>
            <b>Assigned to:</b> Mobile Dev Team
        </div>`;
    }
    detailsDiv.innerHTML = details;
};
