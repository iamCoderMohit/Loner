import express from 'express'
import { authMiddleware } from '../middleware/verifyToken.js'

const fileRouter = express.Router()

fileRouter.use(authMiddleware)

fileRouter.get('/', (req, res) => {
    res.send("accessed")
})

export default fileRouter