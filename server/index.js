require('dotenv').config()
const PORT = process.env.PORT || 5000
const express = require('express')
const sequelize = require('./db')

const App = express()

App.use(express.json())

App.get('/', (req, res) => {
    sequelize.authenticate()
    sequelize.sync()
    res.status(200).json({message: "WORKING!!!"})
})

const start = async () => {
    App.listen(PORT, () => console.log(`Server started at port ${PORT}`))
}

start()