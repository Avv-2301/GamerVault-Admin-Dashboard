import React from "react";
import type { Ticket } from "../../utils/type";

const TicketsTable: React.FC<{ tickets: Ticket[]; onSelect: (ticket: Ticket) => void }> = ({
  tickets,
  onSelect,
}) => (
  <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
    <table className="w-full text-left">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-3">Ticket ID</th>
          <th className="p-3">User</th>
          <th className="p-3">Subject</th>
          <th className="p-3">Status</th>
          <th className="p-3">Date</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((ticket) => (
          <tr
            key={ticket.id}
            className="border-b hover:bg-gray-50 cursor-pointer"
            onClick={() => onSelect(ticket)}
          >
            <td className="p-3">{ticket.id}</td>
            <td className="p-3 flex items-center gap-2">
              <img src={ticket.avatar} alt={ticket.user} className="w-8 h-8 rounded-full object-cover" />
              <span>{ticket.user}</span>
            </td>
            <td className="p-3">{ticket.subject}</td>
            <td className="p-3">
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  ticket.status === "Open"
                    ? "bg-red-100 text-red-700"
                    : ticket.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {ticket.status}
              </span>
            </td>
            <td className="p-3">{ticket.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default TicketsTable;

