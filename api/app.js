const express = require("express");
const cors = require("cors");
const solarFlareData = require("./data/solarFlares");
const satelliteData = require("./data/satellites");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use("/solar-flare", solarFlareData); // Маршрут для солнечных вспышек
app.use("/satellites", satelliteData); // Маршрут для спутников

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
