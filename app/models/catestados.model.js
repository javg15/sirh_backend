module.exports = function(sequelize, DataTypes) {
    return sequelize.define('catestados', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        clave: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: true
        },
        clave_curp: {
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
        tableName: 'catestados',
        schema: 'public',
        //timestamps: false

        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
};