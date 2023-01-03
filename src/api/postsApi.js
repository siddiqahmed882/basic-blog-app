import axios from 'axios';

const postsApi = axios.create({
  baseURL: "http://localhost:3500/posts",
});

const fetchAllPosts = async () => {
  try {
    const response = await postsApi.get('/');
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, data: error.message };
  }
};

const fetchPostById = async (id) => {
  try {
    const response = await postsApi.get(`/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, data: error.message };
  }
};

const fetchPostByUserId = async (userId) => {
  try {
    const response = await postsApi.get(`/?userId=${userId}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, data: error.message };
  }
};

const createPost = async (data) => {
  try {
    const response = await postsApi.post('/', data, {
      headers: {
        "Content-Type": "Application/json"
      }
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, data: error.message };
  }
};

const deletePost = async (id) => {
  try {
    const response = await postsApi.delete(`/${id}`);
    return { success: true };
  } catch (error) {
    return { success: false, data: error.message };
  }
};


export default {
  fetchAllPosts,
  fetchPostByUserId,
  deletePost,
  createPost
};