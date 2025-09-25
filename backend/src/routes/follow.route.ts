import express from "express";
import { prisma } from "../config/prisma.js";
import { authMiddleware } from "../middleware/verifyToken.js";

const followRouter = express.Router();

followRouter.use(authMiddleware);

//follow a user
followRouter.post("/", async (req, res) => {
  const { toFollowId } = req.body;
  const myId = (req as any).user.id;

  if (toFollowId === myId) {
    res.status(400).json({
      error: "you cant follow yourself",
    });
  }

  try {
    await prisma.follow.create({
      data: {
        followingId: toFollowId,
        followerId: myId,
      },
    });

    res.json({
      msg: "done",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "cant follow try again",
    });
  }
});

//unfollow a user
followRouter.post("/unfollow", async (req, res) => {
  const { toUnfollowId } = req.body;
  const myId = (req as any).user.id;

  try {
    await prisma.follow.delete({
      where: {
        followerId_followingId: {
          followerId: myId,
          followingId: toUnfollowId,
        },
      },
    });

    res.json({
      msg: "done",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "cant unfollow try again",
    });
  }
});

//get all following of a user with user's details
followRouter.get("/following/:userId", async (req, res) => {
  const userId = req.params.userId;
  const myId = (req as any).user.id;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      res.status(404).json({
        error: "user not found",
      });
    }

    if (user?.isPrivate && user.id !== myId) {
      res.status(400).json({
        error: "this account is private",
      });
    }

    const following = await prisma.follow.findMany({
      where: { followerId: userId },
      include: { following: true }, //to get the full user details
    });

    res.json({
      following,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "can't fetch try again",
    });
  }
});

//get all followers of a user
followRouter.get("/followers/:userId", async (req, res) => {
  const userId = req.params.userId;
  const myId = (req as any).user.id;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      res.status(404).json({
        error: "user not found",
      });
    }

    if (user?.isPrivate && userId !== myId) {
      res.status(400).json({
        error: "this account is private",
      });
    }

    const followers = await prisma.follow.findMany({
      where: { followingId: userId },
      include: { follower: true },
    });

    res.json({
      followers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "can't fetch try again",
    });
  }
});

export default followRouter;
