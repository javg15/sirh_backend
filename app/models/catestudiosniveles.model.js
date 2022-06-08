/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('catestudiosniveles', {
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
            type: DataTypes.STRING(200),
            allowNull: true
        },
        porunicavez: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        requieretitulacion: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        id_catestudiostipo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        permiteabrevprof: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
    }, {
        sequelize,
        tableName: 'catestudiosniveles',
        schema: 'public',
    });
};