const weatherLookup = function (event) {
  event.preventDefault();

  var city = $("#city").val();
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=7e8f7106e0004f7fac5f624653ef7dca&units=imperial"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      current(data);
      forecastLookup(data.coord.lat, data.coord.lon);

      var container = $("#current");
      //data in console will have lat and long for city
      //then do string concat on line 17 replacing lat and long with what you get in the data object
      //fetch("https//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=7e8f7106e0004f7fac5f624653ef7dca")
    });

  //fetch("https//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=7e8f7106e0004f7fac5f624653ef7dca")
};
const forecastLookup = function (lat, lon) {
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=7e8f7106e0004f7fac5f624653ef7dca&units=imperial"
  )
    .then(function (response) {
      //console.log(response)
      return response.json();
    })
    .then(function (data) {
      console.log(data.list)
      forecast(data);
    });
};
const current = function (data) {
  $("#name").text(data.name);
  $("#tempurature").text(data.main.temp);
  $("#wind").text(data.wind.speed);
  $("#humidity").text(data.main.humidity);
  saveSearch(data.name);
  console.log(data);
};

const forecast = function (data) {
  var daysArray = [
    data.list[0],
    data.list[8],
    data.list[16],
    data.list[24],
    data.list[32],
  ];
  var template = $(".forecast");
  daysArray.forEach(function (day) {
    var card = $("<div>", { class: "card" });

    var wind = $("<p>");
    var temp = $("<p>");
    var humidity = $("<p>");
    wind.text(day.wind.speed + "MPH");
    humidity.text(day.main.humidity + "%");
    temp.text(day.main.feels_like + "F");
    card.appendTo(template);
    card.append(wind, temp, humidity);
    template.append(card);
  });
};
//To do: format in css then add funcionality to bottom two functions, then format butttons 
const loadSearch = function () {
  //To Do: Load local storage and append to the screen
};
const saveSearch = function (city) {
  //To Do: Load local storage and add to the list
};
$("#city-search").on("submit", weatherLookup);
