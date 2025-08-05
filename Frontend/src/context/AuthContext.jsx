import { useEffect, createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AuthContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const [showUserLogin, setShowUserLogin] = useState(false);


 const checkAdminAuth = async () => {
    try {
      const res = await axios.get("/api/admin/is-auth", {
        withCredentials: true,
      });


      if (res.data.success) {
        setIsAdmin(true);
      }
    } catch (error) {
      console.error("Admin Auth Error:", error.response?.data || error.message);
      setIsAdmin(null);
    } 
  };

  useEffect(() => {
    checkAdminAuth();
  }, []);


useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/api/user/is-auth", {
          withCredentials: true,
        });
        
        // console.log("USER IS:", res.data);
        
        if (res.data.success) {
          setUser(res.data.user);
        }
      } catch (err) {
        setUser(null);
        console.log("Auth error:", err.response?.data || err.message);
        
      
        if (err.response?.status === 401) {
          // navigate('/login');
        }
      }
    };

    checkAuth();
  }, []);


  const value = {
    navigate,
    user,
    setUser,
    setIsAdmin,
    isAdmin,
    showUserLogin,
    setShowUserLogin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
