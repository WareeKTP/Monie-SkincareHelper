import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import Learn from './pages/Learn'
import Plan from './pages/Plan'
import Admin from './pages/Admin'

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg,#fde7d4,#f9e6ea 48%,#e9f0df)', color: '#43382f', fontFamily: "'Nunito',sans-serif", overflowX: 'hidden' }}>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/plan" element={<Plan />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', flexDirection: 'column', gap: '12px', textAlign: 'center', padding: '24px' }}>
              <div style={{ fontSize: '48px' }}>🤔</div>
              <p style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 700, fontSize: '22px', margin: 0, color: '#43382f' }}>Page not found</p>
              <p style={{ fontSize: '14px', color: '#8a7d72', margin: 0 }}>That page doesn't exist. <a href="/" style={{ color: '#d98c6a', fontWeight: 700 }}>Go home →</a></p>
            </div>
          } />
        </Routes>
        <footer style={{ textAlign: 'center', padding: '22px', borderTop: '1px solid #ece1d0', color: '#a8998b', fontSize: '13px' }}>
          Monie · a friendly skincare routine planner · educational, not medical advice
        </footer>
      </div>
    </BrowserRouter>
  )
}
