import React from 'react';
import './TicketCard.css';

function TicketCard({ ticket, groupBy, users }) {
  const { id, title, tag, userId, status, priority } = ticket;

  // Get the user name from the users list using userId
  const user = users.find((u) => u.id === userId);

  // Debugging: log user and ticket details
  console.log('User:', user);  // Check the user object
  console.log('Ticket:', ticket); // Check the ticket object

  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <span className="ticket-id">{id}</span>
        {groupBy !== 'user' && (
          <div className="user-avatar" title={user?.name || userId}>
            {user?.name ? user.name[0].toUpperCase() : userId[0].toUpperCase()}
          </div>
        )}
      </div>
      <h3 className="ticket-title">{title}</h3>
      <div className="ticket-footer">
        <span className="ticket-tag">
          <span className="tag-icon">◯</span> {tag}
        </span>
      </div>
    </div>
  );
}

export default TicketCard;
