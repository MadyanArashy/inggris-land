import axios from "axios";

// Ensure cookies (sessions) are sent
axios.defaults.withCredentials = true;

export async function fetchUserSession() {
  try {
    const response = await axios.get("http://localhost:5000/auth/me");
    return response.data.user; // Logged in user
  } catch (error) {
    return null; // Not logged in
  }
}
