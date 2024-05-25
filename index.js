let cityName = "ahmednagar";
async function weatherData() {
  try {
  } catch (error) {
    console.log(`Not able to Get data Due to ${error}`);
  }
  let info = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=4bc1f45fd71eeb6e9ba8df9778513ddf`
  );
  let weatherInfo = await info.json();
  console.log(weatherInfo);

  let newPa = document.createElement("p");
  tempInC = `${weatherInfo?.main?.temp.toFixed(2)}` - 273.15;
  newPa.textContent = tempInC.toFixed(2);
  document.body.appendChild(newPa);
}

weatherData();
