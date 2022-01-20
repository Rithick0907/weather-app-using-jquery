$(document).ready(() => {
  const proxy = "https://cors-anywhere.herokuapp.com";
  const API_KEY = "f847023ac7fd05f740bd61dc050203fe";
  getWeather(
    `${proxy}/api.openweathermap.org/data/2.5/weather?q=chennai&appid=${API_KEY}`
  );
  $("#current-location-weather").click(() => {
    let latitude;
    let longitude;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        const url = `${proxy}/api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
        getWeather(url);
      });
    } else {
      alert("Your Browser doesn't support navigator API");
    }
  });
  $("#cities").click(() => {
    const selectedCity = $("#cities").find(":selected").text();
    const url = `${proxy}/api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${API_KEY}`;
    getWeather(url);
  });
});

const getName = (id) => {
  switch (id) {
    case id >= 200 && id < 300:
      return "storm";
    case id >= 300 && id < 400:
      return "drizzle";
    case id >= 500 && id < 600:
      return "rain";
    case id >= 600 && id < 700:
      return "snowflake";
    case id >= 700 && id < 800:
      return "cloudy";
    default:
      return "cloud";
  }
};
const getWeather = (url) => {
  $.ajax({
    url,
    success: (result) => {
      const { name } = result;
      const { feels_like } = result.main;
      const { id, main } = result.weather[0];
      $(".location").text(() => name);
      $("#temp-icon").attr("src", `./assets/${getName(main)}.png`);
      $("#temp-value").text(() => feels_like);
      $(".climate").text(() => main);

      console.log(name, feels_like, id, main);
    },
  });
};
