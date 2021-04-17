module.exports = function(sequelize, DataTypes) {
    return sequelize.define('cattipocategoria', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: true
        },
        paratipificarcategoria: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        desctipoplaza: {
            type: DataTypes.STRING,
            allowNull: true
        },
        id_catplantillas: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        orden: {
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
        tableName: 'cattipocategoria',
        schema: 'public',
        //timestamps: false

        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
};