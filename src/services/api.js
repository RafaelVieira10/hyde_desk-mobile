import { API_URL } from "@env";
import axios from "axios";

export const api = axios.create({
  baseURL: API_URL,
});
