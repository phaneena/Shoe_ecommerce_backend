const isAdmin = require("../middlewares/isAdmin");
const Order = require("../models/orderModel");
const User = require("../models/userModels");
const CustomError = require("../utils/customError");

//get all users
exports.getAllUserService = async (limits, skips) => {
  const usersList = await User.find({ isAdmin: { $ne: true } })
    .skip(skips)
    .limit(limits);
  // console.log(usersList,'users')
  const totalUsers = await User.countDocuments({ isAdmin: { $ne: true } });
  // console.log(totalUsers,'total')
  return { usersList, totalUsers };
};

//get specific user
exports.singleUserService = async (id) => {
  const users = await User.findById(id);
  if (!users) {
    throw new CustomError("user not found", 400);
  }
  return users;
};

//Block user
exports.userBlockService = async (id) => {
  const userDetails = await User.findById(id);
  if (!userDetails) {
    throw new CustomError("user not found", 400);
  }
  userDetails.isBlock = !userDetails.isBlock;
  userDetails.save();
  return userDetails;
};
 
//get total revenue
exports.totalRevenueService = async () => {
  const result = await Order.aggregate([
    { $group: { _id: null, totalRevenue: { $sum: "$total" } } },
  ]);
  return result;
};
