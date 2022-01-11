/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('personalsindicato', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        id_personal: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        id_archivos: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_catsindicato: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        fechainscripcion: {
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
            allowNull: true
        }
    }, {
        sequelize,
        tableName: 'personalsindicato',
        schema: 'public',
        //timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
};