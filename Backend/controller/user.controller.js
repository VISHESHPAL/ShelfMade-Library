import { User } from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Book } from "../model/book.model.js";

export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({
        success: false,
        message: "User Already Exist ",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(200).json({
      success: true,
      user,
      message: "User Registered Successfully ! ",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Registration Failed ",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials ( User Not Found )",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials ( Incorrect Password )",
      });
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    res.cookie("userToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days (match JWT expiry)
    });

    return res.status(200).json({
      success: true,
      user,
      message: "User Logged In Successfully ! ",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Login Failed ",
      error: error.message,
    });
  }
};

export const logout = (req, res) => {
  res.clearCookie("userToken");
  return res.status(200).json({
    success: true,
    message: "User Logout Successfully ! ",
  });
};

export const isAuth = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Cannot Fetch the Profile ! ",
      error: error.message,
    });
  }
};

export const tekeAdmission = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User Not Found ",
      });
    }
    if (user.addmissionTaken) {
      return res.status(401).json({
        success: false,
        message: "Already Taked Admission",
      });
    }
    (user.addmissionTaken = true), (user.addmissionDate = new Date());

    await user.save();

    return res.status(201).json({
      success: true,
      user,
      message: "Admission Taken Sucessfully ! ",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Admission Failed  ! ",
      error: error.message,
    });
  }
};

export const barrowBook = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const book = await Book.findById(req.params.bookId);

    if (book.availableCopies <= 0) {
      return res.status(400).json({
        success: false,
        message: "Book is Not avalable ",
      });
    }

    book.availableCopies -= 1;
    book.save();

    user.borrowedBooks.push({ book: book._id });
    user.save();

    return res.status(200).json({
      success: true,
      message: "book is barrowed Successfully ! ",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Barrow Book Failed  ! ",
      error: error.message,
    });
  }
};

export const returnBook = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "borrowedBooks.book"
    );
    const bookId = req.params.bookId;

    const borrowRecord = user.borrowedBooks.find(
      (b) => b.book._id.toString() === bookId && !b.returned
    );

    if (!borrowRecord) {
      return res.status(400).json({
        success: false,
        message: "No Barrwed Record Found",
      });
    }

    borrowRecord.returned = true;
    await user.save();

    const book = await Book.findById(bookId);
    book.availableCopies += 1;
    book.save();

    return res.status(200).json({
      success: true,
      user,
      message: "Book Return Successfully ! ",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Return Book Failed  ! ",
      error: error.message,
    });
  }
};

export const myBooks = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "borrowedBooks.book"
    );

    return res.status(200).json({
      success: true,
      message: "All Borrowed Books",
      books: user.borrowedBooks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in the Getting of the Book  ! ",
      error: error.message,
    });
  }
};
