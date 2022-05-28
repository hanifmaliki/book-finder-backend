const { getFavBooks, insertFavBooks, deleteFavBooks } = require('./function.js')

const express = require('express')
// const cors = require('cors')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
    res.json({
        message: "Halo gaes, ini endpoint."
    })
})

app.get('/api/getFavBooks', async (req, res) => {
    let data = await getFavBooks().catch(console.dir);
    res.json(data)
})

app.get('/api/insertFavBooks', async (req, res) => {
    let data = await insertFavBooks(req.query).catch(console.dir);
    res.json(data)
})

app.get('/api/deleteFavBooks', async (req, res) => {
    let data = await deleteFavBooks(req.query).catch(console.dir);
    res.json(data)
})

const PORT = 8000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})