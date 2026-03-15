// import { useEffect,useState } from "react";
// import API from "../services/api";
// import Navbar from "../components/Navbar";

// function Statement(){

//   const [transactions,setTransactions] = useState([]);

//   useEffect(()=>{

//     const fetchTransactions = async ()=>{

//       const res = await API.get("/account/statement");

//       setTransactions(res.data);

//     };

//     fetchTransactions();

//   },[]);

//   return(

//     <div>
//         <Navbar/>

//       <h1>Transaction History</h1>

//       {transactions.map((t,i)=>(

//         <div key={i}>

//           <p>Amount: {t.amount}</p>
//           <p>Type: {t.transaction_type}</p>

//         </div>

//       ))}

//     </div>

//   );

// }

// export default Statement;

// 


import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Statement() {
  const [transactions, setTransactions] = useState([]);
  const [myId, setMyId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await API.get("/account/balance");
        setMyId(userRes.data.id);

        const transRes = await API.get("/account/statement");
        
        // --- FRONTEND FILTER LOGIC ---
        // This removes duplicates by grouping transactions by their creation time and amount
        const uniqueData = transRes.data.filter((v, i, a) => 
          a.findIndex(t => 
            t.created_at === v.created_at && t.amount === v.amount
          ) === i
        );
        
        setTransactions(uniqueData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Statement</h1>
        <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Type</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {transactions.map((t, i) => {
                const isDebit = String(t.sender_id) === String(myId);
                return (
                  <tr key={i} className="hover:bg-gray-50/50 transition">
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-black px-2 py-1 rounded-md uppercase ${
                        isDebit ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
                      }`}>
                        {isDebit ? 'debit' : 'credit'}
                      </span>
                    </td>
                    <td className={`px-6 py-4 text-right font-bold ${
                      isDebit ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {isDebit ? '-' : '+'} ₹{t.amount.toLocaleString("en-IN")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Statement;