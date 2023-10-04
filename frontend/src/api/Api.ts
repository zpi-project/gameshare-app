import axios from "axios";
import { VITE_API_URL } from "@constants/env";

const Api = axios.create({
  baseURL: VITE_API_URL,
  timeout: 10000,
});

export default Api;
