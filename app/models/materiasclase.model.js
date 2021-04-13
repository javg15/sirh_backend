/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('materiasclase', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        clave: {
            type: DataTypes.STRING(4),
            allowNull: true
        },
        nombre: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        horas: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        tipo: {
            type: DataTypes.STRING(1),
            allowNull: true
        },
        estatus: {
            type: DataTypes.STRING(1),
            allowNull: true
        },
        tipo2: {
            type: DataTypes.STRING(1),
            allowNull: true
        },
        tiposemestre: {
            type: DataTypes.STRING(1),
            allowNull: true
        },
        nogrupo: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        capacitacion: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        idcapacitacion: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        semestre: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        activa: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        claveasignatura: {
            type: DataTypes.STRING(8),
            allowNull: true
        },
        descarga: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        mapacurricular: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        programauna: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        claveoficial: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        idmateria2: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        apoyoeducacion: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        paraescolar: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        idgrupodisciplinario: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        bachgeneral: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        emsad: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        bachgeneralarte: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        id_semestre_ini: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_semestre_fin: {
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
        fechacaptura: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        incluirb: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        incluira: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        permitemodifhorasmateria: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        posicionenmapacur: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        tratarcomoformbasica: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        idcampodisc: {
            type: DataTypes.STRING(4),
            allowNull: true
        },
        idgpodisc: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        formdiscbasicaartes: {
            type: DataTypes.STRING(4),
            allowNull: true
        },
        id_personal_r: {
            type: DataTypes.INTEGER,
            allowNull: true
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
        tableName: 'materiasclase',
        //timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
};