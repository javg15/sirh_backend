module.exports = function(sequelize, DataTypes) {
    return sequelize.define('ejercicioreal', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        ejercicio: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        mes: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        capitulo: {
            type: DataTypes.STRING(4),
            allowNull: true
        },
        fuentef: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        importe: {
            type: DataTypes.DECIMAL(19, 4),
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
        },
        id_usuarios_r: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        sequelize,
        tableName: 'ejercicioreal',
        schema: 'public',
        //timestamps: false

        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
};