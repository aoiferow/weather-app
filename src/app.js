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
    let currentCond = document.querySelector("#conditions");
    let currentHumidity = document.querySelector("#humidity");
    let currentWind = document.querySelector("#wind");
    let iconElement = document.querySelector("#icon");

     celsiusTemp = response.data.main.temp;

    currentCity.innerHTML = response.data.name; 
    currentTemp.innerHTML = Math.round(celsiusTemp);
    currentCond.innerHTML = response.data.weather[0].description;
    currentHumidity.innerHTML = response.data.main.humidity;
    currentWind.innerHTML = Math.round(response.data.wind.speed);
    timeDate.innerHTML = formatDate(response.data.dt * 1000).bold();
    iconElement.setAttribute ( "src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`) 
    iconElement.setAttribute ("alt", response.data.weather[0].description)
}
function displayForecast(response) {
  let forecastElement = document.querySelector("#futurecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 5 ; index++) {
   forecast = response.data.list[index];
  forecastElement.innerHTML += `
  
  <div class="col-2">
  
               <h3>
                ${formatHours(forecast.dt * 1000)}
           
            <img 
            src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" 
            alt="">
            <strong>${Math.round(forecast.main.temp_max)}°c</strong>
            </h3>
            </div>
            </div>  `

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
  let fahrenheitTemperature = ((celsiusTemp * 9) / 5 + 32);
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
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