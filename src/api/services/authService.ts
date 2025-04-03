import axiosInstance from "..//axiosConfig";

export const authenticateUser = async (username: string) => {
  try {
    const response = await axiosInstance.get(`/auth`, {
      params: { user: username },
    });
    return response;
  } catch (error) {
    console.error("Ошибка авторизации:", error);
    throw error;
  }
};
