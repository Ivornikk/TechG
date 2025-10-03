import './envConf.mjs'
import './syncOpenSearch.mjs'
const PORT = process.env.PORT || 5000
import express from 'express'
import Router from './routes/index.mjs'
import sequelize from './db.mjs'
import cors from 'cors'
import './models/models.mjs'
import errorhandler from "./middlewares/ErrorHandlingMiddleware.mjs"
import fileUpload from 'express-fileupload'

const App = express()


App.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:9200'],
    credentials: true
}))
App.use(express.json())
App.use(express.static(`${process.cwd()}\\static`))
App.use(fileUpload({}))
App.use('/api', Router)

// the errorhandler must always be registered last
App.use(errorhandler)

const start = async () => {
    await sequelize.authenticate()
    await sequelize.sync({alter: true})
    App.listen(PORT, () => console.log(`Server started at port ${PORT}`))
}

start()