import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

export async function register(username, password, email) {
  try {
    const response = await api.post("/register", { username, email, password });
  } catch (err) {
    throw err;
  }
}

export async function login(username, password) {
  try {
    const response = await api.post("/login", { username, password });
  } catch (err) {
    throw err;
  }
}

export async function getme(username, password) {
  try {
    const response = await api.post("/get-me", { username, password });
  } catch (err) {
    throw err;
  }
}
