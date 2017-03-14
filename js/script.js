$(document).ready(function(){

  if(navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(function(position) {

      var lat = position.coords.latitude.toString();
      var lon = position.coords.longitude.toString();

      apiCall(lat, lon);

    });
  }

  var apiCall = function(coordsLat, coordsLon) {

    var apiString = "https://api.apixu.com/v1/current.json?key=41ad44ee709642f69d8133934170801&q=" + coordsLat + "," + coordsLon;

    $.getJSON(apiString, function(json) {

      var location = json.location.name;
      var region = json.location.region;
      var tempC = json.current.temp_c;
      var tempF = json.current.temp_f;
      var description = json.current.condition.text;
      var windSpeed = json.current.wind_mph;
      var rain = json.current.precip_in;
      var cloud = json.current.cloud;


      var locationText = $("#js-loc");
      locationText.text(location);

      var locationReg = $("#js-reg");
      locationReg.text(region);

      var temperatureData = $("#js-temp");
      temperatureData.text(tempC);

      var windSpeedText = $("#js-wind-speed");
      windSpeedText.text(windSpeed);

      var rainText = $("#js-rain-text");
      rainText.text(rain);

      var snowText = $("#js-snow-text");
      snowText.text(cloud);


      var button = $("#change-temp");
      var units = $("#units");


      //when finished loading the data show the info
      var main = $("main");
      main.css("top", "20%");
      var loading = $(".loading");
      loading.toggle();



      //default to have page load with Celsius.
      var currentUnitC = true;

      button.on("click",function(){

        if (currentUnitC) {
          temperatureData.text(tempF);
          units.text("F");
          button.text("C");
          currentUnitC = false;

        }

        else {
          temperatureData.text(tempC);
          button.text("F");
          units.text("C");
          currentUnitC = true;
        }
      });

    })
  }
});
