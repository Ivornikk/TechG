import { Sequelize } from 'sequelize'

export default new Sequelize(
    'mydb',
    'postgres',
    'postgres',
    {
        dialect: 'postgres',
        host: 'postgres',
        port: 'postgres'
    }
)