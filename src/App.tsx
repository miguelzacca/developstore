import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home.tsx";
import { Account } from "./pages/Account.tsx";

export function App() {
  return <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </Router>
  </>
}