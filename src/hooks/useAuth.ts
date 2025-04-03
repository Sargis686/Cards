import { useEffect } from "react";
import { authenticateUser } from "../api/services/authService";

const useAuth = (username: string | null) => {
  useEffect(() => {
    const authorizeUser = async () => {
      if (username) {
        try {
          const response = await authenticateUser(username);
          console.log("Ответ сервера:", response);

          if (response.headers) {
            const token =
              response.headers["Authorization"] ||
              response.headers["authorization"];
            if (token) {
              localStorage.setItem("authToken", token);
              console.log("Токен авторизации:", token);
            } else {
              console.error("Токен не найден в заголовках ответа.");
            }
          } else {
            console.error("Заголовки ответа отсутствуют.");
          }
        } catch (error) {
          console.error("Ошибка при авторизации:", error);
        }
      }
    };

    authorizeUser();
  }, [username]);
};

export default useAuth;
