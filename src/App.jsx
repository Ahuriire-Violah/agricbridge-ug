import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import BottomNav from './components/BottomNav'
import Home from './pages/Home'
import Prices from './pages/Prices'
import Marketplace from './pages/Marketplace'
import Farmers from './pages/Farmers'
import PostListing from './pages/PostListing'
import USSD from './pages/USSD'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#FAFAF8]">
        <Navbar />
        <main className="pb-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/prices" element={<Prices />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/farmers" element={<Farmers />} />
            <Route path="/post" element={<PostListing />} />
            <Route path="/ussd" element={<USSD />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </BrowserRouter>
  )
}