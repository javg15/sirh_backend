/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('plantillasdocslicencias', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_plantillaspersonal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    id_archivos: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    folio: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    fechainicio: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    fechatermino: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    fechaingreso: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    diagnostico: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    tipo: {
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
    }
  }, {
    sequelize,
    tableName: 'plantillasdocslicencias',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "plantillasdocslicencias_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
