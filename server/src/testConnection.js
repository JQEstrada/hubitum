const { Sequelize } = require('sequelize');
const config = require('./config/config');

const sequelize = new Sequelize(config.development);

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    } finally {
        await sequelize.close();
    }
}

testConnection();
