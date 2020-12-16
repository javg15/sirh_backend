module.exports = function(sequelize, DataTypes) {
    return sequelize.define('estudios', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        numemp: {
            type: DataTypes.STRING(5),
            allowNull: true
        },
        desccarrera: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        descnivel: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        titulado: {
            type: DataTypes.STRING(100),
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
        tableName: 'estudios',
        schema: 'public',
        //timestamps: false

        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
};