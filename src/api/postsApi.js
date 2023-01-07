import axios from 'axios';

import helperFunctions from '../lib/helperFunctions';

const postsApi = axios.create({
  baseURL: "http://localhost:3500/posts",
});

const fetchAllPosts = async () => {
  try {
    const response = await postsApi.get('/?_sort=createdAt&_order=desc&_embed=comments&_embed=reactions');
    return { success: true, data: helperFunctions.formtalAllPostsResponse(response.data) };
  } catch (error) {
    return { success: false, data: error.message };
  }
};

const fetchPostById = async (id) => {
  try {
    const response = await postsApi.get(`/${id}?_embed=reactions&_embed=comments`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, data: error.message };
  }
};

const fetchPostByUserId = async (userId) => {
  try {
    const response = await postsApi.get(`/?userId=${userId}&embed=comments&_embed=reactions`);
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

const editPost = async (id, data) => {
  console.log(data);
  try {
    const response = await postsApi.put(`/${id}`, data, {
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
    const response = await postsApi.delete(`/${id}?_embed=reactions&_embed=comments`);
    return { success: true };
  } catch (error) {
    return { success: false, data: error.message };
  }
};


export default {
  fetchAllPosts,
  fetchPostByUserId,
  fetchPostById,
  editPost,
  deletePost,
  createPost
};