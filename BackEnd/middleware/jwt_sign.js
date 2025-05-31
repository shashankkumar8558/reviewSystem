import  jwt  from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jwt_secret = process.env.JWT_SECRET || 'superSecret';

export const signToken = (payload) => {
  return jwt.sign(payload,jwt_secret,{expiresIn:'2h'});
}

export const verifyToken = (token) => {
  return jwt.verify(token, jwt_secret);
};