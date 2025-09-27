import type { NextFunction, Response, Request } from "express";
import { prisma } from "../config/prisma.js";

export async function verifyMedia(req: Request, res: Response, next: NextFunction){
    const mediaId = req.body.mediaId || req.query.mediaId
    const type = req.body.type || req.query.type

    if(!mediaId || !type){
        return res.status(400).json({
            error: "please provide necessary details"
        })
    }

    if(type === "REEL"){
        const reelExist = await prisma.reel.findUnique({
            where: {
                id: mediaId
            }
        })

        if(!reelExist){
            return res.status(400).json({
                error: "this reel doesn't exist"
            })
        }

        return next()
    }

    if(type === "POST"){
        const postExist = await prisma.post.findUnique({
            where: {
                id: mediaId
            }
        })

        if(!postExist){
            return res.status(400).json({
                error: "this post doesn't exist"
            })
        }

        return next()
    }
}