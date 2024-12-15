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