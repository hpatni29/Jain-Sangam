import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Gurus() {
  const [gurus, setGurus] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE}/api/gurus`)
      .then(res => setGurus(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-3">Gurus</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gurus.map(g => (
          <li key={g._id} className="border p-4 rounded shadow hover:shadow-lg transition">
            <h3 className="font-bold text-lg">{g.name}</h3>
            <p>{g.bio}</p>
            {g.youtube && (
              <iframe
                className="mt-2 w-full h-48"
                src={g.youtube}
                title={g.name}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
