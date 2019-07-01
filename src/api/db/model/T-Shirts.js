const connection = require('../Connection');
const Sequelize = require('sequelize');

const Tshirt = connection.Sequelize.define('shirt', {
    
    product_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    description: {
        type: Sequelize.STRING(1000),
        allowNull: false
    },
    price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
    },
    discounted_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
    },
    image: {
        type: Sequelize.STRING(150)
    },
    image_2: {
        type: Sequelize.STRING(150)
    },
    thumbnail: {
        type: Sequelize.STRING(150)
    },
    display: {
        type: Sequelize.BIGINT(6)
    }
}, {
    timestamps: true,
    freezeTableName: true,
    tableName: 'product'
});

module.exports = Tshirt;