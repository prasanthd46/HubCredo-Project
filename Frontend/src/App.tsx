import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import SignUp from './pages/SIgnUp'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/protectedRoute'
import { Toaster } from "react-hot-toast";


function App() {

  return (
    <Router>
        <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        {/* Default route redirects to Signup */}
        <Route path="/" element={<Navigate to="/signup" replace />} />
        
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>

            <Dashboard />
          </ProtectedRoute>
            } />
      </Routes>
    </Router>
  )
}

export default App
