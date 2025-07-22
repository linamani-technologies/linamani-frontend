import axios from "axios";

export const API_USERS = axios.create({
  baseURL: "http://localhost:8000/api/v1/users",
});

export const API_FORMS = axios.create({
  baseURL: "http://localhost:8000/api/v1/forms",
});

export const API_TRANSLATE = axios.create({
  baseURL: "http://localhost:8000/api/v1/translate",
});