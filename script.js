const API_KEY = "5d9ea7288d824e3ebe1104749262909";

const form = document.getElementById("weatherForm");
const input = form.querySelector("input");

const loading = document.getElementById("loading");
const error = document.getElementById("error");
const weatherResult = document.getElementById("weatherResult");

const cityName = document.getElementById("cityName");
const countryName = document.getElementById("countryName");
const weatherIcon = document.getElementById("weatherIcon");

const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

async function getWeather(city) {
	loading.classList.remove("hidden");
	error.classList.add("hidden");
	weatherResult.classList.add("hidden");

	try {
		const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=yes`;
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error("City not found or API error");
		}

		const data = await response.json();
		cityName.textContent = data.location.name;
		countryName.textContent = data.location.country;
		weatherIcon.src = `https:${data.current.condition.icon}`;
		weatherIcon.alt = data.current.condition.text;
		temperature.textContent = data.current.temp_c;
		condition.textContent = data.current.condition.text;
		feelsLike.textContent = `${data.current.feelslike_c}°C`;
		humidity.textContent = `${data.current.humidity}%`;
		wind.textContent = `${data.current.wind_kph} km/h`;
		weatherResult.classList.remove("hidden");
	} catch (err) {
		error.textContent = "Unable to get weather. Please check the city name.";
		error.classList.remove("hidden");
	} finally {
		loading.classList.add("hidden");
	}
}

form.addEventListener("submit", function (event) {
	event.preventDefault();
	const city = input.value.trim();
	if (city) getWeather(city);
});

// Default weather
getWeather("London");
