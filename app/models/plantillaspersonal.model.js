/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('plantillaspersonal', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        id_catplanteles: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        id_personal: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        id_catplantillas: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        consecutivo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        id_usuarios_autoriza: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        fechaingreso: {
            type: DataTypes.DATEONLY,
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
            allowNull: true,
        }
    }, {
        sequelize,
        tableName: 'plantillaspersonal',
        schema: 'public',
        //timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
};