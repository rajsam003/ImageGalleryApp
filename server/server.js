const express = require('express')
const app = express()
const port = 3000

const mockImages = require('./images')

app.get('/api/images', (req, res) => {
  res.json(mockImages)
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
