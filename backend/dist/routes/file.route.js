import express from 'express';
import { authMiddleware } from '../middleware/verifyToken.js';
import { uploadFile } from '../utils/fileUpload.js';
import { prisma } from '../config/prisma.js';
import multer from 'multer';
const fileRouter = express.Router();
fileRouter.use(authMiddleware);
const upload = multer({ storage: multer.memoryStorage() });
fileRouter.post('/upload', upload.single("file"), async (req, res) => {
    try {
        const userId = req.user.id;
        const url = await uploadFile(req.file, userId);
        const media = await prisma.media.create({
            data: {
                fileUrl: url,
                fileType: "image/jpg",
                userId: userId
            }
        });
        res.json({ media });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            "error": "upload failed"
        });
    }
});
export default fileRouter;
//# sourceMappingURL=file.route.js.map