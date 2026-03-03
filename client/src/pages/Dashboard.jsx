import React, { useEffect, useState } from "react";
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
import axios from "axios";
// import { toast } from "react-toastify";

const Dashboard = () => {

  const [dashboardData, setDashboardData] = useState({
    totalIncome: 0,
    totalExpense: 0,
    totalSavings: 0,
    savings: 0,
    balance: 0,
  });

  const [monthlyData, setMonthlyData] = useState([]); // For chart

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        // Fetch totals
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/dashboard-data`, { withCredentials: true });
        setDashboardData({
          totalIncome: res.data.totalIncome,
          totalExpense: res.data.totalExpense,
          totalSavings: res.data.totalSavings,
          savings: res.data.savings,
          balance: res.data.balance,
        });

        // Fetch months for chart
        const monthsRes = await axios.get(`${import.meta.env.VITE_API_URL}/fetch-monthly-planner`, { withCredentials: true });

        // Map to chart-friendly format
        const chartData = monthsRes.data.map(m => ({
          month: m.month,
          income: Number(m.totalIncome),
          expense: Number(m.totalExpense),
          savings: Number(m.savings),
        }));

        setMonthlyData(chartData);

      } catch (err) {
        console.error(err);
        // toast.error("Failed to fetch dashboard data");
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <Navbar />

      <div className="p-6 w-full md:ml-64 mt-20 md:mt-6">
        {/* heading */}
        <div className="flex w-full items-center justify-center border-b border-white/10">
          <h1 className="text-3xl font-bold mb-6 text-center">Dashboard Overview</h1>
        </div>

        {/* first block */}
        <div className="flex flex-col md:flex-row w-full items-center justify-center mt-10 gap-8 flex-wrap">
          <div className="bg-slate-900 p-6 rounded-lg w-70 h-32 border border-white/10">
            <div className="flex items-center justify-between">
              <h3>Spendable Balance</h3>
              <FaWallet className="text-green-400 text-xl" />
            </div>
            <p className="text-2xl font-bold mt-4">{"\u20A8"} {dashboardData.balance} </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-lg w-70 h-32 border border-white/10">
            <div className="flex items-center justify-between">
              <h3>Income</h3>
              <FaArrowUp className="text-green-400 text-xl" />
            </div>
            <p className="text-2xl font-bold mt-4">{"\u20A8"} {dashboardData.totalIncome}</p>
          </div>

          <div className="bg-slate-900 p-6 rounded-lg w-70 h-32 border border-white/10">
            <div className="flex items-center justify-between">
              <h3>Expenses</h3>
              <FaArrowDown className="text-red-400 text-xl" />
            </div>
            <p className="text-2xl font-bold mt-4">{"\u20A8"} {dashboardData.totalExpense}</p>
          </div>

          <div className="bg-slate-900 p-6 rounded-lg md:w-68 w-70 h-32 border border-white/10">
            <div className="flex items-center justify-between">
              <h3>Savings</h3>
              <FaPiggyBank className="text-yellow-400 text-xl" />
            </div>
            <p className="text-2xl font-bold mt-4">{"\u20A8"} {dashboardData.totalSavings}</p>
          </div>
        </div>

        {/* second block: Monthly Overview Chart */}
        <div className="mt-12 bg-slate-900 w-full p-4 md:p-6 rounded-xl border border-white/10">
          <h3 className="text-lg md:text-xl font-semibold mb-4">
            Monthly Overview
          </h3>

          <div className="overflow-x-auto">
            <div className="min-w-[750px] h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#cbd5e1" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#cbd5e1" tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="income" fill="#22c55e" barSize={14} radius={[6, 6, 0, 0]} />
                  <Bar dataKey="expense" fill="#ef4444" barSize={14} radius={[6, 6, 0, 0]} />
                  <Bar dataKey="savings" fill="#facc15" barSize={14} radius={[6, 6, 0, 0]} />
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