/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('semestre', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tipo: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    anio: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    quincena: {
      type: DataTypes.INTEGER,
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
    },
    qnainiciosemestre: {
      type: DataTypes.STRING(6),
      allowNull: true
    },
    qnafinsemestre: {
      type: DataTypes.STRING(6),
      allowNull: true
    },
    actual: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_catquincena_ini: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_catquincena_fin: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_catquincena_fininterinas: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    permitemodificacion: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    permitecargadeplantillas: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'semestre',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "semestre_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
