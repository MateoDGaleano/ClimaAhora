const APP_ID = '705609ad9494a57c2a15f8a1286d7caa';

const fetchData = position => {
    const { latitude, longitude } = position.coords;
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${APP_ID}`)
        .then(response => response.json())
        .then(data => setWeatherData(data))

}

const setWeatherData = data => {
    const weatherData = {
        location: data.name,
        descripción: data.weather[0].main,
        humidity: data.main.humidity + "%",
        temperature: Math.floor(data.main.temp) + "ºC",
        date: getDate(),
    }

    Object.keys(weatherData).forEach(key => {
        document.getElementById(key).textContent = weatherData[key];
    });

    cleanUp()
}
const cleanUp = () => {
    let container = document.getElementById('container');
    let loader = document.getElementById('loader');

    loader.style.display = 'none'; 
    container.style.display = 'flex'; 
}

const getDate = () => {
    let date = new Date();
    return `${date.getDate()}-${ ('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
}

const onload = () => {
    navigator.geolocation.getCurrentPosition(fetchData);

}

