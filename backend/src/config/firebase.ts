import admin from 'firebase-admin'
import { getStorage } from 'firebase-admin/storage'
import {Bucket} from '@google-cloud/storage'

admin.initializeApp({
    credential: admin.credential.cert('./src/config/serviceAccountKey.json'), //may be add ./config/serv
    storageBucket: 'loner-cfa6b.firebasestorage.app'
})

//@ts-ignore
const bucket: Bucket = getStorage().bucket()

export default bucket