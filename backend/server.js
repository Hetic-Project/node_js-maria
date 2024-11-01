const express = require('express')
const router = require('./routes/router')

const app = express()
const port = "8081"

app.use(express.json());

// app.get('/', (req, res) => {res.send('Hello World!')})

app.use('/', router)

app.listen(port, () => 
    console.log(`App running on port ${port}`)
)