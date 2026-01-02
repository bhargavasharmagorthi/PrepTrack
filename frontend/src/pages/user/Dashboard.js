import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  // -------- SAMPLE DATA --------
  const summary = {
    accuracy: 78,
    avgTime: "42 sec",
    strongest: "Physics",
    weakest: "Chemistry",
  };

  const streak = 5;
  const recommendations = [
    "Complete these chapters to boost your Maths score by 20%",
    "Revision suggested: Motion in a Straight Line",
  ];

  const continueStudy = {
    pausedTest: "Full Test 03 – Physics",
    notesProgress: "Kinematics Notes – 50% done",
  };

  const leaderboard = [
    { rank: 1, name: "Ananya", score: 92 },
    { rank: 2, name: "Rohit", score: 90 },
    { rank: 3, name: "Ishan", score: 88 },
    { rank: 4, name: "Priya", score: 86 },
    { rank: 5, name: "Bhargava", score: 85 },
  ];

  const achievements = [
    "First Test Completed",
    "Accuracy > 80%",
    "Top 10% in National Test",
    "Consistency King - 7 days streak",
  ];

  const dailyStudyTime = "45 mins today";
  const notifications = [
    "New Test Series Released",
    "Rank Updated",
    "Personalized Recommendations Available",
  ];
  const quickActions = [
    { name: "Take a Test" },
    { name: "See Notes" },
    { name: "View Syllabus" },
    { name: "Doubts Forum" },
    { name: "Performance Report" },
  ];

  const motivationQuote = "“Push yourself, because no one else is going to do it for you.”";
  const focusTimer = "Pomodoro: 25 min";
  const syncStatus = "Last synced: 2 mins ago";

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">

      {/* Header */}
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Performance Summary & Streak */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Performance Summary */}
        <div className="col-span-2 bg-white/80 backdrop-blur shadow-lg rounded-xl p-4">
          <h3 className="font-semibold mb-3">Performance Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
              <p className="text-sm text-gray-600">Accuracy</p>
              <p className="text-2xl font-bold text-blue-600">{summary.accuracy}%</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
              <p className="text-sm text-gray-600">Avg Time / Question</p>
              <p className="text-2xl font-bold text-green-600">{summary.avgTime}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
              <p className="text-sm text-gray-600">Strongest</p>
              <p className="text-lg font-bold text-purple-600">{summary.strongest}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
              <p className="text-sm text-gray-600">Weakest</p>
              <p className="text-lg font-bold text-red-500">{summary.weakest}</p>
            </div>
          </div>
        </div>

        {/* Streak */}
        <div className="bg-white/80 backdrop-blur shadow-lg rounded-xl p-4 flex flex-col justify-between">
          <h3 className="font-semibold">🔥 Streak</h3>
          <p className="text-sm text-gray-600">Your practice streak is on!</p>
          <p className="text-4xl font-bold text-orange-500">{streak} Days</p>
        </div>
      </div>

      {/* Personalized Recommendations & Continue Learning */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Recommendations */}
        <div className="bg-white/80 backdrop-blur shadow-lg rounded-xl p-5">
          <h3 className="font-semibold mb-3">✨ Smart Recommendations</h3>
          {recommendations.map((rec, i) => (
            <div key={i} className="p-3 bg-blue-50 border border-blue-200 rounded-lg mb-3">
              <p className="text-blue-700">{rec}</p>
            </div>
          ))}
        </div>

        {/* Continue Learning */}
        <div className="bg-white/80 backdrop-blur shadow-lg rounded-xl p-5">
          <h3 className="font-semibold mb-3">📚 Continue Where You Left Off</h3>
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg mb-3">
            <p>Test Paused: <span className="font-semibold">{continueStudy.pausedTest}</span></p>
            <button className="mt-2 px-3 py-1 bg-green-600 text-white rounded-lg">Resume Test</button>
          </div>
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p>Notes Progress: <span className="font-semibold">{continueStudy.notesProgress}</span></p>
            <button className="mt-2 px-3 py-1 bg-yellow-600 text-white rounded-lg">Continue Notes</button>
          </div>
        </div>
      </div>

      {/* Social Motivation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Leaderboard */}
        <div className="bg-white/80 backdrop-blur shadow-lg rounded-xl p-5">
          <h3 className="font-semibold mb-3">🏆 Leaderboard Snapshot</h3>
          <ol className="list-decimal list-inside space-y-1">
            {leaderboard.map((user) => (
              <li key={user.rank}>{user.name} - {user.score}%</li>
            ))}
          </ol>
          <button className="mt-3 px-3 py-1 bg-blue-600 text-white rounded-lg">View Full Leaderboard</button>
        </div>

        {/* Achievements */}
        <div className="bg-white/80 backdrop-blur shadow-lg rounded-xl p-5">
          <h3 className="font-semibold mb-3">🎖 Achievement Badges</h3>
          <ul className="list-disc list-inside space-y-1">
            {achievements.map((ach, i) => (
              <li key={i}>{ach}</li>
            ))}
          </ul>
        </div>

        {/* Quick Actions / Notifications */}
        <div className="bg-white/80 backdrop-blur shadow-lg rounded-xl p-5">
          <h3 className="font-semibold mb-3">⚙️ Quick Actions & Notifications</h3>
          <div className="flex flex-wrap gap-2 mb-2">
            {quickActions.map((a,i)=>(<button key={i} className="px-3 py-1 bg-indigo-600 text-white rounded-lg">{a.name}</button>))}
          </div>
          <ul className="list-disc list-inside">
            {notifications.map((n,i)=><li key={i}>{n}</li>)}
          </ul>
        </div>
      </div>

      {/* Motivation & Productivity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/80 backdrop-blur shadow-lg rounded-xl p-5">
          <h3 className="font-semibold mb-3">🧘 Motivation</h3>
          <p>{motivationQuote}</p>
        </div>
        <div className="bg-white/80 backdrop-blur shadow-lg rounded-xl p-5">
          <h3 className="font-semibold mb-3">📵 Focus Timer (Pomodoro)</h3>
          <p>{focusTimer}</p>
        </div>
      </div>

      {/* Device Sync */}
      <div className="bg-white/80 backdrop-blur shadow-lg rounded-xl p-5">
        <h3 className="font-semibold mb-3">☁️ Device Sync & Progress Backup</h3>
        <p>{syncStatus}</p>
      </div>

    </div>
  );
}