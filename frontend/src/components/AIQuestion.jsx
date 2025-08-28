import React, { useState } from "react";
import axios from "axios";

export default function AIQuestion() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const askAI = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE}/api/ask`, { question });
      setAnswer(res.data.answer);
    } catch (err) {
      console.error(err);
      setAnswer("Error fetching answer.");
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-3">Ask AI</h2>
      <input
        type="text"
        placeholder="Ask anything about Digamber Jain"
        value={question}
        onChange={e => setQuestion(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <button
        onClick={askAI}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-2 hover:bg-blue-700"
      >
        Ask
      </button>
      <p className="mt-2">{answer}</p>
    </div>
  );
}
