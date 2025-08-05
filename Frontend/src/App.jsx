import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAuthContext } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Home from "./pages/users/Home";
import Profile from "./pages/users/Profile";
import Admission from "./pages/users/Admission";
import BorrowedBooks from "./pages/users/BorrowedBooks";
import Login from "./pages/users/Login";
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import AddBook from "./pages/admin/AddBook";
import AllUsers from "./pages/admin/AllUsers";
import AllBooks from "./pages/admin/AllBooks";

function App() {
  const { isAdmin } = useAuthContext();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div>
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admission" element={<Admission />} />
        <Route path="/borrowed" element={<BorrowedBooks />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={isAdmin ? <Dashboard><div className="text-xl font-semibold">Welcome, Admin</div></Dashboard> : <AdminLogin />}
        />
        <Route
          path="/admin/add-book"
          element={isAdmin ? (
            <Dashboard>
              <AddBook />
            </Dashboard>
          ) : (
            <AdminLogin />
          )}
        />
        <Route
          path="/admin/all-users"
          element={isAdmin ? (
            <Dashboard>
              <AllUsers />
            </Dashboard>
          ) : (
            <AdminLogin />
          )}
        />
        <Route
          path="/admin/all-books"
          element={isAdmin ? (
            <Dashboard>
              <AllBooks />
            </Dashboard>
          ) : (
            <AdminLogin />
          )}
        />
      </Routes>

      <ToastContainer position="top-center" autoClose={2000} theme="colored" />
    </div>
  );
}

export default App;
