import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE}/api/users`)
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-3">Community Members</h2>
      <input
        type="text"
        placeholder="Search members..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="border p-2 mb-4 rounded w-full"
      />
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(u => (
          <li key={u._id} className="border p-4 rounded shadow hover:shadow-lg transition">
            <strong>{u.name}</strong> - {u.city}, {u.state}
          </li>
        ))}
      </ul>
    </div>
  );
}
