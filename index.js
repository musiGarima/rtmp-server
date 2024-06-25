const express = require('express')
const db = require('./database/mongo')
const rtmpServer = require('./libs/rtmpServer')


const app = express()
app.use(express.json({limit: '10mb'}))
app.use(express.urlencoded({ extended: false}))
const PORT = 3000

app.listen(PORT, async () => {
  rtmpServer()
  console.log('server started on Port number', PORT)
  await db()

})
