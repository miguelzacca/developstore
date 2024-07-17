import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { PrivateRoute } from './components/PrivateRoute.tsx'

import { Home } from './pages/Home.tsx'
import { Account } from './pages/Account.tsx'
import { Auth } from './pages/Auth.tsx'
import { PasswdChange } from './pages/PasswdChange.tsx'
import { Search } from './pages/Search.tsx'
import { Favorites } from './pages/Favorites.tsx'

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<Auth process="login" />} />
        <Route path="/register" element={<Auth process="register" />} />
        <Route path="/search" element={<Search />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route
          path="/passwd-recovery"
          element={<Auth process="passwd-recovery" />}
        />
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
