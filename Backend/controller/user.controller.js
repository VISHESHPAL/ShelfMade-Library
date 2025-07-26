import { User } from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
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


export const tekeAdmission = async(req, res) =>{
  try {

    const user = await User.findById(req.user._id);
    if(!user){
      res.status(404).json({
        success: false ,
        message : "User Not Found "
      })
    }
    if(user.addmissionTaken){
      return res.status(401).json({
        success  : false ,
        message : "Already Taked Admission"
      })
    }
    user.addmissionTaken = true ,
    user.addmissionDate = new Date();

    await user.save();


    return res.status(201).json({
      success : true,
      user,
      message  : "Admission Taken Sucessfully ! "
    })
    
  } catch (error) {
     return res.status(500).json({
      success: false,
      message: "Admission Failed  ! ",
      error: error.message,
    });
  }
}


// export const updateFees = async(req, res) =>{
//    try {

//     const user =  await User.findById(req.user._id);
//     if(!user){
//       res.status(404).json({
//         success: false ,
//         message : "User Not Found "
//       })
//     }

//     if(!user.addmissionTaken){
//       res.status(401).json({
//         success : false ,
//         message : "Take the admission Firstly !"
//       })
//     }

//     user.feePaid = true ;
//     await user.save();

//     return res.status(201).json({
//        success : true ,
//        message : "Fee Updated Successfully ! "
//     })
    
//    } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Fee Upating Failed  ! ",
//       error: error.message,
//     });
//    }
// }