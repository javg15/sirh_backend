/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('catplantillas', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        descripcion: {
            type: DataTypes.STRING(30),
            allowNull: true
        },
        abreviatura: {
            type: DataTypes.STRING(1),
            allowNull: true
        },
        id_usuarios_r: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        state: {
            type: DataTypes.CHAR(1),
            allowNull: false,
            defaultValue: "A"
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        sequelize,
        tableName: 'catplantillas',
        schema: 'public',
        //timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
};