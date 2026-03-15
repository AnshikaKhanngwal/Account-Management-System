// import { useState } from "react";
// import API from "../services/api";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

// function Login(){

//   const [email,setEmail] = useState("");
//   const [password,setPassword] = useState("");

//   const navigate = useNavigate();

//   const handleLogin = async () => {

//     try{

//       const res = await API.post("/auth/login",{
//         email,
//         password
//       });

//       localStorage.setItem("token",res.data.token);

//       navigate("/dashboard");

//     }catch(err){

//       alert("Login Failed");

//     }

//   };

//   return (
//   <div>

//     <h2>Login</h2>

//     <input
//       placeholder="Email"
//       onChange={(e)=>setEmail(e.target.value)}
//     />

//     <input
//       type="password"
//       placeholder="Password"
//       onChange={(e)=>setPassword(e.target.value)}
//     />

//     <button onClick={handleLogin}>
//       Login
//     </button>

//     <p>
//       New User? <Link to="/signup">Signup here</Link>
//     </p>

//   </div>
// );

// }

// export default Login;

import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Login Failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Login</h2>

        <div className="space-y-4">
          <input
            className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Login
          </button>
        </div>

        <p className="mt-4 text-center text-sm text-gray-600">
          New User?{" "}
          <Link to="/signup" className="text-blue-600 font-medium hover:underline">
            Signup here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;