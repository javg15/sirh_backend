const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('personalestudios', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        id_catestudioscarreras: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_personal: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_catestudiosniveles: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        titulado: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        siglasini: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        incompleta: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cursando: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        numcedprof: {
            type: DataTypes.STRING(50),
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
        id_archivos: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
    }, {
        sequelize,
        tableName: 'personalestudios',
        schema: 'public',
        //timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
};