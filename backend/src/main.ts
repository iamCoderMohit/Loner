import express from 'express'
import authRouter from './routes/auth.route.js'
import fileRouter from './routes/file.route.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mediaRouter from './routes/media.route.js'
import followRouter from './routes/follow.route.js'
import commentRouter from './routes/comment.route.js'
import chatRouter from './routes/chat.route.js'

const app = express()
app.use(cookieParser())
app.use(express.json())

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}))

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/file", fileRouter) 
app.use("/api/v1/media", mediaRouter)
app.use("/api/v1/follow", followRouter)
app.use("/api/v1/comment", commentRouter)
app.use("/api/v1/chat", chatRouter)

app.listen(3000, () => console.log("listening on 3000"))