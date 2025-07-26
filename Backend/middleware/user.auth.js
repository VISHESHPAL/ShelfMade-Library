import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.userToken;
    // console.log(token)

    if (!token) {
      return res.status(401).json({ success: false, message: "Not logged in" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id).select("-password");

    if (!req.user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    next();
  } catch (error) {

    return res.status(401).json({ 
        success: false, 
        error : error.message,
        message: "Invalid or expired token" });
  }
};
