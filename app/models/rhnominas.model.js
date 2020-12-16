module.exports = function(sequelize, DataTypes) {
    return sequelize.define('rhnominas', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        quincenapago: {
            type: DataTypes.DECIMAL(19, 4),
            allowNull: false
        },
        numemp: {
            type: DataTypes.STRING(5),
            allowNull: false
        },
        nombreempleado: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        fechingcobaev: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        antiguedad: {
            type: DataTypes.STRING(25),
            allowNull: false
        },
        clavecategoria: {
            type: DataTypes.STRING(3),
            allowNull: false
        },
        desccategoria: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        claveplantel: {
            type: DataTypes.STRING(3),
            allowNull: false
        },
        descplantel: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        clavect: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        nombrect: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        idqnavigini: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idqnavigfin: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        qnainicio: {
            type: DataTypes.STRING(6),
            allowNull: false
        },
        qnafin: {
            type: DataTypes.STRING(6),
            allowNull: false
        },
        id_esquemapago: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        esquemapago: {
            type: DataTypes.STRING(3),
            allowNull: false
        },
        permensualneto: {
            type: DataTypes.DECIMAL(19, 4),
            allowNull: false
        },
        dedmensualneto: {
            type: DataTypes.DECIMAL(19, 4),
            allowNull: false
        },
        totmensualneto: {
            type: DataTypes.DECIMAL(19, 4),
            allowNull: false
        },
        compensacion: {
            type: DataTypes.DECIMAL(19, 4),
            allowNull: false
        },
        percquinbruto: {
            type: DataTypes.DECIMAL(19, 4),
            allowNull: false
        },
        deduquinbruto: {
            type: DataTypes.DECIMAL(19, 4),
            allowNull: false
        },
        totquinbruto: {
            type: DataTypes.DECIMAL(19, 4),
            allowNull: false
        },
        totmnbruto: {
            type: DataTypes.DECIMAL(19, 4),
            allowNull: false
        },
        id_sindicato: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        siglassindicato: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
        id_tipoemp: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tipoempleado: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        id_empfuncion: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        empfuncion: {
            type: DataTypes.STRING(35),
            allowNull: false
        },
        id_funcionpri: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        funcionpri: {
            type: DataTypes.STRING(35),
            allowNull: false
        },
        id_funcionsec: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        funcionsec: {
            type: DataTypes.STRING(60),
            allowNull: false
        },
        clavemotgralbaja: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        desmotgralbaja: {
            type: DataTypes.STRING(75),
            allowNull: false
        },
        interinopuro: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        orden: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        verificado: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        observaciones: {
            type: DataTypes.STRING(1000),
            allowNull: true
        },
        compensacionpa: {
            type: DataTypes.DECIMAL(19, 4),
            allowNull: true
        },
        rfc: {
            type: DataTypes.STRING(15),
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
        }
    }, {
        sequelize,
        tableName: 'rhnominas',
        schema: 'public',
        //timestamps: false

        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
};