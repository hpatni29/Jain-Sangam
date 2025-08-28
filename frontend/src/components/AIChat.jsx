import { useState } from "react";
import axios from "axios";

const AIChat = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askQuestion = async (e) => {
    e.preventDefault();
    if (!question) return;
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE}/api/ai`, { question });
      setAnswer(res.data.answer);
    } catch (err) {
      setAnswer("Error fetching AI response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Ask AI</h2>
      <form onSubmit={askQuestion} className="mb-4">
        <input
          type="text"
          className="border p-2 w-full rounded-lg"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask something..."
        />
        <button className="mt-2 bg-primary text-white px-4 py-2 rounded hover:bg-accent transition">
          {loading ? "Thinking..." : "Ask"}
        </button>
      </form>
      {answer && <p className="border p-4 rounded-lg bg-gray-100">{answer}</p>}
    </div>
  );
};

export default AIChat;
