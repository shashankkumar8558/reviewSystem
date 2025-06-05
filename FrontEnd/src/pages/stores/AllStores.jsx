import { useEffect, useState } from "react";
import Navbar from "../../component/Navbar";



const AllStores = () => {
  const [stores, setStores] = useState([]);
  const [query, setQuery] = useState("");
  const [ratingValues, setRatingValues] = useState({}); 
  const [submitted, setSubmitted] = useState({}); 

  useEffect(() => {
    fetchStores();
  }, [query]);

  const fetchStores = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/rating/store/search?query=${query}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      if (res.ok) setStores(data.stores || []);
    } catch (err) {
      console.error("Failed to fetch stores", err);
    }
  };

  const handleRating = async (storeID) => {
    const value = ratingValues[storeID];
    if (!value) return alert("Select a rating");

    try {
      const res = await fetch("http://localhost:3000/rating", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ storeID, value }),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitted((prev) => ({ ...prev, [storeID]: true }));
        alert("Rating submitted!");
      } else {
        alert(data.message || "Rating failed");
      }
    } catch (err) {
      console.error("Error submitting rating", err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Browse Stores</h1>

        <input
          type="text"
          placeholder="Search by name or address"
          className="p-2 border rounded w-full sm:w-1/2 mb-6"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="space-y-4">
          {stores.map((store) => (
            <div
              key={store.id}
              className="bg-white shadow p-4 rounded border space-y-2"
            >
              <div>
                <h2 className="text-lg font-semibold">{store.storeName}</h2>
                <p className="text-sm text-gray-600">{store.storeAddress}</p>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={ratingValues[store.id] || ""}
                  onChange={(e) =>
                    setRatingValues((prev) => ({
                      ...prev,
                      [store.id]: Number(e.target.value),
                    }))
                  }
                  className="p-1 border rounded text-sm"
                >
                  <option value="">Rate</option>
                  <option value="1">1 ⭐</option>
                  <option value="2">2 ⭐</option>
                  <option value="3">3 ⭐</option>
                  <option value="4">4 ⭐</option>
                  <option value="5">5 ⭐</option>
                </select>

                <button
                  onClick={() => handleRating(store.id)}
                  disabled={submitted[store.id]}
                  className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  {submitted[store.id] ? "Submitted" : "Submit Rating"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllStores;
