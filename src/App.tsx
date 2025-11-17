import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Layout from "./components/common/Layout";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import UserManagement from "./pages/UserManagement";
import RoleManagement from "./pages/RoleManagement";
import GamesManagement from "./pages/GamesManagement";
import CreateGame from "./components/games/CreateGame";
import BannerManagement from "./pages/BannerManagement";
import { DiscountManagement } from "./pages/DiscountManagement";
import ReviewsPage from "./pages/Review";
import SupportPage from "./pages/SupportPage";
import Settings from "./pages/Settings";
import AdminPermissions from "./pages/AdminPermissions";
import AuditLogs from "./pages/AuditLogs";

const App: React.FC = () => {
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="users" element={<UserManagement/>}/>
          <Route path="roles" element={<RoleManagement/>}/>
          <Route path="games" element={<GamesManagement/>}/>
          <Route path="games/create" element={<CreateGame/>}/>
          <Route path="banner" element={<BannerManagement/>}/>
          <Route path="discounts" element={<DiscountManagement/>}/>
          <Route path="review" element={<ReviewsPage/>}/>
          <Route path="support" element={<SupportPage/>}/>
          <Route path="settings" element={<Settings/>}/>
          <Route path="admin-permissions" element={<AdminPermissions/>}/>
          <Route path="audit-logs" element={<AuditLogs/>}/>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
