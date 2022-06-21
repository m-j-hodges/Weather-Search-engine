



var cityArray
var cityName
var stateName
var coordLongitude
var coordLatitude
var weatherApiRequest
var coordApiRequest = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateName}&limit=5&appid=5e4e76067c9efbd530372ae03978df87`
var oneCallApiRequest

$('#searchBtn').on("click", function(event) {
  startSearch(event)
})
  
selectedCity = $('#cityInput').val();
function startSearch() {
  debugger;
  $('.col-sm-3 h4').html('')
  $('.card-text').html('')
  $('.card-subtitle').html('')
  $('#weather-data').html('')
  if(event.target.classList.contains('btn-outline-secondary') !== true) {
    selectedCity = $('#cityInput').val();
  }
  debugger;
  cityArray = selectedCity.split(' ');
  cityName = selectedCity.split(",")[0];
  stateName = selectedCity.split(",")[1];
  debugger;
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
  
  debugger;

$('#weather-data').html(`<div class="card" style="width: 18rem;>\
<div class="card-body">\
  <h5 class="card-title"></h5>\
  <h4 class="card-subtitle mb-2 text-muted">${resultCityName} (${moment().format('M/DD/YY')})</h4>\
  <p class="card-text">Current temperature: ${Math.round(cityTemp -273)*9/5+32}&#176;F </p>\
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
  uvi = data.daily[0].uvi
  $('.card-text')[2].after(`UV Index: ${uvi}`)

  var DailyArray = data.daily
  var dayAhead1 = data.daily[0]
  var dayAhead2 = data.daily[1]
  var dayAhead3 = data.daily[2]
  var dayAhead4 = data.daily[3]
  var dayAhead5 = data.daily[4]
 dayAhead1Weather = dayAhead1.weather[0].main
 dayAhead1Temp = data.daily[0].temp
 dayAhead1Temp = data.daily[1].temp
 dayAhead1Temp = data.daily[2].temp
 dayAhead1Temp = data.daily[3].temp
 dayAhead1Temp = data.daily[4].temp
 dayAhead1TempMorn = Math.floor(data.daily[0].temp.morn - 273)
dayAhead1TempEven = Math.floor(data.daily[0].temp.eve - 273)
dayAhead1TempMax = Math.floor(data.daily[0].temp.max - 273)
 dayAhead2TempMorn = Math.floor(data.daily[1].temp.morn - 273)
dayAhead2TempEven = Math.floor(data.daily[1].temp.eve - 273)
dayAhead2TempMax = Math.floor(data.daily[1].temp.max - 273)
dayAhead1TempMornF = dayAhead1TempMorn * 9 / 5 + 32
dayAhead1TempEvenF = dayAhead1TempEven * 9 / 5 + 32
dayAhead1TempMaxF = dayAhead2TempMax * 9 / 5 + 32
dayAhead2TempMornF = dayAhead2TempMorn * 9 / 5 + 32
dayAhead2TempEvenF = dayAhead2TempEven * 9 / 5 + 32
dayAhead2TempMaxF = dayAhead2TempMax * 9 / 5 + 32
var dayAhead1Time = moment().add(1, "days")
var dayAhead2Time = moment().add(2, "days")
debugger;
// if(dayAhead1Weather == "Clear") {
//   $('#weatherAhead1').prepend(`<h4>${dayAhead1Time.format('M/DD/YY')}</h4>`)
//   $('#forecastText1').html(`Morning Temp: ${dayAhead1TempMornF}&#176;F<br>
//   High Temp: ${dayAhead1TempMaxF}&#176;F<br>
//   Evening Temp: ${dayAhead1TempEvenF}&#176;C`)
//   $('#forecastText1').append(`<p>Humidity:${dayAhead1.humidity}%</p>`)
//   $('#forecastText1').append(`<p>Wind:${Math.floor(dayAhead1.wind_speed)}MPH</p>`)
//    $('#forecast-img-1').attr("src","./assets/img/sun-img.jpg")
//  }
//  else if(dayAhead1Weather == "Clouds") {
//   $('#weatherAhead1').prepend(`<h4>${dayAhead1Time.format('M/DD/YY')}</h4>`)
//   $('#forecastText1').html(`Morning Temp: ${dayAhead1TempMornF}&#176;F<br>
//   High Temp: ${dayAhead1TempMaxF}&#176;F<br>
//   Evening Temp: ${dayAhead1TempMaxF}&#176;F`)
//   $('#forecastText1').append(`<p>Humidity:${dayAhead1.humidity}%</p>`)
//   $('#forecastText1').append(`<p>Wind:${Math.floor(dayAhead1.wind_speed)}MPH</p>`)
//   $('#forecast-img-1').attr("src","assets/img/cloudy-img.png")
//  }
//  else if(dayAhead1Weather == "Rainy" || dayAhead1Weather == "rain") {
//   $('#weatherAhead1').prepend(`<h4>${dayAhead1Time.format('M/DD/YY')}</h4>`)
//   $('#forecastText1').html(`Morning Temp: ${dayAhead1TempMornF}&#176;F<br>
//   High Temp: ${dayAhead1TempMaxF}&#176;F<br>
//   Evening Temp: ${dayAhead1TempEvenF}&#176;F`)
//   $('#forecastText1').append(`<p>Humidity:${dayAhead1.humidity}%</p>`)
//   $('#forecastText1').append(`<p>Wind:${Math.floor(dayAhead1.wind_speed)}MPH</p>`)
//   $('#forecast-img-1').attr("src","assets/img/cloudy-img.png")
//  }
var weatherCards = $('.card')
weatherCards.each( function(i) {
  debugger;
  currentConditions = data.daily[i].weather[0].main
  humidity = data.daily[i].humidity
  dailyTempInCelcius = Math.floor(data.daily[i].temp.morn - 273)
  dailyTemp = dailyTempInCelcius * 9 /5 + 32
  windSpeed = data.daily[i].wind_speed
  eachDay = moment().add(i, "days")
  if(currentConditions == "Clear") {
    $(`#weatherAhead${i+1}`).prepend(`<h4>${eachDay.format('M/DD/YY')}</h4>`)
    $(`#forecastText${i+1}`).html(`Morning Temp: ${dailyTemp}&#176;F`)
    $(`#forecastText${i+1}`).append(`<p>Humidity:${humidity}%</p>`)
    $(`#forecastText${i+1}`).append(`<p>Wind:${Math.floor(windSpeed)}MPH</p>`)
     $(`#forecast-img-${i+1}`).attr("src","./assets/img/sun-img.jpg")
   }
   else if(currentConditions == "Clouds") {
    $(`#weatherAhead${i+1}`).prepend(`<h4>${eachDay.format('M/DD/YY')}</h4>`)
    $(`#forecastText${i+1}`).html(`Morning Temp: ${dailyTemp}&#176;F`)
    $(`#forecastText${i+1}`).append(`<p>Humidity:${humidity}%</p>`)
    $(`#forecastText${i+1}`).append(`<p>Wind:${Math.floor(windSpeed)}MPH</p>`)
    $(`#forecast-img-${i+1}`).attr("src","assets/img/cloudy-img.png")
   }
   else if(currentConditions == "Rainy") {
    $(`#weatherAhead${i+1}`).prepend(`<h4>${eachDay.format('M/DD/YY')}</h4>`)
    $(`#forecastText${i+1}`).html(`Morning Temp: ${dailyTemp}&#176;F`)
    $(`#forecastText${i+1}`).append(`<p>Humidity:${humidity}%</p>`)
    $(`#forecastText${i+1}`).append(`<p>Wind:${Math.floor(windSpeed)}MPH</p>`)
    $(`#forecast-img-${i+1}`).attr("src","assets/img/rainy-img.png")
   } 
   else if(currentConditions == "Rain") {
    $(`#weatherAhead${i+1}`).prepend(`<h4>${eachDay.format('M/DD/YY')}</h4>`)
    $(`#forecastText${i+1}`).html(`Morning Temp: ${dailyTemp}&#176;F`)
    $(`#forecastText${i+1}`).append(`<p>Humidity:${humidity}%</p>`)
    $(`#forecastText${i+1}`).append(`<p>Wind:${Math.floor(windSpeed)}MPH</p>`)
    $(`#forecast-img-${i+1}`).attr("src","assets/img/rainy-img.png")
   } 
}




)

