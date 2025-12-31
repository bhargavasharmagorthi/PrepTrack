import React, { useState, useEffect, useCallback } from "react";
import { FiPlus, FiEdit, FiTrash2, FiRefreshCw } from "react-icons/fi";
import {
  createChapter,
  getChapters,
  updateChapter,
  deleteChapter,
} from "../../services/chapter.service";

export default function Chapters({ user }) {
  const [chapters, setChapters] = useState([]);
  const [filteredChapters, setFilteredChapters] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingChapter, setEditingChapter] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [searchFilters, setSearchFilters] = useState({
    chapterName: "",
    subject: "",
    difficulty: "",
    prerequisites: "",
    jeeMain: "",
    jeeAdv: "",
    createdBy: "",
    createdAt: "",
  });

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

  /* ================= FETCH ================= */
  const fetchChapters = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getChapters(localStorage.getItem("token"));
      console.log("FETCHED CHAPTERS:", data);

      setChapters(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch failed:", err);
      setChapters([]);
    } finally {
      setLoading(false);
    }
  }, []);

  /* ✅ FETCH ON PAGE LOAD */
  useEffect(() => {
    fetchChapters();
  }, [fetchChapters]);

  /* ✅ KEEP FILTERED DATA IN SYNC */
  useEffect(() => {
    setFilteredChapters(chapters);
  }, [chapters]);

  /* ================= FILTERING ================= */
  useEffect(() => {
    let filtered = [...chapters];

    Object.keys(searchFilters).forEach((field) => {
      if (!searchFilters[field]) return;

      filtered = filtered.filter((c) => {
        switch (field) {
          case "chapterName":
          case "subject":
          case "difficulty":
          case "createdBy":
            return c[field]
              ?.toLowerCase()
              .includes(searchFilters[field].toLowerCase());

          case "prerequisites":
            return c.prerequisites
              ?.join(", ")
              .toLowerCase()
              .includes(searchFilters[field].toLowerCase());

          case "jeeMain":
            return `${c.jeeMainWeightage?.min}-${c.jeeMainWeightage?.max}`.includes(
              searchFilters[field]
            );

          case "jeeAdv":
            return `${c.jeeAdvancedWeightage?.min}-${c.jeeAdvancedWeightage?.max}`.includes(
              searchFilters[field]
            );

          case "createdAt":
            return new Date(c.createdAt)
              .toLocaleDateString()
              .includes(searchFilters[field]);

          default:
            return true;
        }
      });
    });

    setFilteredChapters(filtered);
  }, [searchFilters, chapters]);

  const handleSearchChange = (e, field) => {
    setSearchFilters({ ...searchFilters, [field]: e.target.value });
  };

  /* ================= UI ================= */
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center gap-3">
        <h2 className="text-2xl font-bold">Chapters Management</h2>

        <div className="flex gap-2">
          <button
            onClick={fetchChapters}
            className="flex items-center gap-2 border px-4 py-2 rounded hover:bg-gray-100"
          >
            <FiRefreshCw className={loading ? "animate-spin" : ""} />
            Reload
          </button>

          <button
            onClick={() => {
              setShowModal(true);
              setEditingChapter(null);
            }}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded"
          >
            <FiPlus /> Create Chapter
          </button>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="overflow-x-auto bg-white shadow rounded border border-gray-300">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr>
              {[
                { name: "#", field: "chapterNumber" },
                { name: "Chapter", field: "chapterName" },
                { name: "Difficulty", field: "difficulty" },
                { name: "Prerequisites", field: "prerequisites" },
                { name: "JEE Main", field: "jeeMain" },
                { name: "JEE Adv", field: "jeeAdv" },
                { name: "Created By", field: "createdBy" },
                { name: "Created At", field: "createdAt" },
                { name: "Actions", field: "actions" },
              ].map((col) => (
                <th key={col.name} className="px-4 py-2 border">
                  <div className="font-semibold">{col.name}</div>
                  {col.field !== "actions" && (
                    <input
                      type="text"
                      placeholder="Search"
                      className="mt-1 p-1 w-full border rounded text-sm"
                      onChange={(e) => handleSearchChange(e, col.field)}
                    />
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {Array.isArray(filteredChapters) &&
            filteredChapters.length > 0 ? (
              filteredChapters.map((c) => (
                <tr key={c._id} className="border-b hover:bg-gray-50">
                  <td className="border px-3 py-2">{c.chapterNumber}</td>
                  <td className="border px-3 py-2">
                    <div className="font-semibold">{c.chapterName}</div>
                    <div className="text-xs text-gray-500">{c.subject}</div>
                  </td>
                  <td className="border px-3 py-2">{c.difficulty}</td>
                  <td className="border px-3 py-2">
                    {c.prerequisites?.join(", ") || "-"}
                  </td>
                  <td className="border px-3 py-2">
                    {c.jeeMainWeightage?.min}–
                    {c.jeeMainWeightage?.max}%
                  </td>
                  <td className="border px-3 py-2">
                    {c.jeeAdvancedWeightage?.min}–
                    {c.jeeAdvancedWeightage?.max}%
                  </td>
                  <td className="border px-3 py-2">{c.createdBy || "-"}</td>
                  <td className="border px-3 py-2">
                    {new Date(c.createdAt).toLocaleString()}
                  </td>
                  <td className="border px-3 py-2 flex gap-2">
                    <FiEdit
                      className="cursor-pointer text-blue-600"
                    />
                    <FiTrash2
                      className="cursor-pointer text-red-600"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="9"
                  className="text-center py-6 text-gray-500 border"
                >
                  {loading ? "Loading chapters..." : "No chapters found"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {error && <p className="text-red-600">{error}</p>}
      {showModal && null /* modal unchanged */}
    </div>
  );
}