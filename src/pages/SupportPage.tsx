import React, { useState } from "react";
import { FaTicketAlt, FaClock, FaPause, FaCheck } from "react-icons/fa";
import StatsCard from "../components/support/StatsCard";
import TicketsTable from "../components/support/TicketsTable";
import TicketDetails from "../components/support/TicketDetails";
import type { Ticket } from "../utils/type";

// Mock Tickets
const tickets: Ticket[] = [
  {
    id: "TK-2024-001",
    user: "John Smith",
    email: "john.smith@email.com",
    avatar: "https://i.pravatar.cc/150?img=11",
    subject: "Payment issue with subscription",
    status: "Open",
    date: "2024-01-15",
    messages: [
      {
        sender: "John Smith",
        text: "I am having issues with my payment.",
        date: "Jan 15, 2024",
        time: "10:20 AM",
      },
    ],
  },
  {
    id: "TK-2024-002",
    user: "Sarah Johnson",
    email: "sarah@email.com",
    avatar: "https://i.pravatar.cc/150?img=12",
    subject: "Game not loading properly",
    status: "Pending",
    date: "2024-01-14",
    messages: [
      {
        sender: "Sarah Johnson",
        text: "The game isn’t loading, please check.",
        date: "Jan 14, 2024",
        time: "9:10 AM",
      },
    ],
  },
  {
    id: "TK-2024-003",
    user: "Mike Wilson",
    email: "mike.wilson@email.com",
    avatar: "https://i.pravatar.cc/150?img=13",
    subject: "Account verification problem",
    status: "Open",
    date: "2024-01-13",
    messages: [
      {
        sender: "Mike Wilson",
        text: "I keep uploading documents but it fails.",
        date: "Jan 13, 2024",
        time: "2:30 PM",
      },
      {
        sender: "Support Team",
        text: "Hi Mike, please upload a new photo that is clear and shows all corners.",
        date: "Jan 13, 2024",
        time: "3:15 PM",
        fromSupport: true,
      },
    ],
  },
  {
    id: "TK-2024-004",
    user: "Emma Davis",
    email: "emma@email.com",
    avatar: "https://i.pravatar.cc/150?img=14",
    subject: "Feature request for mobile app",
    status: "Resolved",
    date: "2024-01-12",
    messages: [
      {
        sender: "Emma Davis",
        text: "Can you add this feature to mobile?",
        date: "Jan 12, 2024",
        time: "11:40 AM",
      },
    ],
  },
];

const SupportPage: React.FC = () => {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  return (
    <div className="p-6 space-y-6 relative">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          icon={<FaTicketAlt className="text-blue-600" />}
          label="Total Tickets"
          value={247}
          color="bg-blue-100"
        />
        <StatsCard
          icon={<FaClock className="text-yellow-600" />}
          label="Open"
          value={32}
          color="bg-yellow-100"
        />
        <StatsCard
          icon={<FaPause className="text-orange-600" />}
          label="Pending"
          value={18}
          color="bg-orange-100"
        />
        <StatsCard
          icon={<FaCheck className="text-green-600" />}
          label="Resolved"
          value={197}
          color="bg-green-100"
        />
      </div>

      {/* Main Section */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tickets Table */}
        <div
          className={`flex-1 transition-all duration-300 ${
            selectedTicket ? "hidden lg:block" : "block"
          }`}
        >
          <TicketsTable tickets={tickets} onSelect={setSelectedTicket} />
        </div>

        {/* Side Pane */}
        {selectedTicket && (
          <div
            className={`
              fixed inset-0 bg-black/30 z-50 flex justify-end lg:static lg:bg-transparent
            `}
          >
            <div
              className={`
                w-full lg:w-full bg-white border rounded-lg shadow-lg h-full lg:h-auto
                transform transition-transform duration-300
                ${selectedTicket ? "translate-x-0" : "translate-x-full"}
              `}
            >
              <TicketDetails
                ticket={selectedTicket}
                onClose={() => setSelectedTicket(null)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportPage;
