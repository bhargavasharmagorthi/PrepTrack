import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";

export default function Signup() {
  const [activeTab, setActiveTab] = useState("user");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [className, setClassName] = useState("10th");
  const [state, setState] = useState("AP");
  const [city, setCity] = useState("");
  const [cityOther, setCityOther] = useState("");
  const [school, setSchool] = useState("");
  const [subject, setSubject] = useState("");
  const [secretQuestion, setSecretQuestion] = useState("");
  const [secretAnswer, setSecretAnswer] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [whatsappNotifications, setWhatsappNotifications] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [createdId, setCreatedId] = useState("");

  const navigate = useNavigate();

  const states = ["AP", "TS"];
  const cities = {
    AP: ["Vijayawada", "Visakhapatnam", "Tirupati", "Other"],
    TS: ["Hyderabad", "Warangal", "Karimnagar", "Other"],
  };
  const classes = ["10th", "11th", "12th"];
  const secretQuestions = [
    "What is your pet's name?",
    "What is your favorite color?",
    "What is your mother's maiden name?",
    "Other",
  ];

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!secretQuestion || !secretAnswer) {
      alert("Security question and answer are required!");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      let endpoint = "";
      let payload = { name, email, password, secretQuestion, secretAnswer };

      if (activeTab === "user") {
        endpoint = "/auth/signup-user";
        payload = {
          ...payload,
          phone,
          class: className,
          state,
          city,
          cityOther,
          school,
          darkMode,
          notificationsEnabled,
          emailNotifications,
          whatsappNotifications,
        };
      } else if (activeTab === "admin") {
        endpoint = "/auth/signup-admin";
        if (!subject) {
          alert("Subject is required for Admin!");
          setLoading(false);
          return;
        }
        payload.subject = subject;
      } else if (activeTab === "agent") {
        endpoint = "/auth/signup-agent";
      }

      const res = await api.post(endpoint, payload);
      const id = res.data.userId || res.data.adminId || res.data.agentId;
      setCreatedId(id);
      setShowModal(true);
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
      alert(err.response?.data?.message || "Signup failed! Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-green-200 p-6 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-7xl">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          Create Account
        </h2>

        {/* Tabs */}
        <div className="flex justify-center mb-6 gap-4">
          {["user", "admin", "agent"].map((role) => (
            <button
              key={role}
              onClick={() => setActiveTab(role)}
              className={`py-2 px-4 font-semibold rounded-t-lg transition ${
                activeTab === role
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
          ))}
        </div>

        <form onSubmit={handleSignup} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1 */}
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {activeTab === "user" && (
              <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            )}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <span
                className="absolute right-3 top-3 cursor-pointer text-gray-600"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </div>
          </div>

          {/* Column 2 */}
          {activeTab === "user" && (
            <div className="flex flex-col gap-4">
              <select
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                  setCity("");
                }}
                className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select State</option>
                {states.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>

              {state && (
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select City</option>
                  {cities[state].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              )}

              {city === "Other" && (
                <input
                  type="text"
                  placeholder="Enter City"
                  value={cityOther}
                  onChange={(e) => setCityOther(e.target.value)}
                  className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              )}

              <input
                type="text"
                placeholder="School Name"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          )}

          {/* Column 3 */}
          <div className="flex flex-col gap-4">
            {activeTab === "user" && (
              <select
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {classes.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            )}

            {activeTab === "admin" && (
              <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Subject</option>
              <option value="MAT">Mathematics</option>
              <option value="PHY">Physics</option>
              <option value="CHE">Chemistry</option>
            </select>
            )}

            <select
              value={secretQuestion}
              onChange={(e) => setSecretQuestion(e.target.value)}
              required
              className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Security Question</option>
              {secretQuestions.map((q) => <option key={q} value={q}>{q}</option>)}
            </select>

            {secretQuestion === "Other" && (
              <input
                type="text"
                placeholder="Enter Secret Question"
                value={secretQuestion}
                onChange={(e) => setSecretQuestion(e.target.value)}
                required
                className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            )}

            <input
              type="text"
              placeholder="Secret Answer"
              value={secretAnswer}
              onChange={(e) => setSecretAnswer(e.target.value)}
              required
              className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="col-span-full bg-green-600 text-white p-3 rounded hover:bg-green-700 transition"
          >
            {loading ? "Creating..." : `Sign Up as ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`}
          </button>
        </form>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-8 w-11/12 md:w-1/2 lg:w-1/3 text-center relative">
            <h2 className="text-2xl font-bold mb-4 text-green-700">Signup Successful!</h2>
            <p className="mb-4">
              Your <strong>{activeTab.toUpperCase()}</strong> ID is:
            </p>
            <p className="text-xl font-mono bg-gray-100 p-3 rounded mb-6">{createdId}</p>
            <button
              onClick={() => { setShowModal(false); navigate("/login"); }}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
            >
              Go to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}