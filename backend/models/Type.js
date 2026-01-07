const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "Type",
    {
      Type_ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      Type: DataTypes.STRING(25)
    },
    { tableName: "Type", timestamps: false }
  );
