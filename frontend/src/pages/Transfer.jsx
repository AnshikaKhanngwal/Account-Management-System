// import { useState,useEffect } from "react";
// import API from "../services/api";
// import Navbar from "../components/Navbar";

// function Transfer(){

//   const [users,setUsers] = useState([]);
//   const [receiverId,setReceiverId] = useState("");
//   const [amount,setAmount] = useState("");

//   useEffect(()=>{

//     const fetchUsers = async ()=>{

//       const res = await API.get("/account/users");

//       setUsers(res.data);

//     };

//     fetchUsers();

//   },[]);

//   const sendMoney = async () => {

//     try{

//       await API.post("/account/transfer",{
//         receiverId,
//         amount
//       });

//       alert("Transfer successful");

//     }catch(err){

//       alert("Transfer failed");

//     }

//   };

//   return(

//     <div>
//         <Navbar/>

//       <h1>Send Money</h1>

//       <select onChange={(e)=>setReceiverId(e.target.value)}>

//         <option>Select User</option>

//         {users.map((user)=>(
//           <option key={user.id} value={user.id}>
//             {user.name}
//           </option>
//         ))}

//       </select>

//       <input
//       placeholder="Amount"
//       onChange={(e)=>setAmount(e.target.value)}
//       />

//       <button onClick={sendMoney}>
//         Transfer
//       </button>

//     </div>

//   );

// }

// export default Transfer;

import { useState, useEffect } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Transfer() {
  const [users, setUsers] = useState([]);
  const [receiverId, setReceiverId] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/account/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    };
    fetchUsers();
  }, []);

  const sendMoney = async () => {
    if (!receiverId || !amount) {
      alert("Please select a user and enter an amount");
      return;
    }
    try {
      await API.post("/account/transfer", {
        receiverId,
        amount: Number(amount),
      });
      alert("Transfer successful");
    } catch (err) {
      alert("Transfer failed");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Send Money</h1>

        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
          {/* User Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Select Recipient</label>
            <select
              className="w-full p-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-blue-500 transition"
              onChange={(e) => setReceiverId(e.target.value)}
            >
              <option value="">Choose a user...</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Amount (₹)</label>
            <input
              type="number"
              placeholder="0.00"
              className="w-full p-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-blue-500 transition font-semibold text-lg"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          {/* Action Button */}
          <button
            onClick={sendMoney}
            className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-sm hover:bg-black transition shadow-md shadow-gray-200"
          >
            Confirm Transfer
          </button>
        </div>
      </main>
    </div>
  );
}

export default Transfer;