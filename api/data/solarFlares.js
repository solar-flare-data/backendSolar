// solarFlares.js
const express = require("express");
const axios = require("axios");
const cron = require("node-cron");

const router = express.Router();
const API_URL = "https://api.nasa.gov/DONKI/FLR";
const API_KEY = "DEMO_KEY";

const params = {
  startDate: "2024-02-01",
  endDate: "2024-02-08",
  api_key: API_KEY,
};

let solarData = [];

const getData = async () => {
  try {
    const response = await axios.get(API_URL, { params });

    if (response.status === 200) {
      console.log("✅ Данные успешно получены!");
      solarData = response.data;
    } else {
      console.log("❌ Ошибка запроса:", response.status);
    }
  } catch (error) {
    console.error("Ошибка при запросе данных:", error);
  }
};

router.get("/data", (req, res) => {
  if (solarData.length > 0) {
    res.json(solarData);
  } else {
    res.status(500).send("Данные еще не загружены");
  }
});

cron.schedule("0 0 */3 * *", getData);

getData(); // Запуск при старте приложения

module.exports = router;
