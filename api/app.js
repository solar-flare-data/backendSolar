const express = require("express");
const axios = require("axios");
const cron = require("node-cron");

const app = express();
const port = 3000;

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

app.get("/solar-flare-data", (req, res) => {
  if (solarData.length > 0) {
    res.json(solarData);
  } else {
    res.status(500).send("Данные еще не загружены");
  }
});

cron.schedule("0 0 */3 * *", getData);

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
  getData();
});
