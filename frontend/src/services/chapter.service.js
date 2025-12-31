import axios from "axios";

const API_URL = "/api/chapters";

// -------------------- GET ALL CHAPTERS --------------------
export const getChapters = async (token) => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
    params: { t: new Date().getTime() }, // cache-buster
  });
  return res.data.chapters || res.data;
};

// -------------------- CREATE NEW CHAPTER --------------------
export const createChapter = async (chapterData, token) => {
  const res = await axios.post(`${API_URL}/create`, chapterData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// -------------------- UPDATE CHAPTER --------------------
export const updateChapter = async (chapterId, chapterData, token) => {
  const res = await axios.put(`${API_URL}/${chapterId}`, chapterData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// -------------------- DELETE CHAPTER --------------------
export const deleteChapter = async (chapterId, token) => {
  const res = await axios.delete(`${API_URL}/${chapterId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};