require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { sequelize, Location, Type, Vehicle } = require("./models");

const app = express();
app.use(bodyParser.json());

const PORT = process.env.APP_PORT || 3000;

if (!process.env.DB_HOST || !process.env.DB_USERNAME) {
  throw new Error("Database configuration error: DB_HOST and DB_USERNAME must not be empty.");
}


app.get("/get-vehicles", async (req, res) => {
  const vehicles = await Vehicle.findAll({
    include: [Location, Type],
  });

  res.json(
    vehicles.map(v => ({
      id: v.Vehicle_ID,
      type: v.Type?.Type,
      name: v.Name,
      location: v.Location?.Location_name,
      location_link: v.Location?.Location_link
    }))
  );
});


app.get("/get-types", async (req, res) => {
  const types = await Type.findAll();
  res.json(types.map(t => ({ id: t.Type_ID, type: t.Type })));
});


app.get("/get-locations", async (req, res) => {
  const locations = await Location.findAll();
  res.json(
    locations.map(l => ({
      id: l.Location_ID,
      location: l.Location_name,
      location_link: l.Location_link
    }))
  );
});


app.get("/get/vehicle/:vehicle_id", async (req, res) => {
  const { vehicle_id } = req.params;
  const v = await Vehicle.findByPk(vehicle_id, { include: [Location, Type] });

  if (!v) return res.status(404).json({ error: "Vehicle not found" });

  res.json({
    id: v.Vehicle_ID,
    type: v.Type?.Type,
    name: v.Name,
    location: v.Location?.Location_name
  });
});


app.post("/add-vehicle", async (req, res) => {
  const { name, type_id, location_id } = req.body;

  if (!name || !type_id || !location_id)
    return res
      .status(400)
      .json({ error: "Fields 'name', 'type_id', and 'location_id' are required" });

  const typeEntry = await Type.findByPk(type_id);
  if (!typeEntry)
    return res.status(400).json({ error: `Type with ID ${type_id} not found` });

  const locationEntry = await Location.findByPk(location_id);
  if (!locationEntry)
    return res.status(400).json({ error: `Location with ID ${location_id} not found` });

  const newVehicle = await Vehicle.create({
    Name: name,
    Type_ID: type_id,
    Location_ID: location_id
  });

  res.status(201).json({
    id: newVehicle.Vehicle_ID,
    type_id,
    location_id,
    name
  });
});


app.delete("/delete-vehicle/:vehicle_id", async (req, res) => {
  const { vehicle_id } = req.params;
  const v = await Vehicle.findByPk(vehicle_id);

  if (!v) return res.status(404).json({ error: "Vehicle not found" });

  await v.destroy();
  res.json({ message: `Vehicle ${vehicle_id} deleted` });
});


app.delete("/delete-all-vehicles", async (req, res) => {
  const deleted = await Vehicle.destroy({ where: {}, truncate: false });
  res.json({ message: `Deleted ${deleted} vehicles` });
});


sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected.");
    return sequelize.sync(); 
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error("DB connection error:", err));
