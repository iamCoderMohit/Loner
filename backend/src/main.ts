import express from 'express'
import authRouter from './routes/auth.route.js'
import fileRouter from './routes/file.route.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mediaRouter from './routes/media.route.js'
import followRouter from './routes/follow.route.js'

const app = express()
app.use(cookieParser())
app.use(express.json())

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/file", fileRouter)
app.use("/api/v1/media", mediaRouter)
app.use("/api/v1/follow", followRouter)

app.listen(3000, () => console.log("listening on 3000"))