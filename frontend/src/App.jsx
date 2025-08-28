import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function App() {
  const [gurus, setGurus] = useState([]);
  const [temples, setTemples] = useState([]);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get(`${API_BASE}/api/gurus/ai`).then(res => setGurus(res.data));
    axios.get(`${API_BASE}/api/temples/ai`).then(res => setTemples(res.data));
    axios.get(`${API_BASE}/api/users`).then(res => setUsers(res.data));
  }, []);

  const handleSearch = () => {
    axios.get(`${API_BASE}/api/users/search/${search}`).then(res => setUsers(res.data));
  };

  return (
    <div style={{ padding: 16 }}>
      <h1>🙏 Digamber Jain Community</h1>

      <section>
        <h2>Gurus</h2>
        {gurus.map(g => (
          <div key={g._id}>
            <h3>{g.name} ({g.title})</h3>
            <p>{g.biography}</p>
            {g.youtubeVideos?.map((url,i) => (
              <iframe key={i} width="300" height="170" src={url.replace("watch?v=", "embed/")} title={g.name}></iframe>
            ))}
          </div>
        ))}
      </section>

      <section>
        <h2>Temples</h2>
        {temples.map(t => (
          <div key={t._id}>
            <h3>{t.name}</h3>
            <p>{t.location}</p>
            <p>Facilities: {t.facilities.join(", ")}</p>
          </div>
        ))}
      </section>

      <section>
        <h2>Users</h2>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name"/>
        <button onClick={handleSearch}>Search</button>
        <ul>{users.map(u=><li key={u._id}>{u.name} - {u.email}</li>)}</ul>
      </section>
    </div>
  );
}
