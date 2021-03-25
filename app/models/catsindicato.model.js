/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('catsindicato', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        siglas: {
            type: DataTypes.STRING(15),
            allowNull: true
        },
        fechacreacion: {
            type: DataTypes.DATEONLY,
            allowNull: true
        }
    }, {
        sequelize,
        tableName: 'catsindicato',
        schema: 'public',
        timestamps: false
    });
};