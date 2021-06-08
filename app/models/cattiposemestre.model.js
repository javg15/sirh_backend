/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cattiposemestre', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    descripcion: {
      type: DataTypes.CHAR(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'cattiposemestre',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "cattiposemestre_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
