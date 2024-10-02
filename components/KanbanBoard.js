import React from 'react';
import './KanbanBoard.css';

const prioritySymbols = {
  4: '🔴', // High
  3: '🟠', // Medium
  2: '🟡', // Low
  1: '🔵', // In Progress
  0: '⚪' // No priority
};

const statusSymbols = {
  'Done': '✅',
  'In Progress': '🔄',
  'Blocked': '🚫',
  'To Do': '📋'
};

const priorityOrder = ['No priority', 'Low', 'Medium', 'High', 'Urgent'];

function KanbanBoard({ tickets = [], groupBy = 'status', sortBy = 'priority' }) {
  const groupAndSortTickets = () => {
    if (!Array.isArray(tickets)) {
      console.error('Tickets is not an array:', tickets);
      return {};
    }

    const grouped = tickets.reduce((acc, ticket) => {
      let key;
      switch (groupBy) {
        case 'status':
          key = ticket.status || 'No status';
          break;
        case 'priority':
          key = priorityOrder[ticket.priority] || 'No priority';
          break;
        case 'user':
          key = ticket.userId || 'Unassigned';
          break;
        default:
          key = 'Other';
      }
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(ticket);
      return acc;
    }, {});

    Object.keys(grouped).forEach(key => {
      grouped[key].sort((a, b) => {
        if (sortBy === 'priority') {
          return b.priority - a.priority;
        } else {
          return a.title.localeCompare(b.title);
        }
      });
    });

    return grouped;
  };

  const groupedTickets = groupAndSortTickets();
  const orderedKeys = groupBy === 'priority' ? priorityOrder : Object.keys(groupedTickets).sort();

  return (
    <div className="kanban-board">
      {orderedKeys.map((key) =>
        groupedTickets[key] && (
          <div key={key} className="kanban-column">
            <h2>{key}</h2>
            {groupedTickets[key].map((ticket) => (
              <div key={ticket.id} className="ticket">
                <div className="ticket-header">
                  <span className="ticket-id">{ticket.id}</span>
                  <span className="ticket-symbol">
                    {groupBy === 'status' ? statusSymbols[ticket.status] : prioritySymbols[ticket.priority]}
                  </span>
                </div>
                <h3 className="ticket-title">{ticket.title}</h3>
                {ticket.tag && <span className="ticket-tag">{ticket.tag}</span>}
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}

export default KanbanBoard;