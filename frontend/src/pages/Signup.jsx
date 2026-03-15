// import { useState } from "react";
// import API from "../services/api";
// import { useNavigate } from "react-router-dom";

// function Signup(){

//   const [name,setName] = useState("");
//   const [email,setEmail] = useState("");
//   const [password,setPassword] = useState("");

//   const navigate = useNavigate();

//   const handleSignup = async () => {

//     try{

//       await API.post("/auth/signup",{
//         name,
//         email,
//         password
//       });

//       alert("Signup successful");

//       navigate("/");

//     }catch(err){

//       alert("Signup failed");

//     }

//   };

//   return(

//     <div>

//       <h2>Signup</h2>

//       <input
//       placeholder="Name"
//       onChange={(e)=>setName(e.target.value)}
//       />

//       <input
//       placeholder="Email"
//       onChange={(e)=>setEmail(e.target.value)}
//       />

//       <input
//       type="password"
//       placeholder="Password"
//       onChange={(e)=>setPassword(e.target.value)}
//       />

//       <button onClick={handleSignup}>
//         Signup
//       </button>

//     </div>

//   );

// }

// export default Signup;

import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await API.post("/auth/signup", { name, email, password });
      alert("Signup successful");
      navigate("/");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Signup</h2>
        
        <div className="space-y-4">
          <input
            className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button 
            onClick={handleSignup}
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Create Account
          </button>
        </div>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;