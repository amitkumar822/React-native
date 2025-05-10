import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const accessToken = jwt.sign(
    {
      userId: user?._id,
    },
    process.env.ACCESS_JWT_SECRET,
    {
      expiresIn: "2d",
    }
  );

  const refreshToken = jwt.sign(
    {userId: user?._id},
    process.env.REFRESH_JWT_SECRET,
    {expiresIn: "7d"}
  )
  return {accessToken, refreshToken};
};
