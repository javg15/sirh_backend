/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('plantillasdocsfamiliares', {
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
    curp: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    rfc: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    homoclave: {
      type: DataTypes.STRING(3),
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING(70),
      allowNull: false
    },
    apellidopaterno: {
      type: DataTypes.STRING(70),
      allowNull: false
    },
    apellidomaterno: {
      type: DataTypes.STRING(70),
      allowNull: false
    },
    fechanacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    sexo: {
      type: DataTypes.CHAR(1),
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
    tableName: 'plantillasdocsfamiliares',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "plantillasdocsfamiliares_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
