import path from 'path';
import bucket from '../config/firebase.js';
export async function uploadFile(file, userId) {
    const fileName = `${userId}/${Date.now()}-${file.originalname}`;
    if (file.buffer) {
        const blob = bucket.file(fileName);
        const blobStream = blob.createWriteStream({
            metadata: { contentType: file.mimetype }
        });
        blobStream.end(file.buffer);
        await new Promise((resolve, reject) => {
            blobStream.on("finish", resolve);
            blobStream.on("error", reject);
        });
    }
    //getting the url for client
    const blob = bucket.file(fileName);
    const [url] = await blob.getSignedUrl({
        action: "read",
        expires: "03-01-2030"
    });
    return url;
}
//# sourceMappingURL=fileUpload.js.map