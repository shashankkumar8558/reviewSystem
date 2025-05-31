import prisma from "../prismaClient.js";

export const adminUserCreate = async (req,res) => {
  try {
    const {userName , email, password, role} = req.body;
    const user = await prisma.user.findUnique({
      where : {
        email,
      }
    })

    if (user) {
      return res.status(409).json({message : "User Already Exist"})
    }

    const newUser = await prisma.user.create({
      data: {
      userName,
      email,
      password,
      role
      }
   })

    return res.status(201).json({message : "successfully created newUser",newUser})
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Creation Failed", error: error.message });
  }
}

export const adminUsersList = async (req, res) => {
  try {
    const { role } = req.query;

    const whereClause = role ? { role } : {};

    const users = await prisma.user.findMany({
      where: whereClause,
      select: {
        id: true,
        userName: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return res.status(200).json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch users", error: err.message });
  }
};
