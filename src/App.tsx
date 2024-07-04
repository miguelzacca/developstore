import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home.tsx";
import { Account } from "./pages/Account.tsx";
import { Login } from "./pages/Login.tsx";
import { Register } from "./pages/Register.tsx"
import { PasswdRecovery } from "./pages/PasswdRecovery.tsx";

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/passwd-recovery"
          element={<PasswdRecovery request={true} />}
        />
      </Routes>
    </Router>
  );
}
