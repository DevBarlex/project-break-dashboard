const apiKey = '4e50a10104714406a70202105241512'; // Reemplaza con tu propia API KEY de WeatherAPI
const city = 'Madrid'; // Puedes cambiar la ciudad por la que prefieras

async function fetchWeatherData() {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1&aqi=no&alerts=no`);
        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        console.error('Error al obtener los datos del clima:', error);
    }
}

function displayWeatherData(data) {
    const locationElement = document.getElementById('location');
    const weatherConditionElement = document.getElementById('weatherCondition');
    const weatherIconElement = document.getElementById('weatherIcon');
    const temperatureElement = document.getElementById('temperature');
    const precipitationElement = document.getElementById('precipitation');
    const humidityElement = document.getElementById('humidity');
    const windElement = document.getElementById('wind');
    
    const location = `${data.location.name}, ${data.location.country}`;
    const condition = data.current.condition.text;
    const iconUrl = `https:${data.current.condition.icon}`;
    const temperature = `${data.current.temp_c} °C`;
    const precipitation = `${data.current.precip_mm} mm`;
    const humidity = `${data.current.humidity} %`;
    const wind = `${data.current.wind_kph}`;
    
    locationElement.textContent = location;
    weatherConditionElement.textContent = condition;
    weatherIconElement.src = iconUrl;
    temperatureElement.textContent = `Temperatura: ${temperature}`;
    precipitationElement.textContent = precipitation;
    humidityElement.textContent = humidity;
    windElement.textContent = wind;
    
    displayHourlyForecast(data.forecast.forecastday[0].hour);
}

function displayHourlyForecast(hourlyData) {
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = '';
    
    hourlyData.slice(0, 6).forEach(hour => {
        const forecastElement = document.createElement('div');
        forecastElement.classList.add('hourly-forecast');
        
        const time = document.createElement('p');
        time.textContent = hour.time.split(' ')[1]; // Muestra solo la hora (HH:MM)
        
        const icon = document.createElement('img');
        icon.src = `https:${hour.condition.icon}`;
        icon.alt = 'Icono del clima';
        
        const temp = document.createElement('p');
        temp.textContent = `${hour.temp_c} °C`;
        
        forecastElement.appendChild(time);
        forecastElement.appendChild(icon);
        forecastElement.appendChild(temp);
        forecastContainer.appendChild(forecastElement);
    });
}


fetchWeatherData();