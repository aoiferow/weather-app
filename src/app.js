function displayWeather(response) {
    console.log (response.data);
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
}

let apiKey = "26fb0e2935bcdd02eddacbda042238e7";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayWeather);
let now = new Date();

console.log(now);