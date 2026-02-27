import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#020617] to-[#0F172A] text-slate-100">
      
      {/* NAVBAR */}
      <nav className="md:fixed top-0 w-full px-6 py-4 flex items-center justify-between 
      bg-[#020617]/80 backdrop-blur-md border-b border-white/10">
        
        <div className="flex items-center gap-4">
          <div className=" p-2  ">
            <img
              src="/icon.png"
              className="w-15 h-15 rounded-full border border-white/20"
              alt="CashCompass"
            />
          </div>
          <span className="text-xl font-semibold tracking-wide">
            CashCompass
          </span>
        </div>

        <div className="hidden md:flex gap-8 text-lg px-4 ">
            <Link to="home" smooth={true} duration={500} className="flex justify-center items-center gap-1 cursor-pointer hover:text-slate-300 transition">
                Home
            </Link>
            <Link to="features" smooth={true} duration={500} className="cursor-pointer hover:text-slate-300 transition">
                Features
            </Link>
            <Link to="contact" smooth={true} duration={500} className="cursor-pointer hover:text-slate-300 transition">
                Contact
            </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="flex flex-col min-h-screen md:flex-row items-center justify-between px-6 md:px-20 py-24 gap-12">
        
        {/* LEFT CONTENT */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Track. Save. <br />
            <span className="text-green-400">Manage Your Finances Smartly.</span>
          </h1>

          <p className="mt-6 text-lg text-slate-400 max-w-xl">
            CashCompass helps you monitor income, control expenses, and achieve savings goals with an intuitive dashboard.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button onClick={()=> navigate("/signup")} className="px-6 py-3 bg-green-500 cursor-pointer font-semibold rounded-lg hover:bg-green-600 transition">
              Get Started Free
            </button>
            <button onClick={()=> navigate("/login")} className="px-6 py-3 border cursor-pointer border-white/20 rounded-lg hover:bg-white/10 transition">
              Login
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE / MOCKUP */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src="/logo.png"
            alt="CashCompass Dashboard"
            className="w-full max-w-md rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
          />
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="h-screen px-6 md:px-20 py-28
      ">
        <h1 className="text-4xl font-bold mb-8 text-center text-green-400">Features</h1>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-slate-800 p-6 rounded-lg shadow-md hover:shadow-green-500/20 transition">
            Income & Expense Tracking
          </div>
          <div className="bg-slate-800 p-6 rounded-lg shadow-md hover:shadow-green-500/20 transition">
            Visual Analytics
          </div>
          <div className="bg-slate-800 p-6 rounded-lg shadow-md hover:shadow-green-500/20 transition">
            Secure & Private
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="min-h-screen px-6 md:px-20 py-28">
        <h1 className="text-3xl font-bold text-center mb-6">Contact Us</h1>
        <p className="text-center text-slate-400">Email us at support@cashcompass.com</p>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-6 text-slate-500 text-sm border-t border-white/10">
        © {new Date().getFullYear()} CashCompass. All rights reserved.
      </footer>
    </div>
  );
};

export default Landing;