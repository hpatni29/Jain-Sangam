import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [gurus, setGurus] = useState([]);
  const [temples, setTemples] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const guruRes = await axios.get(
          `${import.meta.env.VITE_API_BASE}/api/gurus`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setGurus(guruRes.data);

        const templeRes = await axios.get(
          `${import.meta.env.VITE_API_BASE}/api/temples`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTemples(templeRes.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch data. Check your token or API.");
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Gurus</h2>
        <ul className="space-y-2">
          {gurus.map((g) => (
            <li key={g._id} className="border p-3 rounded bg-white">
              {g.name}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Temples</h2>
        <ul className="space-y-2">
          {temples.map((t) => (
            <li key={t._id} className="border p-3 rounded bg-white">
              {t.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
