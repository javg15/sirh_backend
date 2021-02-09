module.exports = function(sequelize, DataTypes) {
    return sequelize.define('categoriastabular', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        tipoplantel: {
            type: DataTypes.STRING,
            allowNull: true
        },
        id_categorias: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        state: {
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
        id_usuarios_r: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        sequelize,
        tableName: 'categoriastabular',
        schema: 'public',
        //timestamps: false

        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
};