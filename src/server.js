import express from 'express'
import mapOrder from '*/utils/sorts.js'

const app = express()
const hostname = 'localhost'
const port = 8017

app.get('/', (req, res) => {
    res.end('<h1>Hello World KassDev</h1><hr/>')
})

app.listen(port, hostname, () => {
    console.log(`Hello kassdev, I'm runnung at ${hostname}:${port}/`)
})