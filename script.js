function weatherLookup(event) {
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
      forecastLookup(data.coord.lat, data.coord.lon)
      //data in console will have lat and long for city
      //then do string concat on line 17 replacing lat and long with what you get in the data object
      //fetch("https//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=7e8f7106e0004f7fac5f624653ef7dca")
    });

  //fetch("https//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=7e8f7106e0004f7fac5f624653ef7dca")
}
function forecastLookup(lat, lon) {
    fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=7e8f7106e0004f7fac5f624653ef7dca&units=imperial")
    .then(function (response){
       console.log(response)
       return response.json()
    }).then(function(data){
        console.log(data.list)
        var daysArray = [data.list[0], data.list[8], data.list[16], data.list[24], data.list[32]]
        console.log(daysArray)
        
    })
}
$("#city-search").on("submit", weatherLookup)