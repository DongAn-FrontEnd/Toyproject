import { OPENWEATHER_API_KEY, UNSPLASH_API_KEY } from "./config";

const greetingEl = document.getElementById("greeting");
const timeEl = document.getElementById("time");
const unsplashUser = document.getElementById("unsplash-user");
const weatherEl = document.getElementById("weather");
const weatherIconEl = document.getElementById("weather-icon");
const cityEl = document.getElementById("city");
const temperatureEl = document.getElementById("temperature");

async function fetchImage() {
  try {
    const res = await fetch(
      `https://api.unsplash.com/photos/random?client_id=${UNSPLASH_API_KEY}&orientation=landscape&query=landscape`
    );

    if (res.status !== 200) {
      document.body.style.backgroundImage =
        "url(https://images.unsplash.com/photo-1581081245691-a216823de64b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE1ODEzMX0)";
      unsplashUser.href = "https://unsplash.com/@solotravel_photalkgraphy";
      unsplashUser.textContent = "Polly";
      return;
    }

    const data = await res.json();
    document.body.style.backgroundImage = `url(${data.urls.regular})`;
    unsplashUser.href = data.user.links.html;
    unsplashUser.textContent = data.user.name;
  } catch (error) {
    document.body.style.backgroundImage =
      "url(https://images.unsplash.com/photo-1581081245691-a216823de64b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE1ODEzMX0)";
    unsplashUser.href = "https://unsplash.com/@solotravel_photalkgraphy";
    unsplashUser.textContent = "Polly";
  }
}

async function fetchWeather(
  coords = { latitude: 37.5683, longitude: 126.9778 }
) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&appid=${OPENWEATHER_API_KEY}`;
  try {
    const res = await fetch(url);

    if (res.status !== 200) {
      weatherEl.style.display = "none";
      return;
    }

    const {
      weather,
      main: { temp },
      name,
    } = await res.json();
    const icon = weather[0].icon;
    const desc = weather[0].main;

    weatherEl.style.display = "flex";
    weatherIconEl.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    weatherIconEl.alt = `${desc} weather icon`;
    temperatureEl.textContent = temp.toFixed(1) + "°";
    cityEl.textContent = name;
  } catch (error) {
    weatherEl.style.display = "none";
  }
}

function getTwoDigitNum(num) {
  return num < 10 ? `0${num}` : num.toString();
}

function getTime() {
  const current = new Date();
  const hour = current.getHours();
  const minute = current.getMinutes();
  const second = current.getSeconds();

  let greeting = "Good ";

  if (hour < 5 || hour >= 21) {
    greeting += "night 🌙";
  } else if (hour < 12) {
    greeting += "morning 🌅";
  } else if (hour < 17) {
    greeting += "afternoon 🍵";
  } else if (hour < 21) {
    greeting += "evening 🍷";
  }

  return {
    greeting,
    time: `${getTwoDigitNum(hour)}:${getTwoDigitNum(minute)}:${getTwoDigitNum(
      second
    )}`,
  };
}

fetchImage();
fetchWeather();

weatherEl.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(({ coords }) => {
    console.log(coords);
    fetchWeather(coords);
  });
});

const intervalId = setInterval(() => {
  const { greeting, time } = getTime();
  timeEl.textContent = time;
  greetingEl.textContent = greeting;
}, 1000);
