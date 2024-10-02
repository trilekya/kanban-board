import React from 'react';
import TicketCard from './TicketCard';
import './KanbanColumn.css';

function KanbanColumn({ title, tickets, groupBy, users }) {
  return (
    <div className="kanban-column">
      <h2 className="column-title">{title} <span className="ticket-count">{tickets.length}</span></h2>
      <div className="ticket-list">
        {tickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} groupBy={groupBy} users={users} />
        ))}
      </div>
    </div>
  );
}

export default KanbanColumn;
