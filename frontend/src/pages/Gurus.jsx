import { useEffect, useState } from "react";
import axios from "axios";
import GuruCard from "../components/GuruCard";

const Gurus = () => {
  const [gurus, setGurus] = useState([]);

  useEffect(() => {
    const fetchGurus = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE}/api/gurus`);
      setGurus(res.data);
    };
    fetchGurus();
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {gurus.map((guru) => <GuruCard key={guru._id} guru={guru} />)}
    </div>
  );
};

export default Gurus;
