/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('plantillasdocsnombramiento', {
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
        id_catestatusplaza: {
            type: DataTypes.SMALLINT,
            allowNull: true
        },
        id_plazas: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        fechaini: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        fechafin: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        id_personal_titular: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        horas: {
            type: DataTypes.SMALLINT,
            allowNull: true
        },
        horasb: {
            type: DataTypes.SMALLINT,
            allowNull: true
        },
        id_categorias: {
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
        id_catquincena_ini: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        id_catquincena_fin: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        id_catbajamotivo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        id_catfuncionprimaria: {
            type: DataTypes.SMALLINT,
            allowNull: true
        },
        id_catfuncionsecundaria: {
            type: DataTypes.SMALLINT,
            allowNull: true
        },
        id_catplanteles: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        id_catcentrostrabajo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        id_cattipoocupacion: {
            type: DataTypes.SMALLINT,
            allowNull: true
        },
        id_cattiposemestre: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_catesquemapago: {
            type: DataTypes.SMALLINT,
            allowNull: true,
            defaultValue: 0
        },
        esplazabase: {
            type: DataTypes.SMALLINT,
            allowNull: true,
            defaultValue: 0
        },

        id_catplanteles_aplicacion: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
    }, {
        sequelize,
        tableName: 'plantillasdocsnombramiento',
        schema: 'public',
        //timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
};