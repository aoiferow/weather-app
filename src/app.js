function formatDate (timestamp) {
    let date = new Date (timestamp);
    
    let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

    let currentHour = date.getHours();
    if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
    let currentMinutes = date.getMinutes();
    if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
    let currentDay = days[date.getDay()];
    



  let formattedDate = `${currentDay} ${currentHour}:${currentMinutes}`;

  return formattedDate;
}

function displayWeather(response) {
    let currentCity = document.querySelector("#city");
    let currentTemp = document.querySelector("#temp");
    let currentCond = document.querySelector("#conditions");
    let currentHumidity = document.querySelector("#humidity");
    let currentWind = document.querySelector("#wind");
    currentCity.innerHTML = response.data.name; 
    currentTemp.innerHTML = Math.round(response.data.main.temp);
    currentCond.innerHTML = response.data.weather[0].description;
    currentHumidity.innerHTML = response.data.main.humidity;
    currentWind.innerHTML = Math.round(response.data.wind.speed);
    timeDate.innerHTML = formatDate(response.data.dt * 1000).bold();
}

let apiKey = "26fb0e2935bcdd02eddacbda042238e7";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayWeather);


