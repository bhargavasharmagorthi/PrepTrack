import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function ForgotPassword() {
  const [userId, setUserId] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const navigate = useNavigate();

  const handleGetQuestion = async () => {
    try {
      const res = await api.post("/auth/forgot-password", { userId });
      setQuestion(res.data.question);
    } catch (err) {
      console.error(err);
      alert("User not found!");
    }
  };

  const handleReset = async () => {
    if (!answer || !newPassword) return alert("Answer and new password are required!");
    try {
      await api.post("/auth/verify-answer", { userId, answer });
      await api.post("/auth/reset-password", { userId, newPassword });
      alert("Password reset successful!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Incorrect answer or reset failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-purple-200 p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-purple-700 text-center">Forgot Password</h2>

        <input
          type="text"
          placeholder="Enter your User/Admin/Agent ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={handleGetQuestion}
          className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition"
        >
          Get Security Question
        </button>

        {question && (
          <>
            <p className="font-semibold">Question: {question}</p>
            <input
              type={showAnswer ? "text" : "password"}
              placeholder="Enter Answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handleReset}
              className="bg-purple-600 text-white p-3 rounded hover:bg-purple-700 transition"
            >
              Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
}