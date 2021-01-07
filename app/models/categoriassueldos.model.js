/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('categoriassueldos', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        clave: {
            type: DataTypes.STRING(5),
            allowNull: true
        },
        id_categorias: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        importe: {
            type: DataTypes.DECIMAL(19, 4),
            allowNull: true
        },
        fecha_inicio: {
            type: DataTypes.DATE,
            allowNull: true
        },
        fecha_fin: {
            type: DataTypes.DATE,
            allowNull: true
        },
        totalplazaaut: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        totalhorasaut: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_catzonaeconomica: {
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
        tableName: 'categoriassueldos',
        schema: 'public',
        timestamps: false,
        indexes: [{
            name: "categoriasautorizadas_pkey",
            unique: true,
            fields: [
                { name: "id" },
            ]
        }, ]
    });
};