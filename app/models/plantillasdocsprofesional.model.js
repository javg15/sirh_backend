/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('plantillasdocsprofesional', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        id_plantillaspersonal: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        id_archivos: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        fechaexpedicion: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        ultimogradoestudios: {
            type: DataTypes.SMALLINT,
            allowNull: true
        },
        areacarrera: {
            type: DataTypes.SMALLINT,
            allowNull: true
        },
        carrera: {
            type: DataTypes.SMALLINT,
            allowNull: true
        },
        estatus: {
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
        tableName: 'plantillasdocsprofesional',
        schema: 'public',
        //timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
};