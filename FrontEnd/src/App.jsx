import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminDashboard from "./component/AdminDashboard"
import OwnerDashboard from "./component/OwnerDashboard";
import AllStores from "./pages/stores/AllStores";
import AddStore from "./pages/stores/Addstore";

function App() {
  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/admin/add-store"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AddStore />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/user"
          element={
            <ProtectedRoute allowedRoles={["USER"]}>
              <AllStores />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/owner"
          element={
            <ProtectedRoute allowedRoles={["OWNER"]}>
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
  );
}

export default App;
