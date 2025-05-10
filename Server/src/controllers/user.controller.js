import { generateToken } from "../jwt/generateToken.js";
import User from "../models/user.model.js";

export const loginOrSignup = async (req, res) => {
  const { phone, address } = req.body;
  
  

  try {
    let user = await User.findOne({ phone });

    if (!user) {
      user = new User({ address, phone });
      await user.save();
    } else {
      user.address = address;
      await user.save();
    }

    const { accessToken, refreshToken } = generateToken(user.toObject());

    res.status(200).json({
      user,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.log("Login Error: ", error);
    res.status(500).json({err: error.message})
    
  }
};
