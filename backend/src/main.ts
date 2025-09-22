import express from 'express'
import authRouter from './routes/auth.route.js'
import fileRouter from './routes/file.route.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()
app.use(cookieParser())

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/file", fileRouter)

app.listen(3000, () => console.log("listening on 3000"))