/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('gruposclase', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        grupo: {
            type: DataTypes.STRING(3),
            allowNull: true
        },
        tiposemestre: {
            type: DataTypes.STRING(1),
            allowNull: true
        },
        letragrupo: {
            type: DataTypes.STRING(1),
            allowNull: true
        },
        programauna: {
            type: DataTypes.SMALLINT,
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
        tableName: 'gruposclase',
        //timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
};