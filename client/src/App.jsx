import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import MonthlyPlanner from './pages/MonthlyPlanner'

const App = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/monthly-planner' element={<MonthlyPlanner />} />
    </Routes>
      
    </>
  )
}

export default App
