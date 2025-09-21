import express from 'express';
import { authMiddleware } from '../middleware/verifyToken.js';
import { uploadFile } from '../utils/fileUpload.js';
import { prisma } from '../config/prisma.js';
const fileRouter = express.Router();
fileRouter.use(authMiddleware);
fileRouter.post('/upload', async (req, res) => {
    try {
        const localFilePath = "./src/upload/post-3.jpg";
        const userId = "user123";
        const url = await uploadFile(localFilePath, userId);
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