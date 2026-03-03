import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";

const inputClass =
  "w-full rounded-md border border-white/20 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none transition";

const MonthlyPlanner = () => {
    const [records, setRecords] = useState([]);

  const [formData, setFormData] = React.useState({
    month: "",
    income: "",
    expense: "",
    savings: "",
  });

const handleform = async (e) => {
  e.preventDefault();

  try {
    console.log(formData);

    // Await POST request
    const res = await axios.post('http://localhost:5000/monthly-planner', formData, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });

    console.log(res.data);

    // Reset form
    setFormData({
      month: "",
      income: "",
      expense: "",
      savings: "",
    });

    toast.success("Record added successfully!");
    // Refresh records
    fetchRecords();
  } catch (err) {
    console.error(err);
    if (err.response?.status === 400) {
      toast.error("Month already added!");
    } else {
      toast.error("Failed to add record!");
    }
  }
};
  const clearform = () => {
      setFormData({
      month: "",
      income: "",
      expense: "",
      savings: "",
    });
  };
  const [already, setalready] = useState();

  const handlealreadysaved = async () => {
    try {
      const res = await axios.post("http://localhost:5000/alreadysaved", { aleadySaved: already }, {
        withCredentials: true,
      });
      console.log(res.data);
      setalready("");
      toast.success("Savings updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update already saved!");
    }
  };

  const fetchRecords = async () => {
    try {
      const res = await axios.get("http://localhost:5000/fetch-monthly-planner", {
        withCredentials: true,
      });
      setRecords(res.data);
    } catch (err) {
      console.error(err);
      // toast.error("Failed to fetch records!");
    }
  };
    useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col md:flex-row">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 p-6 md:ml-64 mt-20 md:mt-6">
        {/* Page Header */}
        <div className="flex w-full items-center justify-center border-b border-white/10">
          <h1 className="text-3xl font-bold mb-6 text-center">Monthly Planner</h1>
        </div>

        {/* Form Card */}
        <form onSubmit={handleform} className="bg-slate-900 border border-white/10 rounded-xl p-6 backdrop-blur-md mt-12 shadow-md">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input className={inputClass} required onChange={(e) => setFormData({...formData, month: e.target.value})} name="month" value={formData.month} placeholder="Month" />
            </div>
            <div className="flex-1">
              <input className={inputClass} required onChange={(e) => setFormData({...formData, income: e.target.value})} name="income" value={formData.income} placeholder="Income" type="number" />
            </div>
            <div className="flex-1">
              <input className={inputClass} required onChange={(e) => setFormData({...formData, expense: e.target.value})} name="expense" value={formData.expense} placeholder="Expense" type="number" />
            </div>
            <div className="flex-1">
              <input className={inputClass} required onChange={(e) => setFormData({...formData, savings: e.target.value})} name="savings" value={formData.savings} placeholder="Savings" type="number" />
            </div>
          </div>

        
          <button onClick={clearform} type="button" className="mt-5 cursor-pointer mr-4 w-full md:w-auto rounded-md bg-gray-600 hover:bg-gray-700 transition px-6 py-2 text-sm font-semibold text-white">
            Clear
          </button>
          <button className="mt-5 w-full md:w-auto rounded-md cursor-pointer bg-green-600 hover:bg-green-700 transition px-6 py-2 text-sm font-semibold text-white">
            Add Record
          </button>
        
        </form>
        <div className="flex-1 mt-8 bg-slate-900 border border-white/10 rounded-xl p-6 backdrop-blur-md shadow-md">
          <input className={inputClass} required onChange={(e) => setalready(e.target.value)} name="alreadysaved" value={already} placeholder="Already Saved" type="number" />
           <button onClick={handlealreadysaved} className="mt-5 cursor-pointer w-full md:w-auto rounded-md bg-green-600 hover:bg-green-700 transition px-6 py-2 text-sm font-semibold text-white">
              Update Savings
          </button>
        </div>

        {/* Table Card */}
        <div className="mt-8 bg-slate-900 border border-white/10 rounded-xl backdrop-blur-md shadow-md">
          {/* Table Header */}
          <div className="flex px-6 py-4 text-sm font-semibold text-white/60">
            <div className="flex-1">Month</div>
            <div className="flex-1 text-center">Income</div>
            <div className="flex-1 text-center">Expense</div>
            <div className="flex-1 text-center">Savings</div>
            <div className="flex-1 text-center">Balance</div>
          </div>

          <div className="h-px bg-white/10" />

          {/* Table Body */}
          <div>
            {records.length > 0 ? (
              records.map((record, index) => (
                <div
                  key={index}
                  className="flex px-6 py-4 text-sm text-white/80 text-center border-b border-white/10"
                >
                  <div className="flex-1 text-left">{record.month}</div>
                  <div className="flex-1">{record.totalIncome}</div>
                  <div className="flex-1">{record.totalExpense}</div>
                  <div className="flex-1">{record.savings}</div>
                  <div className="flex-1">{record.totalIncome - record.totalExpense - record.savings}</div>
                </div>
              ))
            ) : (
              <div className="px-6 py-10 text-sm text-white/40 text-center">
                No records found. Please add your monthly data using the form above.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MonthlyPlanner;