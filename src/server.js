import express from 'express'
import { connectDB } from '*/config/mongodb.js'
import { env } from '*/config/environment'
import { BoardModel } from '*/models/board.model.js'

connectDB()
    .then(() => console.log('Connected MongoDB successfully to server'))
    .then(() => bootServer())
    .catch(error => {
        console.error(error)
        process.exit(1)
    })
const bootServer = () => {
    const app = express()

    app.get('/test', async (req, res) => {
        res.end('<h1>Hello World KassDev</h1><hr/>')
    })

    app.listen(env.APP_PORT, env.APP_HOST, () => {
        console.log(`Hello kassdev, I'm runnung at ${env.APP_HOST}:${env.APP_PORT}/`)
    })
}