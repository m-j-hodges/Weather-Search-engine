$("document").ready(() => {
  document.addEventListener("keydown", (evt) => {
    console.log(evt.key);
    if (evt.key == "Enter") {
      startSearch();
    }
  });
});

var cityArray;
var cityName;
var stateName;
var coordLongitude;
var coordLatitude;
var weatherApiRequest;
var coordApiRequest = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateName}&limit=5&appid=5e4e76067c9efbd530372ae03978df87`;
var oneCallApiRequest;

$("#searchBtn").on("click", function (event) {
  $(".loader").removeClass('d-none')
  startSearch(event);
});

$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

selectedCity = $("#cityInput").val();
// start search function.
async function startSearch() {
  // show the weather ahead section.
  if (!$("#weatherAheadSection").hasClass("d-none")) {
    $("#weatherAheadSection").addClass("d-none");
  }

  debugger;
  $(".col-sm-3 h4").html("");
  $(".card-text").html("");
  $(".card-subtitle").html("");
  $("#weather-data").html("");
  if (event.target.classList.contains("btn-outline-secondary") !== true) {
    selectedCity = $("#cityInput").val();
  }
  debugger;
  cityArray = selectedCity.split(" ");
  cityName = selectedCity.split(",")[0];
  stateName = selectedCity.split(",")[1];
  debugger;
  coordApiRequest = `https://geocode.maps.co/search?q=${cityName},${stateName}&api_key=67816f5abff53064370654ipx8e37ed`;

  let result = await fetch(coordApiRequest);
  if (!result.ok) {
    throw new Error(`Response status ${result.status} is bad.`);
  }
  const json = await result.json();

  var lat = json[0].lat;
  var long = json[0].lon;
  var targetCity = json[0].display_name.split(",")[0];

  // fetch grid office and grid x,y.
  let weatherRequest = `https://api.weather.gov/points/${lat},${long}`;
  // execute request
  var weatherGrid = await fetch(weatherRequest)
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      return data;
    });
  const gridOffice = weatherGrid.properties.gridId;
  const gridCoordX = weatherGrid.properties.gridX;
  const gridCoordY = weatherGrid.properties.gridY;

  var newApiRequest = `https://api.weather.gov/gridpoints/${gridOffice}/${gridCoordX},${gridCoordY}/forecast`;
  // fetch the data we need from weather.
  let response = await fetch(newApiRequest)
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      return data;
    });
  var weatherData;
  if (response != null) {
    weatherData = response.properties.periods;
  }

  $("#weather-data").html(`<div class="card" style="width: 18rem;>\
<div class="card-body">\
  <h5 class="card-title"></h5>\
  <h4 class="card-subtitle mb-2 text-muted">${targetCity} (${moment().format(
    "M/DD/YY"
  )})</h4>\
  <p class="card-text">Current temperature: ${
    weatherData[0].temperature
  }&#176;${weatherData[0].temperatureUnit} </p>\
  <p class="card-text">forecast: ${weatherData[0].shortForecast}</p>\
  <p class="card-text">Wind Speed: ${weatherData[0].windSpeed}</p>\
  <p class="card-text">Precipitation: ${
    weatherData[0].probabilityOfPrecipitation.value ?? 0
  }%</p>\
</div>\
</div>`);

  // .then(function(data) {
  //   console.log(data)
  //   uvi = data.daily[0].uvi
  //   appendTextVeryHighRisk = `<p class=" d-inline tooltips"><span class="very-high-uvi">UVI (very-high risk): ${uvi}</span>
  //   <span class="tooltiptext">Minimize sun exposure between 10am -4pm. Use SPF 15+ sunblock and apply every 1.5 hours.</span></p>`
  //   appendTextHighRisk = `<p class="d-inline tooltips"><span class="high-uvi"> UVI (high risk): ${uvi}</span>
  //   <span class="tooltiptext">Generously apply broad spectrum SPF 15+ sunscreen every 1.5 hours, even on cloudy days, and after swimming or sweating. Bright surfaces, such as sand, water, and snow, will increase UV exposure.</span></p>`
  //   appendTextMediumRisk = `<p class="d-inline tooltips"><span class="mid-uvi"> UVI (medium risk): ${uvi}</span>
  //   <span class="tooltiptext">Generously apply broad spectrum SPF 15+ sunscreen every 1.5 hours, even on cloudy days, and after swimming or sweating. Bright surfaces, such as sand, water, and snow, will increase UV exposure.</span></p>`
  //   appendTextLowRisk = `<div class="d-inline tooltips"><span class="low-uvi"> UVI (low risk): ${uvi}</span>
  //     <span class="tooltiptext">Wear sunglasses on bright days. If you burn easily, cover up and use broad spectrum SPF 15+ sunscreen. Bright surfaces, sand, water, and snow, will increase UV exposure.</span></div>`
  //   appendTextUltraRisk = `<p class="d-inline tooltips"><span class="ultra-uvi"> UVI (Ultra risk): ${uvi}</span>
  //   <span class="tooltiptext">Try to avoid sun exposure between 10 a.m. and 4 p.m. If outdoors, seek shade and wear sun-protective clothing, a wide-brimmed hat, and UV-blocking sunglasses. Generously apply broad spectrum SPF 15+ sunscreen</span></p>`
  //   // $('.card-text')[2].after(`UV Index: ${uvi}`)
  // if(uvi >= 0 && uvi < 3) {
  //   $('#weather-data').append(appendTextLowRisk)

  // } else if(uvi>=3 && uvi < 6) {
  //   $('#weather-data').append(appendTextMediumRisk)

  // }else if(uvi>=6 && uvi < 8) {
  //   $('#weather-data').append(appendTextHighRisk)
  // }else if(uvi>=8 && uvi < 11) {
  //   $('#weather-data').append(appendTextVeryHighRisk)

  // } else if(uvi>=11) {
  //   $('#weather-data').append(appendTextUltraRisk);
  // }

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

  var weatherCards = $(".card");

  for (var t = 1; t < weatherData.length - 2; t++) {
    eachDay = moment().add(t, "days");
    $(`#weatherAhead${t + 1}`).prepend(`<h4>${weatherData[t].name}</h4>`);
    $(`#forecastText${t + 1}`).html(
      `Temperature: ${weatherData[t].temperature}&#176;F`
    );
    $(`#forecastText${t + 1}`).append(
      `<p>Forecast: ${weatherData[t].shortForecast}</p>`
    );
    $(`#forecastText${t + 1}`).append(
      `<p>Precipitation: ${
        weatherData[t].probabilityOfPrecipitation.value ?? 0
      }%</p>`
    );
    $(`#forecastText${t + 1}`).append(
      `<p>Wind: ${weatherData[t].windSpeed}</p>`
    );

    if (
      weatherData[t].shortForecast.toLowerCase().includes("cloudy") &&
      weatherData[t].isDaytime == true
    ) {
      $(`#forecast-img-${t + 1}`).remove();
      var newNode = document.createElement("img");
      newNode.id = `forecast-img-${t + 1}`;
      newNode.src = "./assets/img/cloudy-img-no-bg.png";
      newNode.classList.add("custom-images");
      $(`#weatherAhead${t + 1}`).prepend(newNode);
    } else if (
      weatherData[t].shortForecast.toLowerCase().includes("cloudy") &&
      weatherData[t].isDaytime == false
    ) {
      $(`#forecast-img-${t + 1}`).remove();
      var newNode = document.createElement("img");
      newNode.id = `forecast-img-${t + 1}`;
      newNode.src = "./assets/img/cloudy-img-no-bg.png";
      newNode.style = "background-color:grey";
      newNode.classList.add("custom-images");
      $(`#weatherAhead${t + 1}`).prepend(newNode);
    } else if (weatherData[t].shortForecast.toLowerCase().includes("sunny")) {
      $(`#forecast-img-${t + 1}`).remove();
      var newNode = document.createElement("img");
      newNode.id = `forecast-img-${t + 1}`;
      newNode.src = "./assets/img/sun-img.jpg";
      newNode.classList.add("custom-images");
      $(`#weatherAhead${t + 1}`).prepend(newNode);
    }
    // nighttime and clear (not sunny)
    else if (
      weatherData[t].shortForecast.toLowerCase().includes("clear") &&
      weatherData[t].isDaytime == false
    ) {
      $(`#forecast-img-${t + 1}`).remove();
      var newNode = document.createElement("img");
      newNode.id = `forecast-img-${t + 1}`;
      newNode.src = "./assets/img/nighttime.jpg";
      newNode.classList.add("custom-images");
      $(`#weatherAhead${t + 1}`).prepend(newNode);
    }
    // daytime and rainy
    else if (
      weatherData[t].shortForecast.toLowerCase().includes("rain") &&
      weatherData[t].isDaytime == true
    ) {
      $(`#forecast-img-${t + 1}`).remove();
      var newNode = document.createElement("img");
      newNode.id = `forecast-img-${t + 1}`;
      newNode.src = "./assets/img/rainy-img-no-bg.png";
      newNode.classList.add("custom-images");
      $(`#weatherAhead${t + 1}`).prepend(newNode);
    }
    // rainy and nighttime
    else if (
      weatherData[t].shortForecast.toLowerCase().includes("rain") &&
      weatherData[t].isDaytime == false
    ) {
      $(`#forecast-img-${t + 1}`).remove();
      var newNode = document.createElement("img");
      newNode.id = `forecast-img-${t + 1}`;
      newNode.src = "./assets/img/rainy-img-no-bg.png";
      newNode.classList.add("custom-images");
      newNode.style = "background-color:grey;";
      $(`#weatherAhead${t + 1}`).prepend(newNode);
    }
    // snow and daytime
    else if (
      weatherData[t].shortForecast.toLowerCase().includes("snow") &&
      weatherData[t].isDaytime == true
    ) {
      $(`#forecast-img-${t + 1}`).remove();
      var newNode = document.createElement("img");
      newNode.id = `forecast-img-${t + 1}`;
      newNode.src = "./assets/img/snowflake.png";
      newNode.classList.add("custom-images");
      $(`#weatherAhead${t + 1}`).prepend(newNode);
    }
    // snow and nighttime
    else if (
      weatherData[t].shortForecast.toLowerCase().includes("snow") &&
      weatherData[t].isDaytime == false
    ) {
      $(`#forecast-img-${t + 1}`).remove();
      var newNode = document.createElement("img");
      newNode.id = `forecast-img-${t + 1}`;
      newNode.src = "./assets/img/snowflake.png";
      newNode.style = "background-color:black;";
      newNode.classList.add("custom-images");
      $(`#weatherAhead${t + 1}`).prepend(newNode);
    } else {
      $(`#forecast-img-${t + 1}`).remove();
      var newNode = document.createElement("img");
      newNode.id = `forecast-img-${t + 1}`;
      newNode.src = "./assets/img/sun-img.jpg";
      newNode.classList.add("custom-images");
      $(`#weatherAhead${t + 1}`).prepend(newNode);
    }
  }

  // show the weather ahead section.
  if ($("#weatherAheadSection").hasClass("d-none")) {
    $("#weatherAheadSection").removeClass("d-none");
  }
  $(".loader").addClass("d-none")

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
}

$(".btn-outline-secondary").on("click", function (e) {
  e.preventDefault();
  var targetedText = $(e.target).text();
  $("h4").html("");
  console.log(targetedText);
  console.log("clicked!");
  selectedCity = targetedText;
  debugger;
  startSearch(selectedCity);
});

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
