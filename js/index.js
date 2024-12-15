//Código de Reloj

function updateClock() {
    const now = new Date();
    
    // Obtener horas, minutos y segundos
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    
    // Formatear la hora con ceros a la izquierda si es necesario
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    
    // Mostrar la hora en el formato HH:MM:SS
    const timeElement = document.getElementById('time');
    timeElement.textContent = `${hours}:${minutes}:${seconds}`;
    
    // Obtener día, mes y año
    const day = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();
    const month = (now.getMonth() + 1) < 10 ? '0' + (now.getMonth() + 1) : (now.getMonth() + 1);
    const year = now.getFullYear();
    
    // Mostrar la fecha en formato DD/MM/AAAA
    const dateElement = document.getElementById('date');
    dateElement.textContent = `${day}/${month}/${year}`;
    
    // Mensajes según la hora del día
    let message = '';
    const hour = now.getHours();
    
    if (hour >= 0 && hour < 7) {
        message = 'Es hora de descansar. Apaga y sigue mañana';
    } else if (hour >= 7 && hour < 12) {
        message = 'Buenos días, desayuna fuerte y a darle al código';
    } else if (hour >= 12 && hour < 14) {
        message = 'Echa un rato más pero no olvides comer';
    } else if (hour >= 14 && hour < 16) {
        message = 'Espero que hayas comido';
    } else if (hour >= 16 && hour < 18) {
        message = 'Buenas tardes, el último empujón';
    } else if (hour >= 18 && hour < 22) {
        message = 'Esto ya son horas extras, ... piensa en parar pronto';
    } else if (hour >= 22 && hour < 24) {
        message = 'Buenas noches, es hora de pensar en parar y descansar';
    }
    
    // Mostrar el mensaje
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
}

// Actualizar el reloj cada segundo
setInterval(updateClock, 1000);

// Llamar una vez para inicializar la vista inmediatamente
updateClock();






//Código de Generador de contraseñas

const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercase = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()-_=+";

function getRandomCharacter(characters) {
    return characters[Math.floor(Math.random() * characters.length)];
}

function generatePassword() {
    const lengthInput = document.getElementById('length');
    const passwordLength = parseInt(lengthInput.value);
    
    if (passwordLength < 12 || passwordLength > 50) {
        alert('La longitud de la contraseña debe estar entre 12 y 50 caracteres.');
        return;
    }
    
    let allCharacters = uppercase + lowercase + numbers + symbols;
    let password = '';
    
    
    password += getRandomCharacter(uppercase);
    password += getRandomCharacter(lowercase);
    password += getRandomCharacter(numbers);
    password += getRandomCharacter(symbols);
    
    
    for (let i = 4; i < passwordLength; i++) {
        password += getRandomCharacter(allCharacters);
    }
    
    // Mezclar la contraseña para que los caracteres no sigan un patrón
    password = password.split('').sort(() => Math.random() - 0.5).join('');
    
    const passwordElement = document.getElementById('password');
    passwordElement.textContent = `Contraseña generada: ${password}`;
}





//Código de Links

const linksListElement = document.getElementById('linksList');

function loadLinks() {
    const links = JSON.parse(localStorage.getItem('links')) || [];
    links.forEach(link => addLinkToDOM(link.title, link.url));
}

function addLink() {
    const titleInput = document.getElementById('linkTitle');
    const urlInput = document.getElementById('linkURL');
    const title = titleInput.value.trim();
    const url = urlInput.value.trim();
    
    if (!title || !url) {
        alert('Por favor, introduce un título y una URL válidos.');
        return;
    }
    
    addLinkToDOM(title, url);
    saveLinkToLocalStorage(title, url);
    titleInput.value = '';
    urlInput.value = '';
}

function addLinkToDOM(title, url) {
    const linkItem = document.createElement('div');
    linkItem.classList.add('link-item');
    
    const linkElement = document.createElement('a');
    linkElement.href = url;
    linkElement.textContent = title;
    linkElement.target = '_blank';
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.classList.add('delete-button');
    deleteButton.onclick = () => deleteLink(linkItem, title, url);
    
    linkItem.appendChild(linkElement);
    linkItem.appendChild(deleteButton);
    linksListElement.appendChild(linkItem);
}

function saveLinkToLocalStorage(title, url) {
    const links = JSON.parse(localStorage.getItem('links')) || [];
    links.push({ title, url });
    localStorage.setItem('links', JSON.stringify(links));
}

function deleteLink(linkElement, title, url) {
    linksListElement.removeChild(linkElement);
    const links = JSON.parse(localStorage.getItem('links')) || [];
    const updatedLinks = links.filter(link => link.title !== title || link.url !== url);
    localStorage.setItem('links', JSON.stringify(updatedLinks));
}

// Cargar links al cargar la página
loadLinks();







//Código de Tiempo

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





//Código de Fondo Random

const imagesb= [
    'assets/images/178006-pikachu-ambiente-morado-naturaleza-caricatura-1280x720.jpg',
    'assets/images/gengar-pictures-14klqsqxk3lgm3nz.jpg',
    'assets/images/gengar-pictures-cklwpeqgoc8065xy.jpg',
    'assets/images/ghost-pokemon-1280-x-1024-62w6z0xtq0p653nw.jpg',
    'assets/images/ghost-pokemon-1920-x-1080-ubqzyzg9u17cacns.jpg',
    'assets/imagess/ghost-pokemon-1920-x-1080-wek8xbydv35ydsah.jpg',
    'assets/images/ghost-pokemon-2269-x-921-heocx88hh0k2u8n8.jpg',
    'assets/images/pokemon-background-2pr9r8a4htrsxtrg.jpg',
    'assets/images/pokemon-go-6vcejuniflcjzwmu.jpg',
    'assets/images/3-33589_m.jpg',
];

function changeBackgroundImage() {
    const randomIndex = Math.floor(Math.random() * imagesb.length);
    document.body.style.backgroundImage = `url('${imagesb[randomIndex]}')`;
}

// Cambia la imagen de fondo al cargar la página
changeBackgroundImage();

// Cambia la imagen de fondo cada 15 segundos (15000 ms)
setInterval(changeBackgroundImage, 15000);