import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // use context

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      login({ token: res.data.token, name: res.data.name }); // update context
      navigate("/landing");
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
      alert("Login failed! Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200">
      <div className="bg-white rounded-xl shadow-lg p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Welcome Back</h2>

        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="my-6 flex items-center justify-center gap-4">
          <hr className="w-16 border-gray-300" />
          <span className="text-gray-500 text-sm">or login with</span>
          <hr className="w-16 border-gray-300" />
        </div>
        <div className="flex justify-center gap-4">
          <button className="bg-red-500 text-white p-3 rounded hover:bg-red-600 transition">Google</button>
          <button className="bg-blue-800 text-white p-3 rounded hover:bg-blue-900 transition">Facebook</button>
        </div>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")} className="text-blue-600 font-semibold cursor-pointer hover:underline">
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}