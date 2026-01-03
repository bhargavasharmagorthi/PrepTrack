import React, { useState, useEffect, useCallback } from "react";
import { FiPlus, FiEdit, FiTrash2, FiRefreshCw } from "react-icons/fi";
import {
  getChapters,
  deleteChapter,
  createChapter,
  updateChapter,
} from "../../services/chapter.service";

export default function Chapters({ user }) {
  const [chapters, setChapters] = useState([]);
  const [filteredChapters, setFilteredChapters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingChapter, setEditingChapter] = useState(null);

  // Filter state
  const [searchFilters, setSearchFilters] = useState({
    chapterName: "",
    subject: "",
    difficulty: "",
    createdBy: "",
  });

  // Form state
  const [chapterData, setChapterData] = useState({
    subject: "MAT",
    chapterNumber: "",
    chapterName: "",
    description: "",
    prerequisites: "",
    jeeMainMin: "",
    jeeMainMax: "",
    jeeAdvancedMin: "",
    jeeAdvancedMax: "",
    difficulty: "Easy to Moderate",
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // ---------------- FETCH CHAPTERS ----------------
  const fetchChapters = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getChapters(localStorage.getItem("token"));
      console.log("Fetched chapters:", data);
      const sorted = Array.isArray(data)
        ? data.sort((a, b) => Number(a.chapterNumber) - Number(b.chapterNumber))
        : [];
      setChapters(sorted);
    } catch (err) {
      console.error(err);
      setChapters([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChapters();
  }, [fetchChapters]);

  // ---------------- FILTERING ----------------
  useEffect(() => {
    let filtered = [...chapters];
    Object.keys(searchFilters).forEach((field) => {
      if (!searchFilters[field]) return;
      filtered = filtered.filter((c) =>
        c[field]?.toLowerCase().includes(searchFilters[field].toLowerCase())
      );
    });
    setFilteredChapters(filtered);
  }, [searchFilters, chapters]);

  const handleSearchChange = (e, field) => {
    setSearchFilters({ ...searchFilters, [field]: e.target.value });
  };

  // ---------------- PAGINATION (DERIVED DATA) ----------------
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const paginatedChapters = filteredChapters.slice(
    indexOfFirstRow,
    indexOfLastRow
  );

  const totalPages = Math.ceil(filteredChapters.length / rowsPerPage);

  // ---------------- DELETE ----------------
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this chapter?")) return;

    try {
      await deleteChapter(id, localStorage.getItem("token"));
      setChapters((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.warn(
        "Delete failed (maybe already deleted). Removing row from UI anyway.",
        err.response?.data || err.message
      );
      setChapters((prev) => prev.filter((c) => c._id !== id));
    }
  };

  // ---------------- EDIT / CREATE ----------------
  const openEditModal = (chapter = null) => {
    if (chapter) {
      setEditingChapter(chapter);
      setChapterData({
        subject: chapter.subject || "MAT",
        chapterNumber: chapter.chapterNumber || "",
        chapterName: chapter.chapterName || "",
        description: chapter.description || "",
        prerequisites: chapter.prerequisites?.join(", ") || "",
        jeeMainMin: chapter.jeeMainWeightage?.min || "",
        jeeMainMax: chapter.jeeMainWeightage?.max || "",
        jeeAdvancedMin: chapter.jeeAdvancedWeightage?.min || "",
        jeeAdvancedMax: chapter.jeeAdvancedWeightage?.max || "",
        difficulty: chapter.difficulty || "Easy to Moderate",
      });
    } else {
      setEditingChapter(null);
      setChapterData({
        subject: "MAT",
        chapterNumber: "",
        chapterName: "",
        description: "",
        prerequisites: "",
        jeeMainMin: "",
        jeeMainMax: "",
        jeeAdvancedMin: "",
        jeeAdvancedMax: "",
        difficulty: "Easy to Moderate",
      });
    }
    setShowModal(true);
  };

  const handleChange = (e, field) => {
    setChapterData({ ...chapterData, [field]: e.target.value });
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");

    const payload = {
      ...chapterData,
      prerequisites: chapterData.prerequisites
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean),
      jeeMainWeightage: {
        min: chapterData.jeeMainMin,
        max: chapterData.jeeMainMax,
      },
      jeeAdvancedWeightage: {
        min: chapterData.jeeAdvancedMin,
        max: chapterData.jeeAdvancedMax,
      },
    };

    try {
      if (editingChapter) {
        // UPDATE
        const updated = await updateChapter(editingChapter._id, payload, token);
        setChapters((prev) =>
          prev.map((c) => (c._id === updated._id ? updated : c))
        );
      } else {
        // CREATE
        const created = await createChapter(payload, token);
        setChapters((prev) => [...prev, created]);
      }

      setShowModal(false);
      setEditingChapter(null);
    } catch (err) {
      console.error(err);
      setError("Failed to save chapter");
    }
  };

  // ---------------- UI ----------------
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Chapters Management</h2>
        <div className="flex gap-2">
          <button
            onClick={fetchChapters}
            className="flex items-center gap-2 border px-4 py-2 rounded bg-green-100 text-green-700 hover:bg-green-200"
          >
            <FiRefreshCw className={loading ? "animate-spin" : ""} />
            Reload
          </button>
          <button
            onClick={() => openEditModal(null)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded"
          >
            <FiPlus /> Create Chapter
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded border">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="border px-3 py-2">#</th>
              <th className="border px-3 py-2">
                Chapter
                <input
                  className="w-full mt-1 border px-1 text-sm"
                  placeholder="Search chapter..."
                  value={searchFilters.chapterName}
                  onChange={(e) => handleSearchChange(e, "chapterName")}
                />
              </th>
              <th className="border px-3 py-2">
                Subject
                <select
                  className="w-full mt-1 border px-1 text-sm"
                  value={searchFilters.subject}
                  onChange={(e) => handleSearchChange(e, "subject")}
                >
                  <option value="">All Subjects</option>
                  <option value="MAT">MAT</option>
                  <option value="PHY">PHY</option>
                  <option value="CHE">CHE</option>
                </select>
              </th>
              <th className="border px-3 py-2">
                Difficulty
                <select
                  className="w-full mt-1 border px-1 text-sm"
                  value={searchFilters.difficulty}
                  onChange={(e) => handleSearchChange(e, "difficulty")}
                >
                  <option value="">All Difficulties</option>
                  <option value="Easy">Easy</option>
                  <option value="Easy to Moderate">Easy to Moderate</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Moderate to Tough">Moderate to Tough</option>
                  <option value="Tough">Tough</option>
                </select>
              </th>
              <th className="border px-3 py-2">Prerequisites</th>
              <th className="border px-3 py-2 text-center">
                JEE Main
                <div className="text-xs text-gray-500">Weightage (%)</div>
              </th>
              <th className="border px-3 py-2 text-center">
                JEE Adv
                <div className="text-xs text-gray-500">Weightage (%)</div>
              </th>
              <th className="border px-3 py-2">
                Created By
                <input
                  className="w-full mt-1 border px-1 text-sm"
                  placeholder="Creator name"
                  value={searchFilters.createdBy}
                  onChange={(e) => handleSearchChange(e, "createdBy")}
                />
              </th>
              <th className="border px-3 py-2">Created At</th>
              <th className="border px-3 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedChapters.length > 0 ? (
              paginatedChapters.map((c) => (
                <tr key={c._id} className="border-b hover:bg-gray-50">
                  <td className="border px-3 py-2">{c.chapterNumber}</td>
                  <td className="border px-3 py-2 font-semibold">{c.chapterName}</td>
                  <td className="border px-3 py-2">{c.subject}</td>
                  <td className="border px-3 py-2">{c.difficulty}</td>
                  <td className="border px-3 py-2">{c.prerequisites?.join(", ") || "-"}</td>
                  <td className="border px-3 py-2 text-center">
                    {c.jeeMainWeightage?.min}–{c.jeeMainWeightage?.max}
                  </td>
                  <td className="border px-3 py-2 text-center">
                    {c.jeeAdvancedWeightage?.min}–{c.jeeAdvancedWeightage?.max}
                  </td>
                  <td className="border px-3 py-2">{c.createdBy || "-"}</td>
                  <td className="border px-3 py-2">{new Date(c.createdAt).toLocaleString()}</td>
                  <td className="border px-3 py-2">
                    <div className="flex justify-center items-center gap-2">
                      <FiEdit
                        className="cursor-pointer text-blue-600"
                        onClick={() => openEditModal(c)}
                      />
                      <FiTrash2
                        className="cursor-pointer text-red-600"
                        onClick={() => handleDelete(c._id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center py-6 text-gray-500">
                  {loading ? "Loading chapters..." : "No chapters found"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center p-4 border-t">
        <div className="flex items-center gap-2">
          <span className="text-sm">Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border rounded px-2 py-1"
          >
            <option value={3}>3</option>
            <option value={6}>6</option>
            <option value={9}>9</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm">
            Page {currentPage} of {totalPages || 1}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* ---------------- CARD VIEW ---------------- */}
<div className="space-y-8 mt-6">
  {["MAT", "PHY", "CHE"].map((subject) => {
    const subjectChapters = filteredChapters.filter((c) => c.subject === subject);
    if (!subjectChapters.length) return null;

    return (
      <div key={subject}>
        {/* Subject Section Header */}
        <h2 className="text-xl font-bold mb-4">
          {subject === "MAT" ? "Mathematics" : subject === "PHY" ? "Physics" : "Chemistry"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {subjectChapters.map((c) => {
            const SUBJECT_BG = {
              MAT: "bg-blue-900 text-white",
              PHY: "bg-emerald-800 text-white",
              CHE: "bg-orange-800 text-white",
            };

            return (
              <div key={c._id} className="bg-white rounded-lg shadow-lg border overflow-hidden h-64 flex flex-col">
                
                {/* Header: Chapter Number + Name (Sticky) */}
                <div
                  className={`p-4 font-bold text-lg border-b ${SUBJECT_BG[c.subject] || "bg-gray-100"}`}
                >
                  {c.chapterNumber}. {c.chapterName}
                </div>

                {/* Scrollable Content */}
                <div className="p-4 flex-1 overflow-auto text-sm space-y-2">
                  <p><strong>Subject:</strong> {c.subject}</p>
                  <p><strong>Difficulty:</strong> {c.difficulty}</p>
                  <p><strong>Description:</strong> {c.description || "-"}</p>
                  <p><strong>JEE Main:</strong> {c.jeeMainWeightage?.min}–{c.jeeMainWeightage?.max}%</p>
                  <p><strong>JEE Adv:</strong> {c.jeeAdvancedWeightage?.min}–{c.jeeAdvancedWeightage?.max}%</p>
                  <p><strong>Prerequisites:</strong> {c.prerequisites?.join(", ") || "-"}</p>
                  <p className="text-xs mt-2"><strong>Created:</strong> {new Date(c.createdAt).toLocaleDateString()}</p>
                </div>
                
              </div>
            );
          })}
        </div>
      </div>
    );
  })}
</div>


      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-2/5 space-y-4">
            <h3 className="text-xl font-bold">{editingChapter ? "Edit Chapter" : "Create Chapter"}</h3>
            {/* Form grid same as original */}
            <div className="grid grid-cols-2 gap-4">
              {/* ...existing form fields unchanged... */}
              <div>
                <label>Chapter Number</label>
                <input
                  className="w-full p-2 border rounded"
                  value={chapterData.chapterNumber}
                  onChange={(e) => handleChange(e, "chapterNumber")}
                />
              </div>
              <div>
                <label>Chapter Name</label>
                <input
                  className="w-full p-2 border rounded"
                  value={chapterData.chapterName}
                  onChange={(e) => handleChange(e, "chapterName")}
                />
              </div>
              <div>
                <label>Subject</label>
                <select
                  className="w-full p-2 border rounded"
                  value={chapterData.subject}
                  onChange={(e) => handleChange(e, "subject")}
                >
                  <option value="MAT">MAT</option>
                  <option value="PHY">PHY</option>
                  <option value="CHE">CHE</option>
                </select>
              </div>
              <div>
                <label>Difficulty</label>
                <select
                  className="w-full p-2 border rounded"
                  value={chapterData.difficulty}
                  onChange={(e) => handleChange(e, "difficulty")}
                >
                  <option value="Easy">Easy</option>
                  <option value="Easy to Moderate">Easy to Moderate</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Moderate to Tough">Moderate to Tough</option>
                  <option value="Tough">Tough</option>
                </select>
              </div>

              <div>
                <label>JEE Main Min %</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  value={chapterData.jeeMainMin}
                  onChange={(e) => handleChange(e, "jeeMainMin")}
                />
              </div>
              <div>
                <label>JEE Main Max %</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  value={chapterData.jeeMainMax}
                  onChange={(e) => handleChange(e, "jeeMainMax")}
                />
              </div>
              <div>
                <label>JEE Adv Min %</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  value={chapterData.jeeAdvancedMin}
                  onChange={(e) => handleChange(e, "jeeAdvancedMin")}
                />
              </div>
              <div>
                <label>JEE Adv Max %</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  value={chapterData.jeeAdvancedMax}
                  onChange={(e) => handleChange(e, "jeeAdvancedMax")}
                />
              </div>

              <div className="col-span-2">
                <label>Description</label>
                <textarea
                  className="w-full p-2 border rounded"
                  value={chapterData.description}
                  onChange={(e) => handleChange(e, "description")}
                />
              </div>

              <div className="col-span-2">
                <label>Prerequisites (comma separated)</label>
                <input
                  className="w-full p-2 border rounded"
                  value={chapterData.prerequisites}
                  onChange={(e) => handleChange(e, "prerequisites")}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 border rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={handleSave}
              >
                {editingChapter ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}