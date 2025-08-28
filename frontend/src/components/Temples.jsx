import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Temples() {
  const [temples, setTemples] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE}/api/temples`)
      .then(res => setTemples(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-3">Temples</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {temples.map(t => (
          <li key={t._id} className="border p-4 rounded shadow hover:shadow-lg transition">
            <h3 className="font-bold text-lg">{t.name}</h3>
            <p>{t.city}, {t.state}</p>
            <p>Facilities: {t.facilities.join(", ")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
