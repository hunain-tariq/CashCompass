import React from 'react'
import Navbar from '../components/Navbar'

const ExpenceTracker = () => {
  return (
    <>
     <div className="min-h-screen bg-slate-950 text-white flex">
      <Navbar />
      <div className="p-6 w-full md:ml-64 mt-20 md:mt-6">
        <div className="flex w-full items-center justify-center border-b border-white/10">
          <h1 className="text-3xl font-bold mb-6 text-center">Expence Tracker</h1>
        </div>      </div>

      </div>
      
    </>
)};

export default ExpenceTracker
