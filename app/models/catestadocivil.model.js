/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('catestadocivil', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: true
        },
        sexo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        abreviatura: {
            type: DataTypes.STRING,
            allowNull: true
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        id_usuarios_r: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        sequelize,
        tableName: 'catestadocivil',
        schema: 'public',
        //timestamps: false
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
};