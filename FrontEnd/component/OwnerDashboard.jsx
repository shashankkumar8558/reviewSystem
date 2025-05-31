import { useEffect, useState } from "react";
import Navbar from "./Navbar";


const OwnerDashboard = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchOwnerStats = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/owner/store/average", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();
        if (res.ok) setStores(data.stores);
      } catch (err) {
        console.error("Failed to fetch owner dashboard", err);
      }
    };

    fetchOwnerStats();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-700">Owner Dashboard</h1>
        <div className="space-y-4">
          {stores.map((store) => (
            <div
              key={store.storeId}
              className="bg-white p-4 rounded shadow border"
            >
              <h2 className="font-semibold text-lg">{store.storeName}</h2>
              <p className="text-sm text-gray-600">
                Average Rating: <b>{store.averageRating}</b> | Total Ratings:{" "}
                {store.totalRatings}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
