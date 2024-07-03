import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home.tsx";
import { Account } from "./pages/Account.tsx";
import { Auth } from "./pages/Auth.tsx";
import { PasswdRecovery } from "./pages/PasswdRecovery.tsx";

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<Auth login={true} />} />
        <Route path="/register" element={<Auth login={false} />} />
        <Route
          path="/passwd-recovery"
          element={<PasswdRecovery request={true} />}
        />
      </Routes>
    </Router>
  );
}
