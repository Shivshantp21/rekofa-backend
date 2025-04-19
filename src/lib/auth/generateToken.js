import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role || "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "6h" }
  );
};
