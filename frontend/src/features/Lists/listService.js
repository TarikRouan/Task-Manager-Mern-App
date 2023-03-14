import axios from "axios";

const API_URL = "/lists/";

const createList = async (list, token) => {
  const res = await axios.post(API_URL, list, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};

const getLists = async (token) => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};
const deleteList = async (id, token) => {
  const res = await axios.delete(API_URL + id, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};

const listService = {
  createList,
  getLists,
  deleteList,
};

export default listService;
