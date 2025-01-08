const User = require("../models/User");
const Subscription = require("../models/Subscription");

exports.getDashboardData = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ access: true });
    const inactiveUsers = totalUsers - activeUsers;

    const basicUsers = await User.countDocuments({ serviceType: "basic" });
    const premiumUsers = await User.countDocuments({ serviceType: "premium" });
    const advancedUsers = await User.countDocuments({ serviceType: "advanced" });

    const subscriptions = await Subscription.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    res.status(200).json({
      totalUsers,
      activeUsers,
      inactiveUsers,
      basicUsers,
      premiumUsers,
      advancedUsers,
      subscriptions,
    });
  } catch (error) {
    console.error("Error al obtener datos del dashboard:", error);
    res.status(500).json({ error: "Error al obtener datos del dashboard." });
  }
};
