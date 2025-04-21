import { useEffect } from "react";
import { authenticateUser } from "../api/AuthenticationService/authenticationService ";


const useAuth = (username: string | null): void => {
  useEffect(() => {
    if (!username) return;

    const fetchAuthToken = async () => {
      try {
        const res = await authenticateUser(username);
        console.log("Server response:", res);

        const headers = res.headers || {};
        const authToken = headers["Authorization"] || headers["authorization"];

        if (authToken) {
          localStorage.setItem("authToken", authToken);
          console.log("Stored auth token:", authToken);
        } else {
          console.warn("Authorization token not found in headers.");
        }
      } catch (err) {
        console.error("Authorization error:", err);
      }
    };

    fetchAuthToken();
  }, [username]);
};

export default useAuth;
