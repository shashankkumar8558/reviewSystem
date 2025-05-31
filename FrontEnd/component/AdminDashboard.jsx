import { useEffect, useState } from "react";
import Navbar from "./Navbar";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
  });
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [storeSearch, setStoreSearch] = useState("");
  const [stores, setStores] = useState([]);

  useEffect(() => {
    fetchDashboard();
    fetchUsers();
    fetchStores();
  }, [filter, storeSearch]);

  const fetchStores = async () => {
    const url = storeSearch
      ? `http://localhost:3000/api/admin/store/list?search=${storeSearch}`
      : `http://localhost:3000/api/admin/store/list`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await res.json();
    if (res.ok) setStores(data.stores);
  };

  const fetchDashboard = async () => {
    const res = await fetch("http://localhost:3000/api/admin/dashboard", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await res.json();
    if (res.ok) setStats(data);
  };

  const fetchUsers = async () => {
    const url = filter
      ? `http://localhost:3000/api/admin/users/list?role=${filter}`
      : `http://localhost:3000/api/admin/users/list`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await res.json();
    if (res.ok) setUsers(data.users);
  };

  const handleRoleUpdate = async (userId, role) => {
  try {
    const res = await fetch("http://localhost:3000/api/admin/role/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ userId, role }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Role updated successfully");
    } else {
      alert("Failed to update role: " + data.message);
    }
  } catch (err) {
    console.error("Error updating role:", err);
    alert("Server error");
  }
};


  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-700">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <StatCard label="Total Users" value={stats.userCount} />
          <StatCard label="Total Stores" value={stats.storeCount} />
          <StatCard label="Total Ratings" value={stats.ratingCount} />
        </div>

        <h2 className="text-xl font-semibold mb-2">User List</h2>

        <div className="flex gap-3 mb-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">All</option>
            <option value="ADMIN">Admin</option>
            <option value="OWNER">Owner</option>
            <option value="USER">User</option>
          </select>
        </div>

        <div className="space-y-2">
          {users.map((u) => (
            <div
              key={u.id}
              className="bg-white shadow p-3 rounded border flex justify-between items-center"
            >
              <div>
                <div className="font-medium">{u.userName}</div>
                <div className="text-sm text-gray-500">{u.email}</div>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={u.role}
                  onChange={(e) =>
                    setUsers((prev) =>
                      prev.map((user) =>
                        user.id === u.id
                          ? { ...user, role: e.target.value }
                          : user
                      )
                    )
                  }
                  className="text-sm p-1 border rounded"
                >
                  <option value="USER">User</option>
                  <option value="OWNER">Owner</option>
                  <option value="ADMIN">Admin</option>
                </select>

                <button
                  className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => handleRoleUpdate(u.id, u.role)}
                >
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
        <h2 className="text-xl font-semibold mt-10 mb-2">Store List</h2>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name or address"
            value={storeSearch}
            onChange={(e) => setStoreSearch(e.target.value)}
            className="p-2 border rounded w-full sm:w-1/2"
          />
        </div>

        <div className="space-y-2">
          {stores.map((store) => (
            <div key={store.id} className="bg-white shadow p-3 rounded border">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold">{store.storeName}</div>
                  <div className="text-sm text-gray-500">
                    {store.storeAddress}
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  Owner: {store.owner?.userName}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value }) => (
  <div className="bg-white shadow-md rounded-xl p-6 text-center border">
    <div className="text-sm text-gray-500">{label}</div>
    <div className="text-2xl font-bold text-blue-700">{value}</div>
  </div>
);

export default AdminDashboard;
