import axios from 'axios';


const commentsApi = axios.create({
  baseURL: "http://localhost:3500/comments",
});

const create = async (data) => {
  try {
    const response = await commentsApi.post('/', data, {
      headers: {
        "Content-Type": "Application/json"
      }
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, data: error.message };
  }
};

const destroy = async (id) => {
  try {
    const response = await commentsApi.delete(`/${id}`);
    return { success: true };
  } catch (error) {
    return { success: false, data: error.message };
  }
};

export default {
  create,
  destroy
};