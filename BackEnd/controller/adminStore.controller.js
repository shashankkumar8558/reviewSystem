import prisma from "../prismaClient.js";
import { validateStoreInput } from "../utils/validateStoreInput.js";

export const adminStoreCreate = async (req, res) => {
  try {
    const { storeName, storeEmail, storeAddress, ownerId } = req.body;
    if (!storeName || !storeEmail || !storeAddress || !ownerId) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const errors = validateStoreInput({ storeName, storeEmail, storeAddress });
    if (errors.length > 0) {
      return res.status(400).json({errors})
    }

    const store = await prisma.store.findFirst({
      where: {
        OR: [
          { storeEmail },
          { storeName }
        ]
      }
    });
    if (store) {
      return res.status(409).json({ message: "Store Already Exist" })
    }

    const newStore = await prisma.store.create({
      data: {
        storeName,
        storeEmail,
        storeAddress,
        ownerId,
        storeRating : 0
      }
    })

    return res.status(201).json({ message: "created store successfully", newStore });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Creation Failed", error: error.message });
  }
}


export const adminStoresList = async (req, res) => {
  try {
    const { search } = req.query;

    const whereClause = search
      ? {
          OR: [
            { storeName: { contains: search, mode: "insensitive" } },
            { storeAddress: { contains: search, mode: "insensitive" } },
          ],
        }
      : {};

    const stores = await prisma.store.findMany({
      where: whereClause,
      include: {
        owner: {
          select: { userName: true, email: true },
        },
      },
    });

    res.status(200).json({ stores });
  } catch (err) {
    console.error("Failed to fetch stores", err);
    res.status(500).json({ message: "Store list fetch failed", error: err.message });
  }
};

export const deleteStore = async (req, res) => {
  try {
    const { storeID } = req.body;

    if (!storeID) {
      return res.status(400).json({ message: "storeID is required" });
    }

    const storeToDelete = await prisma.store.delete({
      where: {
        id: storeID, 
      },
    });

    return res.status(200).json({ message: "Store deleted successfully", storeToDelete });

  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Store not found" });
    }
    console.error("Failed to delete store:", error);
    res.status(500).json({ message: "Store deletion failed", error: error.message });
  }
};
