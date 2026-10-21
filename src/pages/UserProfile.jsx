import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Header from "../components/Dashboard/Header";
import UserHeader from "../components/UserProfile/UserHeader";
import OverviewTab from "../components/UserProfile/OverviewTab";
import GamesOwnedTab from "../components/UserProfile/GamesOwnedTab";
import TransactionsTab from "../components/UserProfile/TransactionsTab";
import WalletTab from "../components/UserProfile/WalletTab";
import LoginActivityTab from "../components/UserProfile/LoginActivityTab";
import BlockHistoryTab from "../components/UserProfile/BlockHistoryTab";
import SupportTicketsTab from "../components/UserProfile/SupportTicketsTab";
import { getUserById } from "../services/api/users";

const UserProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState();

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "games", label: "Games Owned" },
    { id: "transactions", label: "Transactions" },
    { id: "wallet", label: "Wallet" },
    { id: "activity", label: "Login & Activity" },
    { id: "block-history", label: "Block / Ban History" },
    { id: "support", label: "Support Tickets" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab userId={userId} user={user} />;
      case "games":
        return <GamesOwnedTab userId={userId} />;
      case "transactions":
        return <TransactionsTab userId={userId} />;
      case "wallet":
        return (
          <WalletTab
            userId={userId}
            user={user}
            handleRefresh={handleRefresh}
            refresh={refresh}
          />
        );
      case "activity":
        return <LoginActivityTab userId={userId} />;
      case "block-history":
        return <BlockHistoryTab userId={userId} />;
      case "support":
        return <SupportTicketsTab userId={userId} />;
      default:
        return <OverviewTab userId={userId} />;
    }
  };

  const fetchUser = async () => {
    setIsLoading(true);
    try {
      const response = await getUserById(userId);
      if (response?.meta?.code === 200) {
        setUser(response?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId, refresh]);

  return (
    <main className="lg:ml-64 flex-1 p-4 sm:p-6 bg-gray-50 dark:bg-[#0a0e27] overflow-x-hidden max-w-full">
      <Header />

      {/* Back Button */}
      <div className="mb-4 sm:mb-6">
        <button
          onClick={() => navigate("/dashboard/users")}
          className="flex items-center gap-2 text-gray-600 dark:text-[#8b8fa3] hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <FaArrowLeft className="text-xs sm:text-sm" />
          <span className="text-xs sm:text-sm">Back to Users</span>
        </button>
      </div>

      {/* User Header */}
      <div className="mb-4 sm:mb-6">
        <UserHeader
          userId={userId}
          user={user}
          handleRefresh={handleRefresh}
        />
      </div>

      {/* Tab Navigation */}
      <div className="mb-4 sm:mb-6">
        <div className="flex items-center gap-1 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] rounded-lg p-1 overflow-x-auto max-w-full">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-[#10b981] text-white shadow-sm"
                  : "text-gray-600 dark:text-[#8b8fa3] hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1e2742]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">{renderTabContent()}</div>
    </main>
  );
};

export default UserProfile;
