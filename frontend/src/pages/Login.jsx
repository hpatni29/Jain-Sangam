import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload
    setError(""); // reset error
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE}/api/auth/login`,
        { email, password }
      );

      // Save JWT token to localStorage
      localStorage.setItem("token", res.data.token);

      // Redirect to home page
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
        "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border px-3 py-2 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border px-3 py-2 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-accent transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
