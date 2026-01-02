import React, { useState, useEffect, useCallback } from "react";
import { FiPlus, FiEdit, FiTrash2, FiRefreshCw } from "react-icons/fi";
import { v4 as uuidv4 } from "uuid";

import {
  getTopics,
  createTopic,
  updateTopic,
  deleteTopic,
} from "../../services/topic.service";

import { getChapters } from "../../services/chapter.service";

export default function Topics({ user }) {
  // ---------------- STATES ----------------
  const [topics, setTopics] = useState([]);
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingTopic, setEditingTopic] = useState(null);

  // ---------------- FILTER STATE ----------------
  const [searchFilters, setSearchFilters] = useState({
    topicName: "",
    subject: "",
    chapterId: "",
    difficulty: "",
    createdBy: "",
  });

  // ---------------- PAGINATION STATE ----------------
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // ---------------- FORM STATE ----------------
  const defaultTopicData = {
    subject: "MAT",
    chapterId: "",
    topicNumber: "",
    topicName: "",
    description: "",
    difficulty: "Easy to Moderate",
    subtopics: [{ _id: uuidv4(), title: "" }],
  };

  const [topicData, setTopicData] = useState(defaultTopicData);

  // ---------------- FETCH DATA ----------------
  const fetchChapters = useCallback(async () => {
    try {
      const data = await getChapters(localStorage.getItem("token"));
      setChapters(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch chapters", err);
    }
  }, []);

  const fetchTopics = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getTopics(localStorage.getItem("token"));
      setTopics(
        Array.isArray(data)
          ? data.map((t) => ({ ...t, subtopics: t.subtopics || [] }))
          : []
      );
    } catch (err) {
      console.error(err);
      setTopics([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChapters();
    fetchTopics();
  }, [fetchChapters, fetchTopics]);

  // ---------------- FILTERING ----------------
  useEffect(() => {
    let filtered = [...topics];

    if (searchFilters.topicName) {
      filtered = filtered.filter((t) =>
        t.topicName?.toLowerCase().includes(searchFilters.topicName.toLowerCase())
      );
    }
    if (searchFilters.subject) {
      filtered = filtered.filter((t) => t.subject === searchFilters.subject);
    }
    if (searchFilters.chapterId) {
      filtered = filtered.filter((t) => t.chapterId === searchFilters.chapterId);
    }
    if (searchFilters.difficulty) {
      filtered = filtered.filter((t) => t.difficulty === searchFilters.difficulty);
    }
    if (searchFilters.createdBy) {
      filtered = filtered.filter((t) =>
        t.createdBy?.toLowerCase().includes(searchFilters.createdBy.toLowerCase())
      );
    }

    setFilteredTopics(filtered);
    setCurrentPage(1); // reset page on filter
  }, [topics, searchFilters]);

  const handleSearchChange = (e, field) => {
    setSearchFilters({ ...searchFilters, [field]: e.target.value });
  };

  // ---------------- MODAL HANDLERS ----------------
  const openModal = async (topic = null) => {
    if (chapters.length === 0) await fetchChapters();

    if (topic) {
      setEditingTopic(topic);
      setTopicData({
        subject: topic.subject,
        chapterId: topic.chapterId,
        topicNumber: topic.topicNumber,
        topicName: topic.topicName,
        description: topic.description || "",
        difficulty: topic.difficulty || "Easy to Moderate",
        subtopics: topic.subtopics?.length ? topic.subtopics : [{ _id: uuidv4(), title: "" }],
      });
    } else {
      setEditingTopic(null);
      setTopicData(defaultTopicData);
    }
    setShowModal(true);
    setError("");
  };

  const handleChange = (e, field) => {
    setTopicData({ ...topicData, [field]: e.target.value });
  };

  // ---------------- SUBTOPIC HANDLERS ----------------
  const addSubtopic = () => {
    setTopicData((prev) => ({
      ...prev,
      subtopics: [...prev.subtopics, { _id: uuidv4(), title: "" }],
    }));
  };

  const updateSubtopic = (id, value) => {
    setTopicData((prev) => ({
      ...prev,
      subtopics: prev.subtopics.map((s) =>
        s._id === id ? { ...s, title: value } : s
      ),
    }));
  };

  const removeSubtopic = (id) => {
    setTopicData((prev) => ({
      ...prev,
      subtopics: prev.subtopics.filter((s) => s._id !== id),
    }));
  };

  // ---------------- SAVE ----------------
  const handleSave = async () => {
    try {
      setError("");
      if (!topicData.subject) return setError("Subject is required");
      if (!topicData.chapterId) return setError("Chapter is required");
      if (!topicData.topicName || !topicData.topicName.trim())
        return setError("Topic Name is required");

      const payload = {
        subject: topicData.subject,
        chapter: topicData.chapterId,
        topicNumber: topicData.topicNumber,
        topicName: topicData.topicName.trim(),
        description: topicData.description ? topicData.description.trim() : "",
        difficulty: topicData.difficulty || "Easy to Moderate",
        subtopics: topicData.subtopics
          .filter((s) => s.title && s.title.trim())
          .map((s) => ({ _id: s._id || uuidv4(), title: s.title.trim() })),
      };

      const token = localStorage.getItem("token");
      let response;

      if (editingTopic) {
        response = await updateTopic(editingTopic._id, payload, token);
        setTopics((prev) =>
          prev.map((t) => (t._id === response._id ? response : t))
        );
      } else {
        response = await createTopic(payload, token);
        setTopics((prev) => [...prev, response]);
      }

      setShowModal(false);
      setEditingTopic(null);
      setTopicData(defaultTopicData);
    } catch (err) {
      console.error("Failed to save topic:", err);
      const msg =
        err?.response?.data?.message || err?.message || "Failed to save topic";
      setError(msg);
    }
  };

  // ---------------- DELETE ----------------
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this topic?")) return;

    try {
      await deleteTopic(id, localStorage.getItem("token"));
      setTopics((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.warn("Delete failed, removing locally");
      setTopics((prev) => prev.filter((t) => t._id !== id));
    }
  };

  // ---------------- PAGINATION ----------------
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const paginatedTopics = filteredTopics.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredTopics.length / rowsPerPage);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Topics Management</h2>
        <div className="flex gap-2">
          <button
            onClick={fetchTopics}
            className="flex items-center gap-2 border px-4 py-2 rounded bg-green-100 text-green-700"
          >
            <FiRefreshCw className={loading ? "animate-spin" : ""} /> Reload
          </button>
          <button
            onClick={() => openModal(null)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded"
          >
            <FiPlus /> Create Topic
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded border">
        <table className="min-w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="border px-3 py-2">#</th>
              <th className="border px-3 py-2">Subject</th>
              <th className="border px-3 py-2">Chapter</th>
              <th className="border px-3 py-2">Topic</th>
              <th className="border px-3 py-2">Difficulty</th>
              <th className="border px-3 py-2">Subtopics</th>
              <th className="border px-3 py-2">Created By</th>
              <th className="border px-3 py-2">Created At</th>
              <th className="border px-3 py-2 text-center">Actions</th>
            </tr>

            {/* Filters */}
            <tr className="bg-gray-50">
              <th />
              <th>
                <select
                  className="w-full border p-1"
                  value={searchFilters.subject}
                  onChange={(e) => handleSearchChange(e, "subject")}
                >
                  <option value="">All</option>
                  <option value="MAT">MAT</option>
                  <option value="PHY">PHY</option>
                  <option value="CHE">CHE</option>
                </select>
              </th>
              <th>
                <select
                  className="w-full border p-1"
                  value={searchFilters.chapterId}
                  onChange={(e) => handleSearchChange(e, "chapterId")}
                >
                  <option value="">All</option>
                  {chapters
                    .filter((c) => !searchFilters.subject || c.subject === searchFilters.subject)
                    .map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.chapterName}
                      </option>
                    ))}
                </select>
              </th>
              <th>
                <input
                  type="text"
                  className="w-full border p-1"
                  placeholder="Search Topic"
                  value={searchFilters.topicName}
                  onChange={(e) => handleSearchChange(e, "topicName")}
                />
              </th>
              <th>
                <select
                  className="w-full border p-1"
                  value={searchFilters.difficulty}
                  onChange={(e) => handleSearchChange(e, "difficulty")}
                >
                  <option value="">All</option>
                  <option>Easy</option>
                  <option>Easy to Moderate</option>
                  <option>Moderate</option>
                  <option>Moderate to Tough</option>
                  <option>Tough</option>
                </select>
              </th>
              <th />
              <th>
                <input
                  type="text"
                  className="w-full border p-1"
                  placeholder="Created By"
                  value={searchFilters.createdBy}
                  onChange={(e) => handleSearchChange(e, "createdBy")}
                />
              </th>
              <th />
              <th />
            </tr>
          </thead>

          <tbody>
            {paginatedTopics.length ? (
              paginatedTopics.map((t, idx) => (
                <tr key={t._id} className="hover:bg-gray-50">
                  <td className="border px-3 py-2">{t.topicNumber || idx + 1}</td>
                  <td className="border px-3 py-2">{t.subject}</td>
                  <td className="border px-3 py-2">{t.chapterName || "-"}</td>
                  <td className="border px-3 py-2 font-semibold">{t.topicName}</td>
                  <td className="border px-3 py-2">{t.difficulty}</td>
                  <td className="border px-3 py-2">
                    {t.subtopics && t.subtopics.length
                      ? t.subtopics.map((s) => s.title).join(", ")
                      : "-"}
                  </td>
                  <td className="border px-3 py-2">{t.createdBy || "-"}</td>
                  <td className="border px-3 py-2">
                    {t.createdAt ? new Date(t.createdAt).toLocaleString() : "-"}
                  </td>
                  <td className="border px-3 py-2 text-center flex justify-center gap-2">
                    <FiEdit
                      className="cursor-pointer text-blue-600"
                      onClick={() => openModal(t)}
                    />
                    <FiTrash2
                      className="cursor-pointer text-red-600"
                      onClick={() => handleDelete(t._id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-6 text-gray-500">
                  {loading ? "Loading..." : "No topics found"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <div>
          Rows per page:{" "}
          <select
            className="border p-1"
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
        </div>

        <div className="flex gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="border px-3 py-1 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="border px-3 py-1 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-2/5 space-y-4 max-h-[90vh] overflow-y-auto shadow-lg">
            <h3 className="text-xl font-bold">{editingTopic ? "Edit Topic" : "Create Topic"}</h3>

            <div className="grid grid-cols-2 gap-4">
              {/* Subject */}
              <div>
                <label>Subject</label>
                <select
                  className="w-full border p-2"
                  value={topicData.subject}
                  onChange={(e) => handleChange(e, "subject")}
                >
                  <option value="MAT">MAT</option>
                  <option value="PHY">PHY</option>
                  <option value="CHE">CHE</option>
                </select>
              </div>

              {/* Chapter */}
              <div>
                <label>Chapter</label>
                <select
                  className="w-full border p-2"
                  value={topicData.chapterId}
                  onChange={(e) => handleChange(e, "chapterId")}
                >
                  <option value="">Select Chapter</option>
                  {chapters
                    .filter((c) => c.subject === topicData.subject)
                    .map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.chapterNumber}. {c.chapterName}
                      </option>
                    ))}
                </select>
              </div>

              {/* Topic Number */}
              <div>
                <label>Topic Number</label>
                <input
                  className="w-full border p-2"
                  value={topicData.topicNumber}
                  onChange={(e) => handleChange(e, "topicNumber")}
                />
              </div>

              {/* Topic Name */}
              <div>
                <label>Topic Name</label>
                <input
                  className="w-full border p-2"
                  value={topicData.topicName}
                  onChange={(e) => handleChange(e, "topicName")}
                />
              </div>

              {/* Description */}
              <div className="col-span-2">
                <label>Description</label>
                <textarea
                  className="w-full border p-2"
                  value={topicData.description}
                  onChange={(e) => handleChange(e, "description")}
                />
              </div>

              {/* Difficulty */}
              <div>
                <label>Difficulty</label>
                <select
                  className="w-full border p-2"
                  value={topicData.difficulty}
                  onChange={(e) => handleChange(e, "difficulty")}
                >
                  <option>Easy</option>
                  <option>Easy to Moderate</option>
                  <option>Moderate</option>
                  <option>Moderate to Tough</option>
                  <option>Tough</option>
                </select>
              </div>

              {/* Subtopics */}
              <div className="col-span-2">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold">Subtopics</h4>
                  <button
                    onClick={addSubtopic}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    + Add Subtopic
                  </button>
                </div>
                {topicData.subtopics.map((s, idx) => (
                  <div key={s._id} className="flex gap-2 mb-1">
                    <input
                      className="flex-1 border p-2"
                      placeholder={`Subtopic ${idx + 1}`}
                      value={s.title}
                      onChange={(e) => updateSubtopic(s._id, e.target.value)}
                    />
                    <FiTrash2
                      className="cursor-pointer text-red-600 mt-2"
                      onClick={() => removeSubtopic(s._id)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Modal buttons */}
            <div className="flex justify-end gap-2 pt-4">
              <button
                onClick={() => setShowModal(false)}
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                {editingTopic ? "Update" : "Create"}
              </button>
            </div>

            {error && <p className="text-red-600 mt-2">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
}