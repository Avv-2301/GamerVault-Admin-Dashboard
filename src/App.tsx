import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./components/common/Layout";
import Dashboard from "./pages/Dashboard";
import UserManagement from "./pages/UserManagement";
import RoleManagement from "./pages/RoleManagement";
import GamesManagement from "./pages/GamesManagement";

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
        </Route>
      </Routes>
    </div>
  );
};

export default App;
