import axios from "axios";

const API_URL = "https://blog-backend-plum-five.vercel.app/";

// Create an Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to set the JWT token in local storage or session storage
export const setAuthToken = (token) => {
  if (token) {
    // Apply the token to every request if logged in
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    // Remove auth header if not logged in
    delete api.defaults.headers.common["Authorization"];
  }
};

// Add Axios interceptor to attach the JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken"); // Assuming you store the token in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Authentication API calls
export const registerUser = async (userData) => {
  return api.post("/api/user/register", userData);
};

export const loginUser = async (loginData) => {
  return api.post("/api/user/login", loginData);
};

// Blog Posts API calls
export const fetchPosts = async () => {
  return api.get("/api/blog");
};

export const fetchPostsByUser = async (id) => {
  return api.get(`/api/blog/user/${id}`);
};

export const fetchPostById = async (id) => {
  return api.get(`/api/blog/${id}`);
};

export const createPost = async (postData) => {
  return api.post("/api/blog", postData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updatePost = async (id, postData) => {
  console.log(postData, id);
  return api.put(`/api/blog/${id}`, postData);
};

export const deletePost = async (id) => {
  return api.delete(`/api/blog/${id}`);
};
