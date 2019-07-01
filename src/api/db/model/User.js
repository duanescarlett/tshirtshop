const connection = require('../Connection');
const Sequelize = require('sequelize');

const User = connection.Sequelize.define('user', {
    
    name: {
        type: Sequelize.STRING(50)
    },
    username: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    credit_card: {
        type: Sequelize.STRING(50)
    },
    address_1: {
        type: Sequelize.STRING(100)
    },
    address_2: {
        type: Sequelize.STRING(100)
    },
    city: {
        type: Sequelize.STRING(100)
    },
    region: {
        type: Sequelize.STRING(100)
    },
    postal_code: {
        type: Sequelize.STRING(100)
    },
    country: {
        type: Sequelize.STRING(100)
    },
    shipping_region_id: {
        type: Sequelize.INTEGER
    },
    day_phone: {
        type: Sequelize.STRING(100)
    },
    eve_phone: {
        type: Sequelize.STRING(100)
    },
    mob_phone: {
        type: Sequelize.STRING(100)
    }
}, {
    timestamps: true,
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'customer'
});

module.exports = User;