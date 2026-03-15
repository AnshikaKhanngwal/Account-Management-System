// import { useEffect,useState } from "react";
// import API from "../services/api";
// import Navbar from "../components/Navbar";

// function Dashboard(){

//   const [balance,setBalance] = useState(0);

//   useEffect(()=>{

//     const fetchBalance = async ()=>{

//       const res = await API.get("/account/balance");

//       setBalance(res.data.balance);

//     };

//     fetchBalance();

//   },[]);

//   return(

//   <div>

//     <Navbar/>

//     <h1>Dashboard</h1>

//     <h2>Your Balance: ₹{balance}</h2>

//   </div>

// );

// }

// export default Dashboard;

import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await API.get("/account/balance");
        setBalance(res.data.balance);
      } catch (err) {
        console.error("Failed to fetch balance", err);
      }
    };
    fetchBalance();
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Balance Card */}
          <div className="bg-gray-900 p-8 rounded-2xl text-white">
            <p className="text-gray-400 text-sm font-medium">Balance</p>
            <h2 className="text-4xl font-bold mt-2">
              ₹{balance.toLocaleString("en-IN")}
            </h2>
            
            <div className="mt-8 flex gap-3">
              <button 
                onClick={() => navigate("/transfer")}
                className="flex-1 bg-white text-gray-900 py-2.5 rounded-lg font-bold text-sm hover:bg-gray-100 transition"
              >
                Transfer
              </button>
              <button className="flex-1 bg-gray-800 text-white py-2.5 rounded-lg font-bold text-sm border border-gray-700">
                Add Money
              </button>
            </div>
          </div>

          {/* Status Card */}
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
            <p className="text-gray-500 text-sm font-medium">Account Status</p>
            <div className="mt-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-900 font-semibold text-lg">Active</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;