import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";

const isAdmin = async (req, res,next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECREATE);

    console.log("Decoded token:", decoded);

    const user = await UserModel.findById(decoded.userId);
    console.log("User:", user);

    if (!user) {
      return res.status(403).json({ message: "Unauthorized: User not found" });
    }

    if (user.role != "admin") {
      return res
        .status(403)
        .json({
          success: false,
          message: "Unauthorized: User is not an Admin",
        });
    }

    next();
  } catch (error) {
    console.error('Error during login', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export { isAdmin };
