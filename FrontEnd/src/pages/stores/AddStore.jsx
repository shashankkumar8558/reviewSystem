import { useState, useEffect } from "react";
import Navbar from "../../component/Navbar";



const AddStore = () => {
  const [form, setForm] = useState({
    storeName: "",
    storeEmail: "",
    storeAddress: "",
    ownerId: "",
  });

  const [owners, setOwners] = useState([]);

  const fetchOwners = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/admin/users/list?role=OWNER`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      if (res.ok) setOwners(data.users);
    } catch (err) {
      console.error("Failed to load owners");
    }
  };

  useEffect(() => {
    fetchOwners();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/admin/store/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Store created!");
        setForm({
          storeName: "",
          storeEmail: "",
          storeAddress: "",
          ownerId: "",
        });
      } else {
        alert(data.message || "Failed to create store");
      }
    } catch (err) {
      console.error("Store creation error", err);
      alert("Server error");
    }
  };

  console.log(owners,"pppppppppppp");
  
  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Add New Store</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Store Name"
            value={form.storeName}
            onChange={(e) => setForm({ ...form, storeName: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="email"
            placeholder="Store Email"
            value={form.storeEmail}
            onChange={(e) => setForm({ ...form, storeEmail: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="text"
            placeholder="Store Address"
            value={form.storeAddress}
            onChange={(e) => setForm({ ...form, storeAddress: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />

          <select
            value={form.ownerId}
            onChange={(e) => setForm({ ...form, ownerId: e.target.value })}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Owner</option>
            {owners.map((owner) => (
              <option key={owner.id} value={owner.id}>
                {owner.userName} ({owner.email})
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded"
          >
            Create Store
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStore;
