import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<div>Admin Dashboard Home</div>} />
      </Routes>
    </div>
  );
};

export default App;
