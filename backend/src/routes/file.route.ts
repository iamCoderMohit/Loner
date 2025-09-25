import express from 'express'
import { authMiddleware } from '../middleware/verifyToken.js'
import { uploadFile } from '../utils/fileUpload.js'
import { prisma } from '../config/prisma.js'
import multer from 'multer'

const fileRouter = express.Router()

fileRouter.use(authMiddleware)

const upload = multer({storage: multer.memoryStorage()})

fileRouter.post('/uploadPost', upload.single("file"), async (req, res) => {
    try {
        const userId: string = (req as any).user.id

        const url = await uploadFile(req.file!, userId)

        const post = await prisma.post.create({
            data: {
                fileUrl: url,
                fileType: req.file?.mimetype ?? null,
                userId: userId
            }
        })

        res.json({post})
    } catch (error) {
        console.error(error)
        res.status(500).json({
            "error": "upload failed"
        })
    }
})

//upload reel
fileRouter.post("/uploadReel", upload.single("file"), async (req, res) => {
    try {
        const userId = (req as any).user.id

        const url = await uploadFile(req.file!, userId)

        const reel = await prisma.post.create({
            data: {
                fileUrl: url,
                fileType: req.file?.mimetype ?? null,
                userId: userId
            }
        })

        res.json({reel})
    } catch (error) {
        console.error(error)
        res.status(500).json({
            "error": "upload failed"
        })
    }
})

//upload story
fileRouter.post("/uploadStory", async (req, res) => {
    try {
        const userId = (req as any).user.id

        const url = await uploadFile(req.file!, userId)

        const now = new Date()
        const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000)

        const story = await prisma.story.create({
            data: {
                fileUrl: url,
                fileType: req.file?.mimetype ?? null,
                expiresAt: expiresAt,
                userId: userId
            }
        })

        res.json({story})
    } catch (error) {
        console.error(error)
        res.status(500).json({
            "error": "upload failed"
        })
    }
})

export default fileRouter