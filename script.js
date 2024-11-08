const apiKey = "036bb2f72a847871e7392c1dd042c646";
const searchButton = document.querySelector(".search button");
const searchInput = document.querySelector(".search input");
const weatherIcon = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temp");
const cityElement = document.querySelector(".city");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");

async function fetchWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) throw new Error("City not found");

        const data = await response.json();

        tempElement.textContent = `${Math.round(data.main.temp)}°C`;
        cityElement.textContent = data.name;
        humidityElement.textContent = `${data.main.humidity}%`;
        windElement.textContent = `${Math.round(data.wind.speed)} km/h`;
        const weatherMain = data.weather[0].main.toLowerCase();
        if (weatherMain.includes("cloud")) {
            weatherIcon.src = "images/clouds-icon.png";
        } else if (weatherMain.includes("rain")) {
            weatherIcon.src = "images/rain-icon.png";
        } else if (weatherMain.includes("clear")) {
            weatherIcon.src = "images/clear-icon.png";
        } else if (weatherMain.includes("drizzle")) {
            weatherIcon.src = "images/drizzle-icon.png";
        } else if (weatherMain.includes("snow")) {
            weatherIcon.src = "images/snow-icon.png";
        } else if (weatherMain.includes("mist") || weatherMain.includes("fog")) {
            weatherIcon.src = "images/mist-icon.png";
        } else {
            weatherIcon.src = "images/default-icon.png"; 
        }

    } catch (error) {
        console.error(error.message);
        alert("City not found or there was an issue with the request.");
    }
}

searchButton.addEventListener("click", () => {
    const city = searchInput.value.trim();
    if (city) fetchWeather(city);
});

fetchWeather("Tiznit");
