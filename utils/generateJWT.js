import jwt from "jsonwebtoken";

export const generateJWT = (
  payload,
  expiresIn = process.env.JWT_EXPIRES_IN
) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn,
  });
  return token;
};
