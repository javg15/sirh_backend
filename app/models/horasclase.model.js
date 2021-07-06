/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('horasclase', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        id_catplanteles: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_materiasclase: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        horas: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        horaestatus: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_gruposclase: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        frenteagrupo: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_cattipohorasdocente: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_cattiposemestre: {
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
        tableName: 'horasclase',
        schema: 'public',
        timestamps: false,
        indexes: [{
            name: "horasclase_pkey",
            unique: true,
            fields: [
                { name: "id" },
            ]
        }, ]
    });
};