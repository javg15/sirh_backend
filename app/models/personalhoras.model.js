/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('personalhoras', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        id_personal: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_catplanteles: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_gruposclase: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_materiasclase: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_cattipohorasmateria: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_catnombramientos: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_semestre: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_catestatushora: {
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
        horassueltas: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_cattipohorasdocente: {
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
        frenteagrupo: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_catplanteles_aplicacion: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
    }, {
        sequelize,
        tableName: 'personalhoras',
        schema: 'public',
        //timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
};