import React from "react";
import type { Ticket } from "../../utils/type";
import { FaTimes } from "react-icons/fa";

const TicketDetails: React.FC<{ ticket: Ticket; onClose: () => void }> = ({ ticket, onClose }) => (
  <div className="p-4 flex flex-col h-full">
    {/* Header */}
    <div className="flex justify-between items-center mb-4 border-b pb-2">
      <h2 className="font-bold text-lg">Ticket Details</h2>
      <button
        onClick={onClose}
        className="p-2 rounded-full hover:bg-gray-200 transition"
      >
        <FaTimes className="text-gray-600" />
      </button>
    </div>

    <p className="text-sm text-gray-500 mb-2">Ticket ID: {ticket.id}</p>
    <p className="text-sm text-gray-500 mb-2">Status: {ticket.status}</p>
    <p className="text-sm text-gray-500 mb-4">Created: {ticket.date}</p>

    {/* User Info */}
    <div className="flex items-center gap-3 mb-4">
      <img src={ticket.avatar} alt={ticket.user} className="w-12 h-12 rounded-full border" />
      <div>
        <p className="font-semibold">{ticket.user}</p>
        <p className="text-sm text-gray-500">{ticket.email}</p>
      </div>
    </div>

    {/* Messages */}
    <div className="flex-1 overflow-y-auto space-y-4 pr-1">
      {ticket.messages.map((msg, i) => (
        <div
          key={i}
          className={`p-3 rounded-lg ${
            msg.fromSupport ? "bg-green-50 self-end" : "bg-gray-100"
          }`}
        >
          <p className="font-semibold text-sm">{msg.sender}</p>
          <p className="text-sm">{msg.text}</p>
          <p className="text-xs text-gray-500 mt-1">
            {msg.date} - {msg.time}
          </p>
        </div>
      ))}
    </div>

    {/* Reply */}
    <div className="mt-4">
      <textarea
        placeholder="Type your reply here..."
        className="w-full border rounded p-2 focus:outline-none focus:ring"
      ></textarea>
      <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
        Send Reply
      </button>
    </div>
  </div>
);

export default TicketDetails;
