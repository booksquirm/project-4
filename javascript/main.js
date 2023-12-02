const destinationInput = document.getElementById('destination');
const weatherForm = document.getElementById('weatherForm');
const weatherInfo = document.getElementById('weatherInfo');
const temperatureElement = document.getElementById('temperature');
const humidityElement = document.getElementById('humidity');
const descriptionElement = document.getElementById('description');
const weatherIconElement = document.getElementById('weatherIcon');

const apiKey = '45174e86928d73e305616c618c6380e8';

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const destination = destinationInput.value;

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=paris&appid=45174e86928d73e305616c618c6380e8`)
        .then(response => response.json())
        .then(data => {
            const weatherData = data.main;
            const description = data.weather[0].description;
            const iconURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

            temperatureElement.textContent = `Temperature: ${weatherData.temp}°F`;
            humidityElement.textContent = `Humidity: ${weatherData.humidity}%`;
            descriptionElement.textContent = `Description: ${description}`;
            weatherIconElement.src = iconURL;
            console.log(weatherData.temp);


        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Unable to retrieve weather information. Please try again later.');
        });
});
