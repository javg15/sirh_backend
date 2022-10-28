/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('plazasnombramientos', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        id_plazas: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        id_catestatusplaza: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_plantillasdocsnombramiento_vigente: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_plantillaspersonal: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_plazas_sql: {
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
        },
    }, {
        sequelize,
        tableName: 'plazasnombramientos',
        schema: 'public',
        //timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
};