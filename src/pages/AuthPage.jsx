import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AuthPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // error state
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // reset error
    try {
      await login(password);
    } catch (err) {
      setError(err.message); // set error message if login fails
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-white p-8 rounded-xl shadow-md w-80"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Admin Login
        </h1>

        <label className="text-gray-700 mb-2" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
        />

        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        <button
          type="submit"
          className="bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
