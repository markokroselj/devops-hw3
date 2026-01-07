const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "Location",
    {
      Location_ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      Location_name: DataTypes.STRING,
      Location_link: DataTypes.STRING(2048)
    },
    { tableName: "Location", timestamps: false }
  );
