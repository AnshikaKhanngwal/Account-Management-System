// import { Link, useNavigate } from "react-router-dom";

// function Navbar(){

//   const navigate = useNavigate();

//   const handleLogout = () => {

//     localStorage.removeItem("token");

//     navigate("/");

//   };

//   return(

//     <div style={{
//       display:"flex",
//       gap:"20px",
//       padding:"10px",
//       background:"#f5f5f5"
//     }}>

//       <Link to="/dashboard">Dashboard</Link>

//       <Link to="/transfer">Transfer</Link>

//       <Link to="/statement">Statement</Link>

//       <button onClick={handleLogout}>
//         Logout
//       </button>

//     </div>

//   );

// }

// export default Navbar;

import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <Link 
            to="/dashboard" 
            className="text-sm font-medium text-gray-600 hover:text-blue-600 transition"
          >
            Dashboard
          </Link>
          
          <Link 
            to="/transfer" 
            className="text-sm font-medium text-gray-600 hover:text-blue-600 transition"
          >
            Transfer
          </Link>
          
          <Link 
            to="/statement" 
            className="text-sm font-medium text-gray-600 hover:text-blue-600 transition"
          >
            Statement
          </Link>
        </div>

        {/* Action Button */}
        <button 
          onClick={handleLogout}
          className="text-sm font-semibold text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>

      </div>
    </nav>
  );
}

export default Navbar;