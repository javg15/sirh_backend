/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('horasclasedetalle', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        id_horasclase: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_categorias: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        fecha_ini: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        fecha_fin: {
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
        tableName: 'horasclasedetalle',
        schema: 'public',
        timestamps: false,
        indexes: [{
            name: "horasclasedetalle_pkey",
            unique: true,
            fields: [
                { name: "id" },
            ]
        }, ]
    });
};