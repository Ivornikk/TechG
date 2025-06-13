import { config } from 'dotenv'
config()
const PORT = process.env.PORT || 5000
import express from 'express'
import sequelize from './db.mjs'
import Router from './routes/index.mjs'

const App = express()

App.use(express.json())
App.use('/api', Router)

App.get('/', (req, res) => {
    sequelize.authenticate()
    sequelize.sync()
    res.status(200).json({message: "WORKING!!!"})
})

const start = async () => {
    App.listen(PORT, () => console.log(`Server started at port ${PORT}`))
}

start()