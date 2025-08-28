import { useEffect, useState } from "react";
import axios from "axios";
import TempleCard from "../components/TempleCard";

const Temples = () => {
  const [temples, setTemples] = useState([]);

  useEffect(() => {
    const fetchTemples = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE}/api/temples`);
      setTemples(res.data);
    };
    fetchTemples();
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {temples.map((temple) => <TempleCard key={temple._id} temple={temple} />)}
    </div>
  );
};

export default Temples;
