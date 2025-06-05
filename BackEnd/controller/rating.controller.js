import prisma from "../prismaClient.js";

export const createRating = async (req, res) => {
  try {
    const userID = req.user.id;
    const { storeID, value } = req.body;

    if (!storeID || typeof value !== "number") {
      return res.status(400).json({ message: "storeID and rating value are required" });
    }

    const alreadyRated = await prisma.rating.findFirst({
      where: { userID, storeID }
    });

    if (alreadyRated) {
      return res.status(409).json({ message: "You have already rated this store" });
    }

    const rating = await prisma.rating.create({
      data: {
        userID,
        storeID,
        value: parseInt(value),
      }
    });

    return res.status(201).json({ message: "Rating submitted successfully", rating });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to submit rating", error: err.message });
  }
};



export const updateRating = async (req, res) => {
  try {
    const ratingId = req.params.ratingId;
    const userID = req.user.id;
    const { value } = req.body;

    if (!value || typeof value !== "number") {
      return res.status(400).json({ message: "Rating value is required and must be a number" });
    }

    const rating = await prisma.rating.findFirst({
      where: { id: ratingId, userID }
    });

    if (!rating) {
      return res.status(403).json({ message: "You are not allowed to update this rating" });
    }

    const updatedRating = await prisma.rating.update({
      where: { id: ratingId },
      data: { value: parseInt(value), updatedAt: new Date() }
    });

    return res.status(200).json({ message: "Rating updated successfully", updatedRating });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update rating", error: err.message });
  }
};



export const searchStores = async (req, res) => {
  try {
    const { query } = req.query;

    const stores = await prisma.store.findMany({
      where: {
        OR: [
          {
            storeName: {
              contains: query || "",
              mode: "insensitive",
            },
          },
          {
            storeAddress: {
              contains: query || "",
              mode: "insensitive",
            },
          },
        ],
      },
    });

    res.status(200).json({ stores });
  } catch (err) {
    console.error("Error in searchStores:", err);
    res.status(500).json({ message: "Failed to fetch stores", error: err.message });
  }
};
