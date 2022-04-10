let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  moscow: {
    temp: -5,
    humidity: 20,
  },
};

console.log(weather);

let city = prompt("Enter a city");
city = city.trim();
city = city.toLowerCase();

if (weather[city] === undefined) {
  alert(
    `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
  );
} else {
  let celcius = Math.round(weather[city].temp);
  let fahrenheit = Math.round(celcius * 1.8 + 32);
  let humidity = weather[city].humidity;

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  city = capitalize(city);

  alert(
    `It is currently ${celcius}°C (${fahrenheit}°F) in ${city} with a humidity of ${humidity}%.`
  );
}
