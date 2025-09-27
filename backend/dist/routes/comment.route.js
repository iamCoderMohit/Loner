import express from "express";
import { prisma } from "../config/prisma.js";
import { authMiddleware } from "../middleware/verifyToken.js";
import { verifyMedia } from "../middleware/verifyMedia.js";
const commentRouter = express.Router();
commentRouter.use(authMiddleware);
commentRouter.post("/", verifyMedia, async (req, res) => {
    const { content, mediaId, type } = req.body;
    const myId = req.user.id;
    try {
        if (type === "REEL") {
            await prisma.comment.create({
                data: {
                    content,
                    reelId: mediaId,
                    userId: myId,
                },
            });
        }
        else {
            await prisma.comment.create({
                data: {
                    content,
                    postId: mediaId,
                    userId: myId,
                },
            });
        }
        res.json({
            msg: "done",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error: "can't comment, try again",
        });
    }
});
//reply to a comment
commentRouter.post("/reply", verifyMedia, async (req, res) => {
    const { parentId, content, mediaId, type } = req.body;
    const myId = req.user.id;
    try {
        const parentExists = await prisma.comment.findUnique({
            where: {
                id: parentId,
            },
        });
        if (!parentExists) {
            return res.status(404).json({
                error: "parent comment not found",
            });
        }
        if (type === "REEL") {
            await prisma.comment.create({
                data: {
                    content,
                    parentId,
                    reelId: mediaId,
                    userId: myId,
                },
            });
        }
        else {
            await prisma.comment.create({
                data: {
                    content,
                    parentId,
                    postId: mediaId,
                    userId: myId,
                },
            });
        }
        res.json({
            msg: "done",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error: "can't reply, try again",
        });
    }
});
//like a comment
commentRouter.post("/like", async (req, res) => {
    const { commentId } = req.body;
    const myId = req.user.id;
    try {
        const commentExists = await prisma.comment.findUnique({
            where: {
                id: commentId,
            },
        });
        if (!commentExists) {
            return res.status(404).json({
                error: "this comment doesn't exist",
            });
        }
        await prisma.commentLike.create({
            data: {
                commentId,
                userId: myId,
            },
        });
        res.json({
            msg: "done",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error: "can't like, try again",
        });
    }
});
//delete a comment
commentRouter.delete("/delete/:commentId", async (req, res) => {
    const commentId = req.params.commentId;
    const myId = req.user.id;
    try {
        const commentExists = await prisma.comment.findUnique({
            where: {
                id: commentId,
            },
        });
        if (!commentExists) {
            return res.status(404).json({
                error: "this comment doesn't exist",
            });
        }
        if (commentExists.userId !== myId) {
            return res.status(400).json({
                error: "you don't have rights to delete this comment",
            });
        }
        await prisma.comment.delete({
            where: {
                id: commentId,
            },
        });
        res.json({
            msg: "done",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error: "can't delete comment, try again",
        });
    }
});
//get all comments
commentRouter.get("/all", verifyMedia, async (req, res) => {
    const { mediaId, type } = req.query;
    console.log(mediaId);
    try {
        if (type === "REEL") {
            const comments = await prisma.comment.findMany({
                where: {
                    reelId: mediaId
                },
                include: {
                    user: true
                }
            });
            return res.json(comments);
        }
        if (type === "POST") {
            const comments = await prisma.comment.findMany({
                where: {
                    postId: mediaId
                },
                include: {
                    user: true
                }
            });
            return res.json(comments);
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "can't fetch comments, try again",
        });
    }
});
//get all replies to a comment
export default commentRouter;
//# sourceMappingURL=comment.route.js.map