import jwt from "jsonwebtoken";
import User from "../models/Users.js";

const auth = () => {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({ message: "Not authorized" });
    }

    try {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }


      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: "Token invalid" });
    }
  };
};

export default auth;