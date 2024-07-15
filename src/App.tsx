import { BrowserRouter as Router, Routes, Route,  } from "react-router-dom"
import { PrivateRoute } from "./components/PrivateRoute.tsx"

import { Home } from "./pages/Home.tsx"
import { Account } from "./pages/Account.tsx"
import { Login } from "./pages/Login.tsx"
import { Register } from "./pages/Register.tsx"
import { PasswdRecovery } from "./pages/PasswdRecovery.tsx"
import { PasswdChange } from "./pages/PasswdChange.tsx"
import { Search } from "./pages/Search.tsx"

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/passwd-recovery" element={<PasswdRecovery />} />
        <Route path="/search" element={<Search />} />
        <Route
          path="/passwd-change/:token"
          element={
            <PrivateRoute>
              <PasswdChange />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  )
}
