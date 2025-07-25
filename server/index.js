import './envConf.mjs'
const PORT = process.env.PORT || 5000
import express from 'express'
import Router from './routes/index.mjs'
import sequelize from './db.mjs'
import cors from 'cors'
import './models/models.mjs'
import errorhandler from "./middlewares/ErrorHandlingMiddleware.mjs"

const App = express()

App.use(cors())
App.use(express.json())
App.use('/api', Router)

// the errorhandler must always be registered last
App.use(errorhandler)

const start = async () => {
    await sequelize.authenticate()
    await sequelize.sync({alter: true})
    App.listen(PORT, () => console.log(`Server started at port ${PORT}`))
}

start()