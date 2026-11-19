import { useContext, createContext, useState,useEffect } from "react";
import { useNavigate } from "react-router";
import apiClient from "../utils/api";

export const AuthContext = createContext();
export const useAuth = () => {
    return useContext(AuthContext);
}
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const isAuth = localStorage.getItem("isAuthenticated");
    const navigate = useNavigate();
     async function fetchUser() {
       try {
         const response = await apiClient.get("/auth/me");

         setUser(response.data.user);
         localStorage.setItem("isAuthenticated", true);
       } catch (error) {
         setUser(null);
         localStorage.removeItem("isAuthenticated");
       } finally {
         setLoading(false);
       }
     }

     useEffect(() => {
       if (isAuth && user) {
         setLoading(false);
       } else {
         fetchUser();
       }
     }, []);
    
    const logout = async () => {
        const response = await apiClient.post("/auth/logout");
        setUser(null);
        localStorage.removeItem("isAuthenticated");
        navigate("/login");
    }

    return (
      <AuthContext.Provider
        value={{ user, setUser, loading, setLoading, logout }}
      >
        {children}
      </AuthContext.Provider>
    );
    
}