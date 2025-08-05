import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
  const { adminToken } = req.cookies;
//   console.log(adminToken)

  if (!adminToken) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized: No token provided",
    });
  }

  try {
    const tokenDecode = jwt.verify(adminToken, process.env.JWT_SECRET);

    if (tokenDecode.email === process.env.ADMIN_EMAIL) {
      return next(); // ✅ Only call once
    } else {
      return res.status(403).json({
        success: false,
        message: "Not Authorized: Invalid Admin email",
      });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token verification failed: " + error.message,
    });
  }
};

export default authAdmin;