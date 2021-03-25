/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('catfuncionsecundaria', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        clave: {
            type: DataTypes.CHAR(2),
            allowNull: true
        },
        nombre: {
            type: DataTypes.CHAR(50),
            allowNull: true
        }
    }, {
        sequelize,
        tableName: 'catfuncionsecundaria',
        schema: 'public',
        timestamps: false
    });
};