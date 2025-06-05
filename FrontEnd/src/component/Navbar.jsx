
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <nav className="bg-white shadow px-4 py-3 flex justify-between items-center mb-6">
      <div className="font-bold text-xl text-blue-600">Review System</div>
      
     {/*  only when role is admin  */}
      <button
          onClick={() => {
            navigate("/dashboard/admin/add-store");
          }}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-white-700 text-sm text-blue"
        >
          Add Store
        </button>

      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">
          {user.userName} ({user.role})
        </span>
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
