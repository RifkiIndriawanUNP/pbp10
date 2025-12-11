const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const userRoute = require('./routes/userRoute')

dotenv.config()

const app = express()

app.use(bodyParser.json())
app.use('/api/books', userRoute)

const PORT = process.env.port

app.listen(PORT, () =>{
    console.log(`http://localhost:${PORT}/api/books`);
})