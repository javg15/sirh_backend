/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('horasclaseasignar', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        id_plantillaspersonal: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_horasclase: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_catquincena_ini: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_catquincena_fin: {
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
        tableName: 'horasclaseasignar',
        schema: 'public',
        timestamps: false,
        indexes: [{
            name: "horasclaseasignar_pkey",
            unique: true,
            fields: [
                { name: "id" },
            ]
        }, ]
    });
};