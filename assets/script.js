



var cityArray
var cityName
var stateName
var coordLongitude
var coordLatitude
var weatherApiRequest
var coordApiRequest = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateName}&limit=5&appid=5e4e76067c9efbd530372ae03978df87`
var oneCallApiRequest

$('#searchBtn').click( function() {
  selectedCity = $('#cityInput').val();
  cityArray = selectedCity.split(' ');
  cityName = selectedCity.split(",")[0];
  stateName = selectedCity.split(",")[1];
  coordApiRequest = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateName}&limit=5&appid=5e4e76067c9efbd530372ae03978df87`
  console.log(cityName)
  console.log(stateName)
 weatherApiRequest = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=5e4e76067c9efbd530372ae03978df87"
fetch(weatherApiRequest)
.then( function (response) {
  return response.json();
})
.then(function(data) {
  console.log(data);
  resultCityName = data.name
  coordLatitude = data.coord.lat
  coordLongitude = data.coord.lon
  cityTemp = data.main.temp
  windSpeed = data.wind.speed
  cityHumidity = data.main.humidity
$('#weather-data').html(`<div class="card" style="width: 18rem;>\
<div class="card-body">\
  <h5 class="card-title"></h5>\
  <h4 class="card-subtitle mb-2 text-muted">${resultCityName}</h4>\
  <p class="card-text">Current temperature: ${Math.round(cityTemp -273)}&#176;F </p>\
  <p class="card-text">Wind Speed: ${Math.round(windSpeed)} MPH</p>\
  <p class="card-text">Humidity: ${cityHumidity}&#37;</p>\
</div>\
</div>`)
oneCallApiRequest = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordLatitude}&lon=${coordLongitude}&appid=5e4e76067c9efbd530372ae03978df87`
return fetch(oneCallApiRequest)
})
.then(function(response) {
  return response.json()
})
.then(function(data) {
  console.log(data)
  var dayAhead1 = data.daily[0]
  var dayAhead2 = data.daily[1]
  var dayAhead3 = data.daily[2]
  var dayAhead4 = data.daily[3]
  var dayAhead5 = data.daily[4]
  console.log(dayAhead1)
  console.log(dayAhead2)
  console.log(dayAhead3)
  console.log(dayAhead4)
  console.log(dayAhead5)
})

// .then(function() {
//   weatherApiRequest = `https://api.openweathermap.org/data/2.5/weather?lat=${coordLatitude}&lon=${coordLongitude}&appid=5e4e76067c9efbd530372ae03978df87`
//   fetch(weatherApiRequest)})
//   .then( function(response) {
//     return response.json();
//   })
//   .then( function(weatherData) {
//     console.log(weatherData)

//   })

// function oneCallApi(oneCallApiRequest) {
// fetch(oneCallApiRequest)
// .then(function (response) {
//   return response.json()
// })
// .then(function(data) {
//   console.log(data)

// })

// }
// .then(response => response.json())
// .then(function(data2) {
//   console.log(data2);
// debugger
// })
// .catch(err => {
//   console.log('Request failed')
// })



}
)




  // if( cityArrayLength <= 2 && cityArray !== " ") {
  //   var cityArrayFinal = cityArray[1].toString().split(",")
  //   var cityArrayNew = `${cityArray[0]} ${cityArrayFinal[0]}`
  //   debugger
  //   return cityArrayNew
  // } else if (cityArrayLength < 2) {
  //   finalCityInput = cityArray.split(',')[0]
  // }
  //   else {
  //   finalCityInput = `${cityArray[0]} ${cityArray[1]} $(${cityArray[2]})`
  //   finalStateInput = stateArray
  //   return finalCityInput, finalStateInput
  // }

  // weatherApiAddress = `http://api.openweathermap.org/geo/1.0/direct?q=${cityArrayNew},$"&appid=5e4e76067c9efbd530372ae03978df87`



