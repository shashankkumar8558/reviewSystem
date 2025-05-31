import prisma from "../prismaClient.js";

export const roleUpdate = async (req, res) => {
  try {
    const { userId, role } = req.body;

    const validRoles = ["ADMIN", "USER", "OWNER"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role selected" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role },
    });

    return res.status(200).json({ message: "User role updated", updatedUser });
  } catch (err) {
    console.error("Role update failed:", err);
    res.status(500).json({ message: "Role update failed", error: err.message });
  }
};

export const ratedList = async (req, res) => {
  try {
    const ratedItems = await prisma.rating.findMany({
      orderBy: {
        createdAt: 'desc', 
      },
      include: {
        user: true,       
        store: true        
      }
    });

    if (!ratedItems || ratedItems.length === 0) {
      return res.status(404).json({ message: "No ratings found" });
    }

    return res.status(200).json({ ratedItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to retrieve rated list',
      error: error.message,
    });
  }
};

export const adminDashboard = async (req,res) => {
  try {
    const userCount = await prisma.user.count();
    const storeCount = await prisma.store.count();
    const ratingCount = await prisma.rating.count();

    return res.status(200).json({userCount,storeCount,ratingCount})
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to fetch dashboard stats',
      error: error.message,
    });
  }
}
