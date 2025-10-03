// import User from "../models/User.js";

// export const getProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).select("-password");

//     if (!user) return res.status(404).json({ message: "User not found" });

//     const avatarURL = user.avatar
//       ? `${req.protocol}://${req.get("host")}${user.avatar}`
//       : null;

//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       avatar: avatarURL,
//     });
//   } catch (error) {
//     console.error("Profile error:", error.message);
//     res.status(500).json({ message: error.message });
//   }
// };
