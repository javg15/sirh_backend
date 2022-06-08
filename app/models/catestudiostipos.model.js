/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('catestudiostipos', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        clave: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        descripcion: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        iniciales: {
            type: DataTypes.STRING(5),
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: 'catestudiostipos',
        schema: 'public',
    });
};