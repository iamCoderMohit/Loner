import express from 'express';
import { prisma } from '../config/prisma.js';
const mediaRouter = express.Router();
mediaRouter.get("/posts", async (req, res) => {
    const { cursor } = req.query; //fetch posts after this id's row
    //the cursor will be sent from frontend
    try {
        const posts = await prisma.post.findMany({
            orderBy: { createdAt: "desc" },
            ...(cursor ? { cursor: { id: String(cursor) } } : {}),
            skip: cursor ? 1 : 0,
            take: 10
        });
        res.json({ posts });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            "error": "cant fetch posts"
        });
    }
});
//get reels
mediaRouter.get("/reels", async (req, res) => {
    const { cursor } = req.query;
    try {
        const reels = await prisma.reel.findMany({
            orderBy: { createdAt: "desc" },
            ...(cursor ? { cursor: { id: String(cursor) } } : {}),
            skip: cursor ? 1 : 0,
            take: 10
        });
        res.json({ reels });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            "error": "error fetching reels"
        });
    }
});
//get stories of friends only
export default mediaRouter;
//# sourceMappingURL=media.route.js.map