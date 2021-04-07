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
  
    let currentDay = days[date.getDay()];

  return `${currentDay} ${formatHours(timestamp)}`;
}

function formatHours (timestamp) {
  let date = new Date (timestamp);

      let currentHour = date.getHours();
    if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
    let currentMinutes = date.getMinutes();
    if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  return `${currentHour}:${currentMinutes}`
}

function displayWeather(response) {
    let currentCity = document.querySelector("#city");
    let currentTemp = document.querySelector("#temp");
    let currentMinTemp = document.querySelector("#minTemp");
    let currentCond = document.querySelector("#conditions");
    let currentHumidity = document.querySelector("#humidity");
    let currentWind = document.querySelector("#wind");
    let iconElement = document.querySelector("#icon");
    let sunrise = document.querySelector("#sunrise");
    let sunset = document.querySelector("#sunset");
    let feelTemp = document.querySelector("#feelsLike")
    console.log(response.data)

     celsiusTemp = response.data.main.temp;

    feelTemp.innerHTML = `<i>Feels Like ${Math.round(response.data.main.feels_like)}°</i>`;
    currentCity.innerHTML = response.data.name; 
    currentTemp.innerHTML = Math.round(celsiusTemp);
    currentMinTemp.innerHTML = `Low of ${Math.round(response.data.main.temp_min)}`;
    currentCond.innerHTML = response.data.weather[0].description;
    currentHumidity.innerHTML = response.data.main.humidity;
    currentWind.innerHTML = Math.round(response.data.wind.speed);
    timeDate.innexrHTML = formatDate(response.data.dt * 1000).bold();
    iconElement.setAttribute ( "src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`) 
    iconElement.setAttribute ("alt", response.data.weather[0].description)
    sunrise.innerHTML = formatHours(response.data.sys.sunrise * 1000);
    sunset.innerHTML = formatHours(response.data.sys.sunset * 1000);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#futurecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 5 ; index++) {
   forecast = response.data.list[index];
  forecastElement.innerHTML += `
  
  <div id = "forecast" class="col-2 text-center">
  
               <h3>
                ${formatHours(forecast.dt * 1000)}
           
            <img 
            class="w-100"
            src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" 
            alt="">
            <span class="forecast-temp"><strong>${Math.round(forecast.main.temp_max)}</span>
            °<span class="future-unit">c
            </span>
            </strong>
            </h3>
            </div>`
  }         
}

 
function searchCity(city){
    let apiKey = "26fb0e2935bcdd02eddacbda042238e7";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);  

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);  

}
function search(event){
    event.preventDefault();
    let city = document.querySelector("#location-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "aed21243ee272b8cf9bddb7df0466769";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  let forecastMax = document.querySelectorAll(".forecast-temp");
  forecastMax.forEach(function (item) {
    let currentTemp = item.innerHTML;
    item.innerHTML = Math.round((currentTemp * 9) / 5 + 32);
  });

  celsiusLink.addEventListener("click", convertToCelsius);
  fahrenheitLink.removeEventListener("click", convertToFahrenheit);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
  let forecastMax = document.querySelectorAll(".forecast-temp");
  forecastMax.forEach(function (item) {
    let currentTemp = item.innerHTML;
    item.innerHTML = Math.round(((currentTemp - 32) * 5) / 9);
  });
  celsiusLink.removeEventListener("click", changeToCelsius);
  fahrenheitLink.addEventListener("click", changeTofahrenheit);
}

let celsiusTemp = null; 

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let form = document.querySelector("#searchForm");
form.addEventListener("submit", search);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertToCelsius)


searchCity("Boston");


