import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import UserProfile from '../pages/UserProfile'
import Login from '../pages/Login'
import Register from '../pages/Register'

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  )
}

export default AppRoutes
