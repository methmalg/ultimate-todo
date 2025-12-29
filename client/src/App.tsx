import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";

function RegisterPageStub() {
  return <div className="p-10 text-center">Register Page Coming Soon</div>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPageStub />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
