import prisma from "../prismaClient.js";

export const ownerStoreRatings = async (req,res) => {
  try {
    const ownerId = req.user.id;

    const stores = await prisma.store.findMany({
      where: { ownerId },
      select: {
        id: true,
        storeName: true,
        rating: {
          include: {
            user: {
              select: {
                userName: true,
                email: true
              }
            }
          }
        }
      }
    });

    if (!stores.length) {
      return res.status(404).json({ message: "No stores or ratings found" });
    }

    return res.status(200).json({ stores });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching ratings", error: err.message });
  }
} 

export const ownerStoreAverageRating = async (req,res) => {
  try {
    const ownerId = req.user.id;

    const stores = await prisma.store.findMany({
      where: { ownerId },
      select: {
        storeName: true,
        id: true,
        _count: {
          select: { rating: true }
        },
        rating: {
          select: {
            value: true
          }
        }
      }
    });

    const result = stores.map(store => {
      const values = store.rating.map(r => r.value);
      const avg = values.reduce((a, b) => a + b, 0) / values.length || 0;

      return {
        storeId: store.id,
        storeName: store.storeName,
        averageRating: avg.toFixed(2),
        totalRatings: values.length
      };
    });

    return res.status(200).json({ stores: result });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error calculating averages", error: err.message });
  }
}