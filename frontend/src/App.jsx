import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE}/api/users`)
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h1>🙏 Digamber Jain Community</h1>
      <h2>Users</h2>
      <ul>
        {users.map(u => (
          <li key={u._id}>{u.name} - {u.email}</li>
        ))}
      </ul>
    </div>
  );
}
