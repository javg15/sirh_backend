/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('catbajamotivo', {
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
      type: DataTypes.STRING(100),
      allowNull: true
    },
    clavebajaissste: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_catquincena: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    motivodefault: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    permitemovimientoposterior: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    puedeimplicarbajacargahoraria: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    pedirbajaparaissste: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    generamovanteissste: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    checarinterinatopuro: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    textoetiquetabaja: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'catbajamotivo',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "catbajamotivo_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
