/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('catfuncionplantilla', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        puesto: {
            type: DataTypes.CHAR(50),
            allowNull: true
        },
        id_catplantillas: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        sequelize,
        tableName: 'catfuncionplantilla',
        schema: 'public',
        timestamps: false
    });
};