//  if(dayAhead1Weather == "Clear") {
//   $('#weatherAhead1').prepend(`<h4>${dayAhead1Time.format('M/DD/YY')}</h4>`)
//   $('#forecastText1').html(`Morning Temp: ${dayAhead1TempMornF}&#176;F<br>
//   High Temp: ${dayAhead1TempMaxF}&#176;F<br>
//   Evening Temp: ${dayAhead1TempEvenF}&#176;C`)
//   $('#forecastText1').append(`<p>Humidity:${dayAhead1.humidity}%</p>`)
//   $('#forecastText1').append(`<p>Wind:${Math.floor(dayAhead1.wind_speed)}MPH</p>`)
//    $('#forecast-img-1').attr("src","./assets/img/sun-img.jpg")
//  }
//  else if(dayAhead1Weather == "Clouds") {
//   $('#weatherAhead1').prepend(`<h4>${dayAhead1Time.format('M/DD/YY')}</h4>`)
//   $('#forecastText1').html(`Morning Temp: ${dayAhead1TempMornF}&#176;F<br>
//   High Temp: ${dayAhead1TempMaxF}&#176;F<br>
//   Evening Temp: ${dayAhead1TempMaxF}&#176;F`)
//   $('#forecastText1').append(`<p>Humidity:${dayAhead1.humidity}%</p>`)
//   $('#forecastText1').append(`<p>Wind:${Math.floor(dayAhead1.wind_speed)}MPH</p>`)
//   $('#forecast-img-1').attr("src","assets/img/cloudy-img.png")
//  }
//  else if(dayAhead1Weather == "Rainy" || dayAhead1Weather == "rain") {
//   $('#weatherAhead1').prepend(`<h4>${dayAhead1Time.format('M/DD/YY')}</h4>`)
//   $('#forecastText1').html(`Morning Temp: ${dayAhead1TempMornF}&#176;F<br>
//   High Temp: ${dayAhead1TempMaxF}&#176;F<br>
//   Evening Temp: ${dayAhead1TempEvenF}&#176;F`)
//   $('#forecastText1').append(`<p>Humidity:${dayAhead1.humidity}%</p>`)
//   $('#forecastText1').append(`<p>Wind:${Math.floor(dayAhead1.wind_speed)}MPH</p>`)
//   $('#forecast-img-1').attr("src","assets/img/cloudy-img.png")
//  }

  console.log(dayAhead2)
  console.log(dayAhead3)
  console.log(dayAhead4)
  console.log(dayAhead5)
}) }

$('.btn-outline-secondary').on("click", function(e) {
  e.preventDefault();
  var targetedText = $(e.target).text()
  $('h4').html('')
  console.log(targetedText)
  console.log("clicked!")
  selectedCity = targetedText
  debugger;
  startSearch(selectedCity)
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



