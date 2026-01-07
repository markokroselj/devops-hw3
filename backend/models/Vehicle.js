const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "Vehicle",
    {
      Vehicle_ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      Location_ID: { type: DataTypes.INTEGER, allowNull: false },
      Type_ID: { type: DataTypes.INTEGER, allowNull: false },
      Name: DataTypes.STRING(20)
    },
    { tableName: "Vehicle", timestamps: false }
  );
