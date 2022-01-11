/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('personalfamiliares', {
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
        id_catdocumentos: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        curp: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        rfc: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        homoclave: {
            type: DataTypes.STRING(3),
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING(70),
            allowNull: false
        },
        apellidopaterno: {
            type: DataTypes.STRING(70),
            allowNull: false
        },
        apellidomaterno: {
            type: DataTypes.STRING(70),
            allowNull: false
        },
        fechanacimiento: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        sexo: {
            type: DataTypes.INTEGER,
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
        tableName: 'personalfamiliares',
        schema: 'public',
        //timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
};