import React from "react";
import { FaWallet, FaArrowUp, FaArrowDown, FaPiggyBank } from "react-icons/fa";
import Navbar from "../components/Navbar";
import {
  BarChart,
  Legend,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";


const Dashboard = () => {

 const data = [
  { month: "Jan", income: 400, expense: 200, savings: 200 },
  { month: "Feb", income: 300, expense: 150, savings: 150 },
  { month: "Mar", income: 500, expense: 250, savings: 250 },
  { month: "Apr", income: 200, expense: 100, savings: 100 },
  { month: "May", income: 600, expense: 350, savings: 250 },
  { month: "Jun", income: 450, expense: 200, savings: 250 },
  { month: "Jul", income: 700, expense: 400, savings: 300 },
  { month: "Aug", income: 350, expense: 200, savings: 150 },
  { month: "Sep", income: 800, expense: 500, savings: 300 },
  { month: "Oct", income: 650, expense: 300, savings: 350 },
  { month: "Nov", income: 500, expense: 250, savings: 250 },
  { month: "Dec", income: 900, expense: 600, savings: 300 },
];

  return (
    <div className="min-h-screen  bg-slate-950 text-white flex  ">
      <Navbar />

      <div className="p-6 w-full md:ml-64 mt-20 md:mt-6">
        {/* heading */}
        <div className="flex w-full items-center justify-center border-b border-white/10 ">
          <h1 className="text-3xl font-bold mb-6 text-center">Dashboard Overview</h1>
        </div>
          {/* first block */}
        <div className="flex flex-col md:flex-row w-full items-center justify-center mt-10 gap-8 flex-wrap ">

          <div className="bg-slate-900 p-6 rounded-lg w-70 h-32 border border-white/10">
            <div className="flex items-center justify-between">
              <h3>Spendable Balance</h3>
              <FaWallet className="text-green-400 text-xl" />
            </div>
            <p className="text-2xl font-bold mt-4">{"\u20A8"} 4,500</p>
          </div>

          <div className="bg-slate-900 p-6 rounded-lg w-70 h-32 border border-white/10">
            <div className="flex items-center justify-between">
              <h3>Income</h3>
              <FaArrowUp className="text-green-400 text-xl" />
            </div>
            <p className="text-2xl font-bold mt-4">{"\u20A8"} 3,200</p>
          </div>
          <div className="bg-slate-900 p-6  rounded-lg w-70 h-32 border border-white/10">
            <div className="flex items-center justify-between">
              <h3>Expenses</h3>
              <FaArrowDown className="text-red-400 text-xl" />
            </div>
            <p className="text-2xl font-bold mt-4">{"\u20A8"} 1,500</p>
          </div>
          <div className="bg-slate-900 p-6 rounded-lg md:w-68 w-70 h-32 border border-white/10">
            <div className="flex items-center justify-between">
              <h3>Savings</h3>
              <FaPiggyBank className="text-yellow-400 text-xl" />
            </div>
            <p className="text-2xl font-bold mt-4">{"\u20A8"} 800</p>
          </div>

        </div>

        {/* second block   */}
      <div className="mt-12 bg-slate-900 w-full p-4 md:p-6 rounded-xl border border-white/10">
          <h3 className="text-lg md:text-xl font-semibold mb-4">
            Monthly Overview
          </h3>

          {/* Horizontal Scroll Wrapper */}
          <div className="overflow-x-auto">
            <div className="min-w-[750px] h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  
                  <XAxis
                    dataKey="month"
                    stroke="#cbd5e1"
                    tick={{ fontSize: 12 }}
                  />
                  
                  <YAxis
                    stroke="#cbd5e1"
                    tick={{ fontSize: 12 }}
                  />
                  
                  <Tooltip />
                  <Legend />

                  <Bar
                    dataKey="income"
                    fill="#22c55e"
                    barSize={14}
                    radius={[6, 6, 0, 0]}
                  />
                  <Bar
                    dataKey="expense"
                    fill="#ef4444"
                    barSize={14}
                    radius={[6, 6, 0, 0]}
                  />
                  <Bar
                    dataKey="savings"
                    fill="#facc15"
                    barSize={14}
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
       
      






      </div>


    

    
    </div>
  );
};

export default Dashboard;