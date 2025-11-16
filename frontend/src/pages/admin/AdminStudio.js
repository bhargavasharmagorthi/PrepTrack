// frontend/src/pages/AdminStudio.js
import React, { useEffect, useState } from "react";
import api from "../../api";

export default function AdminStudio() {
  const [stats, setStats] = useState({
    chapters: 0,
    topics: 0,
    questions: 0,
    tests: 0,
  });

  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const chapterRes = await api.get("/admin/chapters");
        const topicRes = await api.get("/admin/topics");
        const questionRes = await api.get("/admin/questions");
        const testRes = await api.get("/admin/tests");

        setStats({
          chapters: chapterRes.data.length,
          topics: topicRes.data.length,
          questions: questionRes.data.length,
          tests: testRes.data.length,
        });

        const activityRes = await api.get("/admin/recent-activity");
        setRecentActivity(activityRes.data);
      } catch (err) {
        console.error(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <>
          {/* SUMMARY */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

            <div className="bg-white rounded-xl shadow p-6 border-l-4 border-blue-600">
              <h2 className="text-gray-500 text-sm font-semibold">Chapters</h2>
              <p className="text-3xl font-bold mt-2">{stats.chapters}</p>
            </div>

            <div className="bg-white rounded-xl shadow p-6 border-l-4 border-green-600">
              <h2 className="text-gray-500 text-sm font-semibold">Topics</h2>
              <p className="text-3xl font-bold mt-2">{stats.topics}</p>
            </div>

            <div className="bg-white rounded-xl shadow p-6 border-l-4 border-yellow-500">
              <h2 className="text-gray-500 text-sm font-semibold">Questions</h2>
              <p className="text-3xl font-bold mt-2">{stats.questions}</p>
            </div>

            <div className="bg-white rounded-xl shadow p-6 border-l-4 border-red-600">
              <h2 className="text-gray-500 text-sm font-semibold">Tests Created</h2>
              <p className="text-3xl font-bold mt-2">{stats.tests}</p>
            </div>

          </div>

          {/* QUICK ACTIONS */}
          <h2 className="text-xl font-semibold mb-3">Quick Actions</h2>
          <div className="flex flex-wrap gap-4 mb-10">
            <button className="px-5 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
              + Create Chapter
            </button>
            <button className="px-5 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700">
              + Create Topic
            </button>
            <button className="px-5 py-3 bg-yellow-600 text-white rounded-lg shadow hover:bg-yellow-700">
              + Add Questions
            </button>
            <button className="px-5 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700">
              + Create Test
            </button>
          </div>

          {/* RECENT ACTIVITY */}
          <h2 className="text-xl font-semibold mb-3">Recent Activity</h2>
          <div className="bg-white rounded-xl shadow p-6">
            {recentActivity.length === 0 ? (
              <p className="text-gray-500">No recent activity.</p>
            ) : (
              <ul className="space-y-4">
                {recentActivity.map((item, index) => (
                  <li key={index} className="border-b pb-3">
                    <p className="font-medium">{item.action}</p>
                    <p className="text-gray-500 text-sm">{item.timestamp}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </>
  );
}