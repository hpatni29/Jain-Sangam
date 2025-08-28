import { useState } from "react";

export default function AIChat() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/ai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();

      if (data.error) {
        setAnswer("Error: " + data.error);
      } else {
        setAnswer(data.answer);
      }
    } catch (err) {
      setAnswer("Error fetching AI response");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Ask the AI</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question..."
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Loading..." : "Ask"}
        </button>
      </form>
      {answer && (
        <div className="mt-4 p-2 border rounded bg-gray-50">
          <strong>Answer:</strong> {answer}
        </div>
      )}
    </div>
  );
}
