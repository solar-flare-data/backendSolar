const express = require("express");
const axios = require("axios");
const https = require("https");

const app = express();
const PORT = process.env.PORT || 5000;

const agent = new https.Agent({ rejectUnauthorized: false });

const parseTLELine1 = (line) => {
  const [
    satellite_number,
    classification,
    launch_year,
    launch_number,
    launch_piece,
    epoch_year,
    epoch_day,
    mean_motion_derivative,
    mean_motion_sec_derivative,
    bstar,
    ephemeris_type,
    element_number,
  ] = line.split(/\s+/);

  return {
    satellite_number,
    classification,
    launch_year,
    launch_number,
    launch_piece,
    epoch_year,
    epoch_day,
    mean_motion_derivative,
    mean_motion_sec_derivative,
    bstar,
    ephemeris_type,
    element_number,
  };
};

const parseTLELine2 = (line) => {
  const [
    inclination,
    raan,
    eccentricity,
    arg_perigee,
    mean_anomaly,
    mean_motion,
    rev_number,
  ] = line.split(/\s+/);

  return {
    inclination,
    raan,
    eccentricity,
    arg_perigee,
    mean_anomaly,
    mean_motion,
    rev_number,
  };
};

app.get("/satellites", async (req, res) => {
  try {
    const response = await axios.get(
      "http://www.celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=tle",
      { httpsAgent: agent }
    );

    const lines = response.data
      .split("\n")
      .filter((line) => line.trim() !== "");

    const satellites = [];

    for (let i = 0; i < lines.length; i += 3) {
      if (i + 2 < lines.length) {
        const name = lines[i].trim();
        const line1 = lines[i + 1].trim();
        const line2 = lines[i + 2].trim();

        const satelliteData = {
          name,
          line1: parseTLELine1(line1),
          line2: parseTLELine2(line2),
        };

        satellites.push(satelliteData);
      }
    }

    res.json(satellites); // Отправляем на клиент
  } catch (error) {
    console.error("Error fetching TLE data:", error);
    res.status(500).json({ message: "Error fetching satellite data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
