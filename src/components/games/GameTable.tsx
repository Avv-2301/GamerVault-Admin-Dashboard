import React from "react";
import GameRow from "./GameRow";

interface Game {
  id: string;
  name: string;
  category: string;
  ageRating: string;
  status: string;
  imageUrl: string;
}

interface GameTableProps {
  games: Game[];
}

const GameTable: React.FC<GameTableProps> = ({ games }) => {
  return (
    <div className="bg-white rounded-md shadow-sm overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 text-xs uppercase text-gray-600 font-semibold">
          <tr>
            <th className="px-4 py-3 text-left">Game</th>
            <th className="px-4 py-3 text-left">Category</th>
            <th className="px-4 py-3 text-left">Age Rating</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <GameRow key={game.id} {...game} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GameTable;
