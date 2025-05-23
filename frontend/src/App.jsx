import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './App.css'

// Import layout components
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

// Import pages
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import IntroScreen from './pages/game/IntroScreen'
import CharacterCustomization from './pages/game/CharacterCustomization'
import GameDashboard from './pages/game/GameDashboard'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('pokemon_game_token')
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  // Determine which pages should show header/footer
  const shouldShowHeaderFooter = (path) => {
    // Don't show header/footer on intro screen or auth pages
    return !['/intro', '/login', '/signup'].includes(path)
  }

  return (
    <>
      {/* Toast notifications */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 2000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            style: {
              background: '#10B981',
            },
          },
          error: {
            duration: 3000,
            style: {
              background: '#EF4444',
            },
          },
        }}
      />
      
      <Router>
        {/* Conditionally render Header based on route */}
        <Routes>
          <Route path="*" element={
            <>
              {window.location.pathname !== '/intro' && 
               window.location.pathname !== '/login' && 
               window.location.pathname !== '/signup' && <Header />}
              
              <Routes>
                {/* Public routes */}
                <Route path="/login" element={isAuthenticated ? <Navigate to="/intro" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/signup" element={isAuthenticated ? <Navigate to="/intro" /> : <Signup setIsAuthenticated={setIsAuthenticated} />} />
                
                {/* Protected routes */}
                <Route path="/intro" element={isAuthenticated ? <IntroScreen /> : <Navigate to="/login" />} />
                <Route path="/customize" element={isAuthenticated ? 
                  <>
                    <div className="min-h-screen flex flex-col">
                      <div className="flex-grow">
                        <CharacterCustomization />
                      </div>
                      <Footer />
                    </div>
                  </> : 
                  <Navigate to="/login" />} 
                />
                <Route path="/game" element={isAuthenticated ? 
                  <>
                    <div className="min-h-screen flex flex-col">
                      <div className="flex-grow">
                        <GameDashboard />
                      </div>
                      <Footer />
                    </div>
                  </> : 
                  <Navigate to="/login" />} 
                />
                
                {/* Default route */}
                <Route path="/" element={<Navigate to={isAuthenticated ? "/intro" : "/login"} />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </>
          } />
        </Routes>
      </Router>
    </>
  )
}

export default App
