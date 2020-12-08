module.exports = (sequelize, DataTypes) => {
    const Catzonaeconomica = sequelize.define('catzonaeconomica', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        ClaveZonaEco: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        PorcentajeZonaEco: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        state: {
            type: DataTypes.CHAR(1),
            allowNull: true,
            defaultValue: "A"
        },
        DescZonaEco: {
            type: DataTypes.STRING,
            allowNull: true
        },
        DescZonaEco2: {
            type: DataTypes.STRING,
            allowNull: true
        },
        idUsuariosR: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        sequelize,
        tableName: 'catzonaeconomica',
        schema: 'public',
        //timestamps: false

        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
    return Catzonaeconomica;
};