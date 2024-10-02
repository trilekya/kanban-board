// ./utils/api.js

// Function to fetch tickets and users from the API
export const fetchTickets = async () => {
  try {
    const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
    if (!response.ok) {
      throw new Error('Failed to fetch tickets');
    }
    const data = await response.json();
    return {
      tickets: data.tickets,  // tickets data
      users: data.users       // users data
    };
  } catch (error) {
    console.error('Error fetching tickets:', error);
    throw error;
  }
};

// Function to group tickets based on the grouping criteria
export const groupTickets = (tickets, grouping, users) => {
  switch (grouping) {
    case 'status':
      return tickets.reduce((acc, ticket) => {
        (acc[ticket.status] = acc[ticket.status] || []).push(ticket);
        return acc;
      }, {});
    case 'user':
      return tickets.reduce((acc, ticket) => {
        const user = users.find(u => u.id === ticket.userId);
        if (user) {
          (acc[user.name] = acc[user.name] || []).push(ticket);
        }
        return acc;
      }, {});
    case 'priority':
      const priorities = ['No priority', 'Low', 'Medium', 'High', 'Urgent'];
      return tickets.reduce((acc, ticket) => {
        (acc[priorities[ticket.priority]] = acc[priorities[ticket.priority]] || []).push(ticket);
        return acc;
      }, {});
    default:
      return { 'All Tickets': tickets };
  }
};

// Function to order tickets based on the ordering criteria
export const orderTickets = (groupedTickets, ordering) => {
  const orderFunction = ordering === 'priority' 
    ? (a, b) => b.priority - a.priority
    : (a, b) => a.title.localeCompare(b.title);

  return Object.fromEntries(
    Object.entries(groupedTickets).map(([key, tickets]) => [
      key,
      tickets.sort(orderFunction)
    ])
  );
};
