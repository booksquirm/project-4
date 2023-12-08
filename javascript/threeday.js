const destinationInput = document.getElementById('destination');
const weatherForm = document.getElementById('weatherForm');
const weatherInfo = document.getElementById('weatherInfo');
const temperatureElement = document.getElementById('temperature');
const humidityElement = document.getElementById('humidity');
const descriptionElement = document.getElementById('description');
const weatherIconElement = document.getElementById('weatherIcon');

const apiKey = '45174e86928d73e305616c618c6380e8';

function convertMilitaryToStandard(militaryTime) {
    let hours = militaryTime.substring(0,2);
    let minutes = militaryTime.substring(3,5);
    let meridian = (hours >= 12) ? "PM" : "AM";
    let convertedTime = ((parseInt(hours) + 11) % 12 + 1) + ":" + minutes;
    return convertedTime + " " + meridian;
  };

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const destination = destinationInput.value;

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${destination}&appid=${apiKey}&units=imperial`)
        .then(response => response.json())
        .then(data => {
        weatherInfo.style.display = "block";

            const weatherData = data.list;
            weatherData.forEach((period) => {
                const newRow = document.createElement("tr");
                const date = new Date(period.dt_txt.split(" ")[0]).toDateString();
                const time = convertMilitaryToStandard(period.dt_txt.split(" ")[1]);

                const newDate = document.createElement("td");
                const periodDate = document.createTextNode(`${date}`);
                newDate.appendChild(periodDate);

                const newTime = document.createElement("td");
                const periodTime= document.createTextNode(`${time}`);
                newTime.appendChild(periodTime);

                const newTemp = document.createElement("td");
                const periodTemp = document.createTextNode(`${Math.round(period.main.temp)}°F`);
                newTemp.appendChild(periodTemp);

                const newIcon = document.createElement("img");
                newIcon.src = `https://openweathermap.org/img/wn/${period.weather[0].icon}@2x.png`;

                weatherInfo.appendChild(newRow);
                newRow.appendChild(newDate);
                newRow.appendChild(newTime);
                newRow.appendChild(newTemp);
                newRow.appendChild(newIcon);
            });

        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Unable to retrieve weather information. Please try again later.');
        });
});

