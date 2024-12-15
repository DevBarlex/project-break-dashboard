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