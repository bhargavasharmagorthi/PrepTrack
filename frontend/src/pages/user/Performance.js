import React, { useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

export default function Performance() {
  // -------- SAMPLE DATA --------
  const overview = {
    totalTests: 12,
    avgScore: 78,
    accuracy: 80,
    timeSpent: "12 hrs",
    goalCompletion: 70,
  };

  const initialTestHistory = [
    { name: "Full Test 01", date: "01 Nov", score: 75, accuracy: 78, rank: 120, subject: "Physics" },
    { name: "Full Test 02", date: "05 Nov", score: 82, accuracy: 85, rank: 90, subject: "Chemistry" },
    { name: "Full Test 03", date: "10 Nov", score: 87, accuracy: 88, rank: 60, subject: "Maths" },
    { name: "Full Test 04", date: "12 Nov", score: 70, accuracy: 72, rank: 150, subject: "Physics" },
  ];

  const topicPerformance = [
    { subject: "Physics", avgScore: 80, accuracy: 78, weakTopics: ["Optics", "Electrostatics"] },
    { subject: "Chemistry", avgScore: 72, accuracy: 70, weakTopics: ["Organic Chemistry", "Stoichiometry"] },
    { subject: "Maths", avgScore: 85, accuracy: 83, weakTopics: ["Trigonometry", "Integration"] },
  ];

  const scoreTrend = [
    { test: "FT01", score: 75 },
    { test: "FT02", score: 82 },
    { test: "FT03", score: 87 },
    { test: "FT04", score: 70 },
  ];

  const accuracyPerSubject = [
    { subject: "Physics", accuracy: 78 },
    { subject: "Chemistry", accuracy: 70 },
    { subject: "Maths", accuracy: 83 },
  ];

  const pieTimeSpent = [
    { name: "Physics", value: 4 },
    { name: "Chemistry", value: 3 },
    { name: "Maths", value: 5 },
  ];

  const COLORS = ["#2563eb", "#22c55e", "#ef4444"];

  const nextStep = ["Focus on Trigonometry this week", "Attempt 2 more full-length tests"];

  // -------- State for sorting/filtering and drill-down --------
  const [testHistory, setTestHistory] = useState(initialTestHistory);
  const [sortKey, setSortKey] = useState(null);
  const [filterSubject, setFilterSubject] = useState("All");
  const [selectedTopic, setSelectedTopic] = useState(null);

  const sortTable = (key) => {
    const sorted = [...testHistory].sort((a, b) => (a[key] > b[key] ? 1 : -1));
    setTestHistory(sorted);
    setSortKey(key);
  };

  const filteredTests =
    filterSubject === "All"
      ? testHistory
      : testHistory.filter((t) => t.subject === filterSubject);

  const handleTopicClick = (subject, topic) => {
    setSelectedTopic({ subject, topic });
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Performance Analytics</h1>

      {/* Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(overview).map(([k, v], i) => (
          <div key={i} className="bg-white/80 backdrop-blur shadow-lg rounded-xl p-4">
            <p className="text-gray-600">{k.replace(/([A-Z])/g, " $1")}</p>
            <p className="text-2xl font-bold">{v}</p>
          </div>
        ))}
      </div>

      {/* Goal Completion */}
      <div className="bg-white/80 backdrop-blur shadow-lg rounded-xl p-5">
        <h3 className="font-semibold mb-2">🎯 Goal Completion</h3>
        <div className="w-full bg-gray-200 h-4 rounded-full">
          <div className="bg-blue-500 h-4 rounded-full" style={{ width: `${overview.goalCompletion}%` }}></div>
        </div>
        <p className="text-sm text-gray-600 mt-1">{overview.goalCompletion}% achieved</p>
      </div>

      {/* Test History Table with Sorting & Filtering */}
      <div className="bg-white/80 backdrop-blur shadow-lg rounded-xl p-5 overflow-x-auto">
        <h3 className="font-semibold mb-3">📑 Test History</h3>

        {/* Filter */}
        <div className="mb-2 flex gap-2 items-center">
          <p>Filter by Subject:</p>
          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="border rounded p-1"
          >
            <option>All</option>
            <option>Physics</option>
            <option>Chemistry</option>
            <option>Maths</option>
          </select>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 cursor-pointer">
              {["name","date","score","accuracy","rank"].map((col) => (
                <th key={col} className="p-2" onClick={() => sortTable(col)}>
                  {col.charAt(0).toUpperCase() + col.slice(1)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredTests.map((t, i) => (
              <tr key={i} className="border-b">
                <td className="p-2">{t.name}</td>
                <td className="p-2">{t.date}</td>
                <td className="p-2">{t.score}%</td>
                <td className="p-2">{t.accuracy}%</td>
                <td className="p-2">{t.rank}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Topic-wise Performance with Drill-down */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topicPerformance.map((t,i)=>(
          <div key={i} className="bg-white/80 backdrop-blur shadow-lg rounded-xl p-5">
            <h3 className="font-semibold mb-2">{t.subject}</h3>
            <p>Average Score: {t.avgScore}%</p>
            <p>Accuracy: {t.accuracy}%</p>
            <h4 className="mt-3 font-medium">Weak Topics:</h4>
            <ul className="list-disc list-inside">
              {t.weakTopics.map((topic,j)=>(
                <li key={j} className="text-red-600 cursor-pointer hover:underline"
                    onClick={()=>handleTopicClick(t.subject, topic)}>
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Drill-down modal / card */}
      {selectedTopic && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setSelectedTopic(null)}
            >
              ✖
            </button>
            <h3 className="font-bold mb-3">📌 {selectedTopic.subject} - {selectedTopic.topic}</h3>
            <p>Detailed question-level stats:</p>
            <ul className="list-disc list-inside">
              <li>Correct: 4</li>
              <li>Incorrect: 6</li>
              <li>Time Spent: 12 min</li>
              <li>Suggested Practice: Focused exercises available</li>
            </ul>
          </div>
        </div>
      )}

      {/* Score Trend */}
      <div className="bg-white/80 backdrop-blur shadow-lg rounded-xl p-5">
        <h3 className="font-semibold mb-3">📈 Score Trend Over Tests</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={scoreTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="test" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={3}/>
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Accuracy per Subject */}
      <div className="bg-white/80 backdrop-blur shadow-lg rounded-xl p-5">
        <h3 className="font-semibold mb-3">📊 Accuracy per Subject</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={accuracyPerSubject}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="subject"/>
            <YAxis/>
            <Tooltip/>
            <Bar dataKey="accuracy" fill="#22c55e"/>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Time Spent Pie */}
      <div className="bg-white/80 backdrop-blur shadow-lg rounded-xl p-5">
        <h3 className="font-semibold mb-3">⏱️ Time Spent per Subject</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={pieTimeSpent} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" label>
              {pieTimeSpent.map((entry,index)=><Cell key={index} fill={COLORS[index % COLORS.length]}/>)}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Next Steps Recommendations */}
      <div className="bg-white/80 backdrop-blur shadow-lg rounded-xl p-5">
        <h3 className="font-semibold mb-3">🧠 Next Step Suggestions</h3>
        <ul className="list-disc list-inside">
          {nextStep.map((s,i)=><li key={i}>{s}</li>)}
        </ul>
      </div>

    </div>
  );
}