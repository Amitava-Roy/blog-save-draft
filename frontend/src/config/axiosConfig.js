import axios from "axios";

const baseURL = "https://blog-save-draft-production.up.railway.app";

const api = axios.create({
  baseURL,
});

export default api;
export { baseURL };
