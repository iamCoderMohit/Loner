import path from 'path';
import bucket from '../config/firebase.js';
export async function uploadFile(localFilePath, userId) {
    const fileName = `${userId}/${Date.now()}-${path.basename(localFilePath)}`;
    await bucket.upload(localFilePath, {
        destination: fileName,
        metadata: {
            contentType: 'image/png'
        }
    });
    //getting the url for client
    const file = bucket.file(fileName);
    const [url] = await file.getSignedUrl({
        action: "read",
        expires: "03-01-2030"
    });
    return url;
}
//# sourceMappingURL=fileUpload.js.map