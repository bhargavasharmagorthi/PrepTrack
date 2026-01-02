import axios from "axios";

const API_URL = "/api/topics";

// -------------------- GET ALL TOPICS --------------------
export const getTopics = async (token) => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
    params: { t: new Date().getTime() }, // cache-buster
  });
  return res.data.topics || res.data;
};

// -------------------- CREATE NEW TOPIC --------------------
export const createTopic = async (topicData, token) => {
  const res = await axios.post(`${API_URL}/create`, topicData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// -------------------- UPDATE TOPIC --------------------
export const updateTopic = async (topicId, topicData, token) => {
  const res = await axios.put(`${API_URL}/${topicId}`, topicData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// -------------------- DELETE TOPIC --------------------
export const deleteTopic = async (topicId, token) => {
  const res = await axios.delete(`${API_URL}/${topicId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};