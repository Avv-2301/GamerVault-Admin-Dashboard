import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./components/common/Layout";
import Dashboard from "./pages/Dashboard";

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
