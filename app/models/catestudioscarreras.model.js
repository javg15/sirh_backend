/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('catestudioscarreras', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        clave: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        descripcion: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        id_catestudiostipos: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        id_catestudiosramas: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        id_catestudiosniveles: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        siglas: {
            type: DataTypes.CHAR(10),
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: 'catestudioscarreras',
        schema: 'public',
    });
};