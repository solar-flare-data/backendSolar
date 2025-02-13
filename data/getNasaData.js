const axios = require('axios');

const API_URL = 'https://api.nasa.gov/DONKI/FLR';
const API_KEY = 'DEMO_KEY';  // Получи свой ключ на https://api.nasa.gov/

const params = {
    startDate: '2024-02-01',
    endDate: '2024-02-08',
    api_key: API_KEY,
};

async function getData() {
    try {
        const response = await axios.get(API_URL, { params });
        
        if (response.status === 200) {
            console.log('✅ Данные успешно получены!');
            console.log(response.data);
        } else {
            console.log('❌ Ошибка запроса:', response.status);
        }
    } catch (error) {
        console.error('Ошибка при запросе данных:', error);
    }
}

getData();
