let realTime = new Date();

//Time
function formatHour(time) {
  let hours = time.getHours();

  if (hours < 10) {
    hours = "0".concat(hours);
  }

  let minutes = time.getMinutes();

  if (minutes < 10) {
    minutes = "0".concat(minutes);
  }

  let fullTime = `${hours}:${minutes}`;

  return fullTime;
}

let time = document.querySelector(".time");
time.innerHTML = formatHour(realTime);

//Date
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentDate = date.getDate();
  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentYear = date.getFullYear();

  let currentTime = `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear} `;
  return currentTime;
}

let date = document.querySelector(".day");
date.innerHTML = formatDate(realTime);

function capitalize(string) {
  string = string.trim();
  string = string.toLowerCase();
  return string.charAt(0).toUpperCase() + string.slice(1);
}

let apiKey = "e7ffbf355c2e98858999daa19a646cff";

function showCurrentWeather(response) {
  let currentTemperature = document.querySelector(".actual-temp");
  let h1 = document.querySelector("#city");
  let humidity = document.querySelector("#weather-humidity");
  let windSpeed = document.querySelector("#weather-wind-speed");
  let description = document.querySelector(".justification");
  let icon = document.querySelector("#actual-icon");

  celciusTemperature = response.data.main.temp;

  currentTemperature.innerHTML = `${Math.round(celciusTemperature)}`;
  h1.innerHTML = `${response.data.name}`;
  humidity.innerHTML = `${response.data.main.humidity}%`;
  windSpeed.innerHTML = `${response.data.wind.speed} m/s`;
  description.innerHTML = `${capitalize(response.data.weather[0].description)}`;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
}

/* function showDailyWeather(response) {
  let maxTemp = document.querySelector("#upper-temp");
  maxTemp.innerHTML = `${Math.round(response.data.list.temp.max)}°`;
  let minTemp = document.querySelector("#lower-temp");
  minTemp.innerHTML = `${Math.round(response.data.list.temp.min)}°`;
} */

let initialUrl = `https://api.openweathermap.org/data/2.5/weather?q=hanoi&units=metric&appid=${apiKey}`;
axios.get(initialUrl).then(showCurrentWeather);

function searchNewLocation(event) {
  event.preventDefault();
  let locationInput = document.querySelector("#search-term");
  let locationDisplay = document.querySelector("#city");
  let location = locationInput.value;
  let searchUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
  locationDisplay.innerHTML = `${capitalize(location)}`;
  axios.get(searchUrl).then(showCurrentWeather);
}

let city = document.querySelector("#location-form");
city.addEventListener("submit", searchNewLocation);

function showCurrentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showCurrentWeather);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);

//Convert temperature
function celciusConvert(event) {
  event.preventDefault();
  let celciusDisplay = document.querySelector(".actual-temp");
  fahrenheitLink.classList.remove("active");
  celciusLink.classList.add("active");
  celciusDisplay.innerHTML = Math.round(celciusTemperature);
}

function fahrenheitConvert(event) {
  event.preventDefault();
  let fahrenheitDisplay = document.querySelector(".actual-temp");
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  fahrenheitDisplay.innerHTML = Math.round((celciusTemperature * 9) / 5 + 32);
}

let celciusTemperature = null;

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", celciusConvert);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", fahrenheitConvert);
