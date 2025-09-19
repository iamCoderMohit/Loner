import express from 'express'
import authRouter from './routes/auth.route.js'
import fileRouter from './routes/file.route.js'

const app = express()

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/file", fileRouter)

app.listen(3000, () => console.log("listening on 3000"))