/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('plantillasdocsnombramiento', {
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
    fechaexpedicion: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    tipo: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    fechaini: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    fechafin: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    id_personal_titular: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    horas: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    id_categorias: {
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
    tableName: 'plantillasdocsnombramiento',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "plantillasdocsnombramiento_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
