const userTab = document.querySelector("[userWeather-data]");
const searchTab = document.querySelector("[searchWeather-data]");
const userContainer = document.querySelector(".weatherContainer");
const grantAccessContainer = document.querySelector(
  ".grant-loaction-container"
);
const grantAccessBtn = document.querySelector("[grant-access-btn]");
const searchCity = document.querySelector("[data-SearchCity]");
const searchForm = document.querySelector(".form-container");
const loactionScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".weather-info-container");
const cityName = document.querySelector("[data-cityName]");
const countryIcon = document.querySelector("[data-countryIcon]");
const weatherDesc = document.querySelector("[data-weatherDesc]");
const weatherIcon = document.querySelector("[data-weatherIcon]");
const weathertemp = document.querySelector("[data-temp]");
const windsSpeed = document.querySelector("[data-windsSpeed]");
const cloudiness = document.querySelector("[data-cloud]");
const humidity = document.querySelector("[data-humidity]");

let currentTab = userTab;
let apiKey = "4bc1f45fd71eeb6e9ba8df9778513ddf";
currentTab.classList.add("current-tab");
getFromSessionStroage();

function switchTab(clickTab) {
  if (clickTab != currentTab) {
    currentTab.classList.remove("current-tab");
    currentTab = clickTab;
    currentTab.classList.add("current-tab");

    if (!searchForm.classList.contains("active")) {
      userInfoContainer.classList.remove("active");
      grantAccessContainer.classList.remove("active");
      searchForm.classList.add("active");
    } else {
      searchForm.classList.remove("active");
      userInfoContainer.classList.remove("active");
      getFromSessionStroage();
    }
  }
}

userTab.addEventListener("click", () => {
  switchTab(userTab);
});

searchTab.addEventListener("click", () => {
  switchTab(searchTab);
});

function getFromSessionStroage() {
  const localCoordinates = sessionStorage.getItem("user-coordinates");
  if (!localCoordinates) {
    grantAccessContainer.classList.add("active");
  } else {
    const coordinates = JSON.parse(localCoordinates);
    fetchUserweatherData(coordinates);
  }
}

async function fetchUserweatherData(coordinates) {
  const { lat, lon } = coordinates;
  grantAccessContainer.classList.remove("active");
  loactionScreen.classList.add("active");

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();

    loactionScreen.classList.remove("active");
    userInfoContainer.classList.add("active");
    renderWeatherInfo(data);
  } catch {
    loactionScreen.classList.remove("active");
  }
}

function renderWeatherInfo(data) {
  cityName.innerText = data?.name;
  countryIcon.src = `https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`;
  weatherDesc.innerText = data?.weather?.description;
  weatherIcon.src = `https://openweathermap.org/img/wn/${data?.weather?.[0]?.icon}.png`;
  weathertemp.innerText = `${data?.main?.temp} °C`;
  windsSpeed.innerText = `${data?.wind?.speed} m/s`;
  humidity.innerText = `${data?.main?.humidity} %`;
  cloudiness.innerText = `${data?.clouds?.all} %`;
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
  }
}

function showPosition() {
  const userCoordinates = {
    lat: position.coords.latitude,
    lon: position.coords.longitude,
  };

  sessionStorage.setItem("user-coordinates").JSON.stringify(userCoordinates);
  fetchUserweatherData(userCoordinates);
}

grantAccessBtn.addEventListener("click", getLocation);

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (searchCity.value === "") return;
  console.log(searchCity.value);
  fetchSearchweatherData(searchCity.value);
});

async function fetchSearchweatherData(city) {
  loactionScreen.classList.add("active");
  userInfoContainer.classList.remove("active");
  grantAccessContainer.classList.remove("active");
  try {
    let info = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    let weatherInfo = await info.json();
    loactionScreen.classList.remove("active");
    userInfoContainer.classList.add("active");
    renderWeatherInfo(weatherInfo);
  } catch (error) {
    console.log(`Not able to Get data Due to ${error}`);
  }
}
