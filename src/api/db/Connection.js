const Sequelize = require('sequelize');

const databaseName = process.env.DB_NAME;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;

const sequelize = new Sequelize(databaseName, user, password, {
    host: host,
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    dialectOptions: {
        insecureAuth: true
    }
});

// Test Database
sequelize
  .authenticate()
  .then(() => {
    console.log('---------------------------------------------');
    console.log('Connection has been established successfully.');
    console.log('---------------------------------------------');
  })
  .catch(err => {
    console.log('---------------------------------------------');
    console.error('Unable to connect to the database:', err);
    console.log('---------------------------------------------');
  });

exports.Sequelize = sequelize;