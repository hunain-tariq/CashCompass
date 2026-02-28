import React, { useState } from 'react'
import { FaChartBar, FaSignOutAlt, FaTachometerAlt, FaBars, FaTimes } from 'react-icons/fa'
import { MdEventNote } from 'react-icons/md'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-white min-h-screen p-6 border-r border-white/10 fixed">
                <div className="flex w-full items-center  pb-4 mb-4">
                    <img src="/icon.png" alt="CashCompass Logo" className="w-14 h-14 rounded-full" />
                    <h1 className="text-2xl font-bold text-green-400 ml-2">CashCompass</h1>
                </div>
                <nav className="flex flex-col space-y-4">
                    <Link to='/dashboard' className="flex items-center gap-2 text-lg text-slate-400 hover:text-green-400 hover:bg-slate-950 p-2 rounded transition">
                        <FaTachometerAlt className="text-current" /> Dashboard
                    </Link>
                    <Link to='/monthly-planner' className="flex items-center gap-2 text-lg text-slate-400 hover:text-green-400 hover:bg-slate-950 p-2 rounded transition">
                        <MdEventNote className="text-current" /> Monthly Planner
                    </Link>
                    <Link className="flex items-center gap-2 text-lg text-slate-400 hover:text-green-400 hover:bg-slate-950 p-2 rounded transition">
                        <FaChartBar className="text-current" /> Reports
                    </Link>
                    <Link className="flex items-center gap-2 text-lg text-slate-400 hover:text-red-400 hover:bg-slate-950 p-2 rounded transition">
                        <FaSignOutAlt className="text-current" /> Logout
                    </Link>
                </nav>
            </aside>

            {/* Mobile Navbar */}
            <div className="md:hidden fixed top-0 left-0 right-0 flex items-center justify-between bg-slate-900 text-white p-4 z-50 border-b border-white/10">
                <div className="flex items-center gap-2">
                    <img src="/icon.png" alt="CashCompass Logo" className="w-14 h-14 rounded-full" />
                    <h1 className="text-2xl font-bold text-green-400">CashCompass</h1>
                </div>
                <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl focus:outline-none">
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Sidebar */}
            <div className={`fixed top-0 left-0 h-full w-64 bg-slate-900 text-white transform transition-transform duration-300 z-40
                ${menuOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}>
                <nav className="flex flex-col mt-20 p-4 space-y-4">
                    <Link to='/dashboard' className="flex items-center gap-2 text-lg text-slate-400 hover:text-green-400 hover:bg-slate-950 p-2 rounded transition">
                        <FaTachometerAlt className="text-current" /> Dashboard
                    </Link>
                    <Link to='/monthly-planner' className="flex items-center gap-2 text-lg text-slate-400 hover:text-green-400 hover:bg-slate-950 p-2 rounded transition">
                        <MdEventNote className="text-current" /> Monthly Planner
                    </Link>
                    <Link className="flex items-center gap-2 text-lg text-slate-400 hover:text-green-400 hover:bg-slate-950 p-2 rounded transition">
                        <FaChartBar className="text-current" /> Reports
                    </Link>
                    <Link className="flex items-center gap-2 text-lg text-slate-400 hover:text-red-400 hover:bg-slate-950 p-2 rounded transition">
                        <FaSignOutAlt className="text-current" /> Logout
                    </Link>
                </nav>
            </div>
        </>
    )
}

export default Navbar;