module.exports = function(sequelize, DataTypes) {
    return sequelize.define('catcentrostrabajo', {
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
        descripcion: {
            type: DataTypes.STRING,
            allowNull: true
        },
        zona: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_tipoct: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true
        },
        id_catplanteles: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_qnaini: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_qnafin: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_ctant: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        titular: {
            type: DataTypes.STRING,
            allowNull: true
        },
        id_categoriaasoc: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        ficticia: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_tipoctpp: {
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
        id_usuarios_r: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        sequelize,
        tableName: 'catcentrostrabajo',
        schema: 'public',
        //timestamps: false

        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
};