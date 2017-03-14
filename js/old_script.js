$(document).ready(function() {

  //check if the user supports geolcation and if true get coords

  if(navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(function(position) {

      //store lat and long in seperate variable for the api request later
      lat = position.coords.latitude;
      lon = position.coords.longitude;

      //change the coords into a string to concantate later
      lat = JSON.stringify(lat);
      lon = JSON.stringify(lon);


      //store the api request in a string to call it later.
      apiString = "https://api.apixu.com/v1/current.json?key=41ad44ee709642f69d8133934170801&q=" + lat + "," + lon;//using apixu

      //check withing console to make sure apiString is correct.
      console.log(apiString);

      //request the JSON with given coords from api and assing values to DOM:
      var fetch = $.getJSON(apiString, function(json) {

        //location
        console.log(json.location.name);
        $('.or-compass h2 ').text(json.location.name + ", " + json.location.country);

        //weather description
        console.log(json.current.condition.text);
        $('.or-weather-type h2').text(json.current.condition.text);

        switch (json.current.condition.text) {

          case "Sunny":
            $("body").css("background", "url(https://static.pexels.com/photos/4103/sky-sunny-flying-clouds.jpeg) no-repeat center center fixed");
            break;

          case "Clear":
            $("body").css("background", "url(https://static.pexels.com/photos/25125/pexels-photo-25125.jpg) no-repeat center center fixed");
            break;

            case "Overcast":
            $("body").css("background", "url(https://static.pexels.com/photos/24954/pexels-photo-24954.jpg) no-repeat center center fixed");
            $("body").css("color","black");
            break;

            case "Moderate rain":
            $("body").css("background", "url(https://static.pexels.com/photos/110874/pexels-photo-110874.jpeg) no-repeat center center fixed");
            break;

            case "Light rain":
            $("body").css("background", "url(https://static.pexels.com/photos/110874/pexels-photo-110874.jpeg) no-repeat center center fixed");
            break;


          default:
            $("body").css("background", "url(https://static.pexels.com/photos/4103/sky-sunny-flying-clouds.jpeg) no-repeat center center fixed");
        }

        //Current Temperature - centigrade
        console.log(json.current.temp_c);

        $('.or-temperature h2').text(json.current.temp_c);

        var celsius = json.current.temp_c;
        var fahrenheit = json.current.temp_f;

        $(".temp-button").click(function() {

          if ($(".temp-button").hasClass("celsius")) {

            $(".temp-button").html("&#176 F");
            $('.or-temperature h2').text(fahrenheit);
            $(".temp-button").removeClass("celsius");
            $(".temp-button").addClass("fahrenheit");          }

          else {
            $(".temp-button").html("&#176 C");
            $('.or-temperature h2').text(celsius);
            $(".temp-button").addClass("celsius");

          }

        });

        //current Windspeed - mph
        console.log(json.current.wind_mph);
        $('.or-wind-speed h2').text(json.current.wind_mph + " mph");

        $(".loading").hide();
        $("body").removeClass("while-loading");

      });




    });

  }






});
