$("document").ready(() => {
  document.addEventListener("keydown", (evt) => {
    console.log(evt.key);
    if (evt.key == "Enter") {
      startSearch($("#cityInput").val());
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

  startSearch($("#cityInput").val());
});

$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

// start search function.
async function startSearch(city) {
  // show the weather ahead section.
  if ($("#cityInput").val() === "" && city === "") {
    alert("You must enter a city or select a city.");
    return;
  }
  if (!$("#weatherAheadSection").hasClass("d-none")) {
    $("#weatherAheadSection").addClass("d-none");
  }
  if ($(".loader").hasClass("d-none")) {
    $(".loader").removeClass("d-none");
  }
  $(".col-sm-3 h4").html("");
  $(".card-text").html("");
  $(".card-subtitle").html("");
  $("#weather-data").html("");
  if (city === "" || city === null) {
    selectedCity = $("#cityInput").val();
  } else {
    selectedCity = city;
  }
  if (selectedCity.split(",").length < 2) {
    alert("you must provide a city and state in the format {City},{State Abbreviation}")
    return;
  }
  if (selectedCity === "Washington, D.C.")
    selectedCity = "Washington D.C., District of Columbia";
  cityArray = selectedCity.split(" ");
  cityName = selectedCity.split(",")[0];
  if(selectedCity.split(",")[1] != null)
    stateName = selectedCity.split(",")[1].trim();
  // create API request to get coordinate data.
  coordApiRequest = `https://geocode.maps.co/search?q=${cityName},${stateName}&api_key=67816f5abff53064370654ipx8e37ed`;
  // make request to get coordinate data.
  const startTime = new Date();
  let result = await fetch(coordApiRequest);
  // if this request is unsuccessful throw and exception.
  if (!result.ok) {
    throw new Error(`Response status ${result.status} is bad.`);
  }
  // await json for coordinates.
  const json = await result.json();
  // how long did the first request take?
  const firstCall = new Date();
  // how long did the 1st call take?
  console.log(
    `1st call for latitude and longitude took ${firstCall.getTime() - startTime.getTime()}ms `
  );
  // store latitude and longitudinal coordinates in variables.
  var lat = json[0].lat;
  var long = json[0].lon;
  // store the city in a variable.
  var targetCity = json[0].display_name.split(",")[0];

  // fetch grid office and grid x,y.
  const secondCallStart = new Date();
  let weatherRequest = `https://api.weather.gov/points/${lat},${long}`;
  // execute request
  var weatherGrid = await fetch(weatherRequest)
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      return data;
    });
  const secondCallEnd = new Date();
  console.log(`Second call for grid points took ${secondCallEnd.getTime() - secondCallStart.getTime()}ms `);
  
  const gridOffice = weatherGrid.properties.gridId;
  const gridCoordX = weatherGrid.properties.gridX;
  const gridCoordY = weatherGrid.properties.gridY;

  var newApiRequest = `https://api.weather.gov/gridpoints/${gridOffice}/${gridCoordX},${gridCoordY}/forecast`;
  // fetch the data we need from gov weather site.
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
      // cloudy and is daytime
      setImgCard("cloudy-img-no-bg.png", t, weatherData[t].isDaytime);
    } else if (
      weatherData[t].shortForecast.toLowerCase().includes("cloudy") &&
      weatherData[t].isDaytime == false
    ) {
      // cloudy and is nighttime
      setImgCard("cloudy-img-no-bg.png", t, weatherData[t].isDaytime);
    } else if (
      weatherData[t].shortForecast.toLowerCase().includes("sunny") &&
      weatherData[t].isDaytime == true
    ) {
      // sunny and daytime
      setImgCard("sun-img.jpg", t, weatherData[t].isDaytime);
    }
    // nighttime and clear (not sunny)
    else if (
      weatherData[t].shortForecast.toLowerCase().includes("clear") &&
      weatherData[t].isDaytime == false
    ) {
      // (clear) and nighttime
      setImgCard("nighttime.jpg", t, weatherData[t].isDaytime);
    } else if (
      weatherData[t].shortForecast.toLowerCase().includes("rain") &&
      weatherData[t].isDaytime == true
    ) {
      // daytime and rainy
      setImgCard("rainy-img-no-bg.png", t, weatherData[t].isDaytime);
    } else if (
      weatherData[t].shortForecast.toLowerCase().includes("rain") &&
      weatherData[t].isDaytime == false
    ) {
      // rainy and nighttime
      setImgCard("rainy-img-no-bg.png", t, weatherData[t].isDaytime);
    } else if (
      weatherData[t].shortForecast.toLowerCase().includes("snow") &&
      weatherData[t].isDaytime == true
    ) {
      // snow and daytime
      setImgCard("snowflake.png", t, weatherData[t].isDaytime);
    } else if (
      weatherData[t].shortForecast.toLowerCase().includes("snow") &&
      weatherData[t].isDaytime == false
    ) {
      // snow and nighttime
      setImgCard("snowflake.png", t, weatherData[t].isDaytime);
    } else if (
      weatherData[t].shortForecast.toLowerCase().includes("fog") &&
      weatherData[t].isDaytime == true
    ) {
      // if the weather forecast is for fog and it's daytime.
      setImgCard("fog.png", t, weatherData[t].isDaytime);
    } else if (
      weatherData[t].shortForecast.toLowerCase().includes("fog") &&
      weatherData[t].isDaytime == false
    ) {
      // if the weather forecast is for fog and it's night time.
      setImgCard("fog.png", t, weatherData[t].isDaytime);
    } else {
      // in all other cases, just show it's sunny
      setImgCard("sun-img.jpg", t, weatherData[t].isDaytime);
    }
  }

  // show the weather ahead section.
  if ($("#weatherAheadSection").hasClass("d-none")) {
    $("#weatherAheadSection").removeClass("d-none");
  }
  $(".loader").addClass("d-none");
}

// function to auto-create the image cards.

function setImgCard(weatherImgUrl, index, isDaytime) {
  $(`#forecast-img-${index + 1}`).remove();
  var newNode = document.createElement("img");
  newNode.id = `forecast-img-${index + 1}`;
  newNode.src = `./assets/img/${weatherImgUrl}`;
  if (!isDaytime) {
    newNode.style = "background-color:black;";
  }
  newNode.classList.add("custom-images");
  $(`#weatherAhead${index + 1}`).prepend(newNode);
}

$(".btn-outline-secondary").on("click", function (e) {
  e.preventDefault();
  var targetedText = $(e.target).text().trim();
  $("h4").html("");
  console.log(targetedText);
  console.log("clicked!");
  selectedCity = targetedText;
  debugger;
  startSearch(selectedCity);
});
