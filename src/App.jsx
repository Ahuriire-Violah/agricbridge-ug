import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import BottomNav from './components/BottomNav'
import Home from './pages/Home'
import Prices from './pages/Prices'
import Marketplace from './pages/Marketplace'
import Farmers from './pages/Farmers'
import PostListing from './pages/PostListing'
import USSD from './pages/USSD'
import Onboarding from './pages/Onboarding'
import Signup from './pages/Signup'
import Login from './pages/Login'
import FarmerDashboard from './pages/FarmerDashboard'
import BuyerDashboard from './pages/BuyerDashboard'

const noNavPages = ['/', '/signup', '/login', '/farmer-dashboard', '/buyer-dashboard']

function Layout() {
  const location = useLocation()
  const hideNav = noNavPages.includes(location.pathname)

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {!hideNav && <Navbar />}
      <main className={hideNav ? '' : 'pb-20'}>
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
          <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
          <Route path="/home" element={<Home />} />
          <Route path="/prices" element={<Prices />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/farmers" element={<Farmers />} />
          <Route path="/post" element={<PostListing />} />
          <Route path="/ussd" element={<USSD />} />
        </Routes>
      </main>
      {!hideNav && <BottomNav />}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}