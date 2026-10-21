import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { ToastProvider } from './components/ui/ToastContainer'
import { ThemeProvider } from './context/ThemeContext'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import DashboardLayout from './components/Layout/DashboardLayout'
import Dashboard from './pages/Dashboard'
import Games from './pages/Games'
import CreateGame from './pages/CreateGame'
import EditGame from './pages/EditGame'
import GameView from './pages/GameView'
import Users from './pages/Users'
import CreateUser from './pages/CreateUser'
import UserProfile from './pages/UserProfile'
import Transactions from './pages/Transactions'
import Discounts from './pages/Discounts'
import CreateDiscount from './pages/CreateDiscount'
import Banners from './pages/Banners'
import CreateBanner from './pages/CreateBanner'
import Settings from './pages/Settings'
import AuditTrials from './pages/AuditTrials'
import Support from './pages/Support'
import CreateSupportTicket from './pages/CreateSupportTicket'
import GiftCards from './pages/GiftCards'
import CreateGiftCard from './pages/CreateGiftCard'
import Reports from './pages/Reports'
import Error404 from './pages/Error404'
import { useEffect } from 'react'
import { useAuthStore } from './store/useAuthStore'
import { getAdminSession } from './services/api/auth'

const App = () => {
  const finishSessionCheck = useAuthStore((state) => state.finishSessionCheck)
  const login = useAuthStore((state) => state.login)

  useEffect(() => {
    // Remove the token saved by older builds that used Zustand persistence.
    localStorage.removeItem('auth-storage')
    getAdminSession().then((session) => {
      if (session) login(session)
      else finishSessionCheck()
    })
  }, [finishSessionCheck, login])

  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="games" element={<Games />} />
              <Route path="games/create" element={<CreateGame />} />
              <Route path="games/:gameId/edit" element={<EditGame />} />
              <Route path="games/:slug" element={<GameView />} />
              <Route path="users/create" element={<CreateUser />} />
              <Route path="users/:userId" element={<UserProfile />} />
              <Route path="users" element={<Users />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="discounts" element={<Discounts />} />
            <Route path="discounts/create" element={<CreateDiscount />} />
            <Route path="discounts/:discountId/edit" element={<CreateDiscount />} />
            <Route path="banners" element={<Banners />} />
            <Route path="banners/create" element={<CreateBanner />} />
            <Route path="banners/:bannerId/edit" element={<CreateBanner />} />
            <Route path="settings" element={<Settings />} />
            <Route path="audit-trials" element={<AuditTrials />} />
            <Route path="support" element={<Support />} />
            <Route path="support/create" element={<CreateSupportTicket />} />
            <Route path="gift-cards" element={<GiftCards />} />
            <Route path="gift-cards/create" element={<CreateGiftCard />} />
            <Route path="gift-cards/:giftCardId/edit" element={<CreateGiftCard />} />
            <Route path="reports" element={<Reports />} />
            </Route>
            <Route path="*" element={<Error404 />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-right"
          containerStyle={{
            top: 20,
            right: 20,
          }}
          toastOptions={{
            className: "",
            style: {
              background: "transparent",
              boxShadow: "none",
              padding: 0,
              margin: 0,
            },
          }}
        />
      </ToastProvider>
    </ThemeProvider>
  )
}

export default App
