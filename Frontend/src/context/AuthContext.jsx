import { useEffect, createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const AuthContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(true);
  const [showUserLogin, setShowUserLogin] = useState(false);

// useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/user/is-auth", {
//           withCredentials: true,
//         });
        
//         console.log("USER IS:", res.data);
        
//         if (res.data.success) {
//           setUser(res.data.user);
//         }
//       } catch (err) {
//         setUser(null);
//         console.log("Auth error:", err.response?.data || err.message);
        
//         // Optional: Redirect to login if unauthorized
//         if (err.response?.status === 401) {
//           // navigate('/login');
//         }
//       }
//     };

//     checkAuth();
//   }, []);


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
