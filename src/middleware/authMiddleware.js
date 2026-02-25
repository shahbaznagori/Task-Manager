import jwt from "jsonwebtoken";
import User from "../models/Users.js";

const auth = async (req, res, next) => {
  console.log("THS I S")
    console.log('Request received:', req.method, req.url);
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      console.log('Authorization header not found or not in Bearer format');
      return res.status(401).json({ message: "Not authorized" });
    }
    
    try {
      const token = authHeader.split(" ")[1];
      console.log('Token received:', token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Token decoded successfully');

      const user = await User.findById(decoded.id);
      console.log('User found:', user);

      if (!user) {
        console.log('User not found');
        return res.status(401).json({ message: "User not found" });
      }

      console.log('User found in database');
      req.user = user;
      next();
    } catch (error) {
      console.log('Error decoding token:', error);
      res.status(401).json({ message: "Token invalid" });
    }
  };
export default auth;