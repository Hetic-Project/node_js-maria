const express = require('express')
const router = require('./routes/router')
const mysql = require('mysql2/promise')

const app = express()
const port = "8080"

const database = mysql.createPool({
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'db_maria'
})

app.use(express.json());

app.use('/', router)

app.listen(port, () => 
    console.log(`App running on port ${port}`)
)