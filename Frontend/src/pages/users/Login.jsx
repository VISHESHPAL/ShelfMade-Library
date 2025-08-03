import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import axios from 'axios'

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleAuth = async (e) => {
  e.preventDefault();

  try {
    if (state === "login") {
      const { data } = await axios.post("http://localhost:5000/api/user/login", {
        email,
        password,
      });

      // Assuming the backend returns user data
      setUser(data.user);
      toast.success("Login successful");
      navigate("/");
    } else {
      if (!name || !email || !password) {
        toast.error("Please fill all fields");
        return;
      }

      const { data } = await axios.post("http://localhost:5000/api/user/register", {
        name,
        email,
        password,
      });

      setUser(data.user);
      toast.success("Account created");
      navigate("/");
    }
  } catch (error) {
    console.log(error)
    const message = error.response?.data?.message || "Something went wrong";
    toast.error(message);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f9f9] px-4">
      <form
        onSubmit={handleAuth}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <p className="text-2xl font-medium m-auto">
          <span className="text-black">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>

        {state === "register" && (
          <div className="w-full">
            <p>Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="type here"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-black"
              type="text"
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-black"
            type="email"
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-black"
            type="password"
            required
          />
        </div>

        {state === "register" ? (
          <p className="text-sm">
            Already have account?{" "}
            <span
              onClick={() => setState("login")}
              className="text-red-300 cursor-pointer"
            >
              click here
            </span>
          </p>
        ) : (
          <p className="text-sm">
            Create an account?{" "}
            <span
              onClick={() => setState("register")}
              className="text-red-300 cursor-pointer"
            >
              click here
            </span>
          </p>
        )}

        <button
          type="submit"
          className="bg-black hover:bg-black transition-all text-white w-full py-2 rounded-md cursor-pointer"
        >
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
