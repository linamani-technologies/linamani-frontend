import axios from "axios";

const BASE_URL = "https://linamani-backend.onrender.com";
// const BASE_URL = "https://linamani-backend.vercel.app";
export const API_USERS = axios.create({
  baseURL: `${BASE_URL}/api/v1/users`,
});

export const API_FORMS = axios.create({
  baseURL: `${BASE_URL}/api/v1/forms`,
});

export const API_TRANSLATE = axios.create({
  baseURL: `${BASE_URL}/api/v1/translate`,
});
