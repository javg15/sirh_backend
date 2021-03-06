module.exports = function(sequelize, DataTypes) {
    return sequelize.define('catestatusplaza', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        descripcion: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        clave: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        id_estatussig: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        strid_nombramiento: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        tipoocupplaza: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        convigencia: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        conlicencia: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        esinterina: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        esnombramiento: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        state: {
            type: DataTypes.CHAR(1),
            allowNull: false,
            defaultValue: "A"
        },
        id_usuarios_r: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        sequelize,
        tableName: 'catestatusplaza',
        schema: 'public',
        //timestamps: false

        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
};