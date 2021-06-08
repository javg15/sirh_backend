/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('catfuncionprimaria', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    clave: {
      type: DataTypes.CHAR(2),
      allowNull: true
    },
    nombre: {
      type: DataTypes.CHAR(50),
      allowNull: true
    },
    idempfuncion: {
      type: DataTypes.SMALLINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'catfuncionprimaria',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "catfuncionprimaria_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
