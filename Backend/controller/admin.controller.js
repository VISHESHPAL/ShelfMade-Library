import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";
import { Book } from "../model/book.model.js";

export const adminLogin = (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are Required",
      });
    }
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days (match JWT expiry)
    });

      return res.status(200).json({
        success: true,
        message: "Admin Logged In Successfully !",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid Admin Credentials",
      });
    }
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const isAdminAuth = async (req, res) => {
  try {
    return res.json({
      success: true,
      admin : req.admin
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
export const adminLogout = (req, res) => {
  try {
    res.clearCookie("adminToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Admin Logout Successfully ! ",
    });
  } catch (error) {
    console.error(error);
    return res.status(501).json({
      success: false,
      error: error.message,
    });
  }
};

export const getAllAdmissions = async (req, res) => {
  try {
    const admittedUsers = await User.find({ addmissionTaken: true }).select(
      "-password"
    );

    res.status(200).json({
      success: true,
      message: "All Users Fetched Successfullly ! ",
      total: admittedUsers.length,
      users: admittedUsers,
    });
  } catch (error) {
    console.error("Error fetching admissions:", error);
    return res.status(501).json({
      success: false,
      message: "Error in the Fetching the all the students",
    });
  }
};

export const updateFees = async (req, res) => {
  try {
    const { id } = req.params;
    const { feePaid } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.feePaid = feePaid;
    await user.save();

    return res.status(201).json({
      success: true,
      message: `Fee status updated for ${user.name}`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Fee Upating Failed  ! ",
      error: error.message,
    });
  }
};

export const addBook = async (req, res) => {
  try {
    const { title, author, availableCopies, description, totalCopies } = req.body;

    if (!title || !author) {
      return res.status(400).json({
        success: false,
        message: "Title and the author are required ",
      });
    }

    const book = await Book.create({
      title,
      author,
      description,
      totalCopies,
      availableCopies
    });

    return res.status(201).json({
      success: true,
      book,
      message: "Book Added Successfully ! ",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error while Adding the Book",
    });
  }
};
 