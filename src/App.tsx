import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./components/common/Layout";
import Dashboard from "./pages/Dashboard";
import UserManagement from "./pages/UserManagement";
import RoleManagement from "./pages/RoleManagement";
import GamesManagement from "./pages/GamesManagement";
import BannerManagement from "./pages/BannerManagement";
import { DiscountManagement } from "./pages/DiscountManagement";
import ReviewsPage from "./pages/Review";
import SupportPage from "./pages/SupportPage";

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<UserManagement/>}/>
          <Route path="roles" element={<RoleManagement/>}/>
          <Route path="games" element={<GamesManagement/>}/>
          <Route path="banner" element={<BannerManagement/>}/>
          <Route path="discounts" element={<DiscountManagement/>}/>
          <Route path="review" element={<ReviewsPage/>}/>
          <Route path="support" element={<SupportPage/>}/>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
