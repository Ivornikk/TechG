import bcrypt from 'bcrypt'

export default {
        up: async (queryInterface, Sequelize) => {
        const hash = bcrypt.hash('Adimar20093008$', 5)

        return queryInterface.bulkInsert('users', [{
            email: 'metodievi038@gmail.com',
            password: hash,
            role: 'ADMIN',
            createdAt: new Date(),
            updatedAt: new Date()
        }])
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users', { email: 'metodievi038@gmail.com' })
    }
}