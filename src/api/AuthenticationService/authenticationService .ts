import api from "../apiClientConfig";

// Authenticates a user by username
export const authenticateUser = async (username: string) => {
  try {
    const { data } = await api.get("/auth", {
      params: { user: username },
    });
    return data;
  } catch (err) {
    console.error("Authorization failed:", err);
    throw err;
  }
};