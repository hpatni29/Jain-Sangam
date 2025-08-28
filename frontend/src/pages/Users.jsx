import { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE}/api/users`);
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <input
        type="text"
        placeholder="Search users..."
        className="border p-2 mb-4 rounded w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul className="space-y-2">
        {filteredUsers.map(u => (
          <li key={u._id} className="border p-3 rounded bg-white">{u.name} - {u.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
