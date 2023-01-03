import axios from 'axios';

const usersApi = axios.create({
  baseURL: "http://localhost:3500/users",
});

const fetchAllUsers = async () => {
  try {
    const response = await usersApi.get('/');
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, data: error.message };
  }
};

const fetchUserById = async (id) => {
  try {
    const response = await usersApi.get(`/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, data: error.message };
  }
};

const createUser = async (data) => {
  try {
    const response = await usersApi.post('/', data, {
      headers: {
        "Content-Type": "Application/json"
      }
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, data: error.message };
  }
};

const deleteUser = async (id) => {
  try {
    const response = await usersApi.delete(`/${id}?_embed=posts&_embed=comments&_embed=reactions`);
    return { success: true };
  } catch (error) {
    return { success: false, data: error.message };
  }
};


export default {
  fetchAllUsers,
  fetchUserById,
  deleteUser,
  createUser
};