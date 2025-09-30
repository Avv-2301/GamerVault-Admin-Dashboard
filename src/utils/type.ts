// src/types.ts
export type Review = {
  id: number;
  user: string;
  email: string;
  game: string;
  comment: string;
  rating: number;
  date: string;
  status: "Approved" | "Pending" | "Flagged";
  avatar: string;
};


export type TicketStatus = "Open" | "Pending" | "Resolved";

export type Ticket = {
  id: string;
  user: string;
  email: string;
  avatar: string;
  subject: string;
  status: TicketStatus;
  date: string;
  messages: {
    sender: string;
    text: string;
    date: string;
    time: string;
    fromSupport?: boolean;
  }[];
};
