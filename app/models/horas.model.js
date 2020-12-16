module.exports = function(sequelize, DataTypes) {
    return sequelize.define('horas', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        numemp: {
            type: DataTypes.STRING(5),
            allowNull: false
        },
        claveplantel: {
            type: DataTypes.STRING(3),
            allowNull: true
        },
        descplantel: {
            type: DataTypes.STRING(150),
            allowNull: true
        },
        clavemateria: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        nombremateria: {
            type: DataTypes.STRING(150),
            allowNull: true
        },
        grupo: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        tipohora: {
            type: DataTypes.STRING(5),
            allowNull: true
        },
        desccategoria: {
            type: DataTypes.STRING(35),
            allowNull: true
        },
        abrevnombramiento: {
            type: DataTypes.STRING(5),
            allowNull: true
        },
        descnombramiento: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        titular: {
            type: DataTypes.STRING(150),
            allowNull: true
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        totalhoras: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        estudios: {
            type: DataTypes.STRING,
            allowNull: true
        },
        idhora: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        verificado: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        observaciones: {
            type: DataTypes.STRING,
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
        tableName: 'usuarios',
        schema: 'public',
        //timestamps: false

        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
};