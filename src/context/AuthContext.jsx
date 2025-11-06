// src/context/AuthContext.jsx
import api from "@/lib/api";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await api.get("/users/me"); // Add this endpoint
        setUser(res.data);
      } catch (err) {
        setUser(null);
      }
    };
    if (localStorage.getItem("token")) loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
