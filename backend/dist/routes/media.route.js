import express from "express";
import { prisma } from "../config/prisma.js";
const mediaRouter = express.Router();
mediaRouter.get("/posts", async (req, res) => {
    const { cursor } = req.query; //fetch posts after this id's row
    //the cursor will be sent from frontend
    try {
        const posts = await prisma.post.findMany({
            where: { user: { isPrivate: false } },
            include: { user: { select: { username: true, picture: true } } },
            orderBy: { createdAt: "desc" },
            ...(cursor ? { cursor: { id: String(cursor) } } : {}),
            skip: cursor ? 1 : 0,
            take: 10,
        });
        res.json({ posts });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error: "cant fetch posts",
        });
    }
});
//get reels
mediaRouter.get("/reels", async (req, res) => {
    const { cursor } = req.query;
    try {
        const reels = await prisma.reel.findMany({
            where: { user: { isPrivate: false } },
            include: { user: { select: { username: true, picture: true } } },
            orderBy: { createdAt: "desc" },
            ...(cursor ? { cursor: { id: String(cursor) } } : {}),
            skip: cursor ? 1 : 0,
            take: 10,
        });
        res.json({ reels });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error: "error fetching reels",
        });
    }
});
//get stories of friends only
mediaRouter.get("/story/:userId", async (req, res) => {
    const userId = req.params.userId;
    const myId = req.user.id;
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: { story: true },
        });
        if (!user) {
            return res.status(404).json({
                error: "user not found",
            });
        }
        const isPublic = user?.isPrivate ? false : true;
        const mutualFollow = await prisma.follow.findMany({
            where: {
                OR: [
                    { followerId: myId, followingId: userId },
                    { followerId: userId, followingId: myId },
                ],
            },
        });
        const isMutual = mutualFollow.length === 2;
        if (isMutual || isPublic) {
            return res.json({
                story: user?.story,
            });
        }
        else {
            return res.status(400).json({
                error: "can't see story",
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error: "can't see story"
        });
    }
});
export default mediaRouter;
//# sourceMappingURL=media.route.js.map