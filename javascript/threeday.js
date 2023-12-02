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

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${destination}&appid=${apiKey}&units=imperial`)
        .then(response => response.json())
        .then(data => {
            const weatherData = data.list;
            weatherData.forEach((period) => console.log(period.main.temp));
            weatherData.forEach((period) => {
                const newPeriod = document.createElement("div");
                const periodDatetime = document.createTextNode(period.dt_txt);
                newPeriod.appendChild(periodDatetime);

                const newTemp = document.createElement("div");
                const periodTemp = document.createTextNode(period.main.temp);
                newTemp.appendChild(periodTemp);

                const newIcon = document.createElement("img");
                newIcon.src = `https://openweathermap.org/img/wn/${period.weather[0].icon}@2x.png`;

                weatherInfo.appendChild(newPeriod);
                weatherInfo.appendChild(newTemp);
                weatherInfo.appendChild(newIcon);
            });

        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Unable to retrieve weather information. Please try again later.');
        });
});
