const { Sequelize } = require("sequelize");
const LocationModel = require("./Location");
const TypeModel = require("./Type");
const VehicleModel = require("./Vehicle");
const fs = require('fs');

const sequelize = new Sequelize(
  "vehicles_db",
  process.env.DB_USERNAME,
 fs.readFileSync(process.env.DB_PASSWORD_FILE, 'utf8').trim(),
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false
  }
);

// Initialize models
const Location = LocationModel(sequelize);
const Type = TypeModel(sequelize);
const Vehicle = VehicleModel(sequelize);

// Relations
Vehicle.belongsTo(Location, { foreignKey: "Location_ID" });
Vehicle.belongsTo(Type, { foreignKey: "Type_ID" });

module.exports = {
  sequelize,
  Location,
  Type,
  Vehicle
};
