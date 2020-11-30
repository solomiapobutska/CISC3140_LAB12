var x = document.getElementById("location");

window.onload = function getLocation() {
    if (navigator.geolocation) {                             navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) { 
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;     
 
  // api call to get the forecast
  var key = "2feb15cbba8afde99313054a499207f5";
  var temp;
  var icon;
  var summary;
  var degree = "F";
  var time;
  var sunSet;
  var sunRise;
 
$.ajax({
    type: 'GET',
    crossDomain: true,
    dataType: "jsonp",
    url: "https://api.darksky.net/forecast/" + key + '/' + latitude + ',' + longitude,
  success: function(response) {
    time = response.currently.time;
    sunSet = response.daily.data[0].sunsetTime;
    sunRise = response.daily.data[0].sunriseTime;
    temp = response.currently.temperature;
    icon = response.currently.icon;//"clear-day"//
    summary = response.currently.summary;
    console.log(icon);
    $('#temperature').html(temp + ' ' + degree);
    $('#summary').html(summary );
    
    if (time < sunSet && time > sunRise) {
      $('body').addClass('day') 
    } else {
      $('body').addClass('night') 
    }
    
    switch(icon) {
      case "clear-day":
        $('#sunny').css("display", "block")
        $('#snow').css("display", "none")
        $('#starryNight').css("display", "none")        
        break;
        
      case "clear-night":
         $('#sunny').css("display", "none")
         $('#snow').css("display", "none") 
         $('#starryNight').css("display", "block")
         break;
        
        case "rain":
         createRain();
         $('#sunny').css("display", "none")   
         $('#snow').css("display", "none") 
         $('body').addClass('rain') 
         $('p, h1').css('color', '#f0efef')
         break;
      
         case "snow":
         $('#snow').css("display", "block") 
         $('#sunny').css("display", "none")     
         $('p, h1').css('color', '#393E46')
         break;
        
      /*default:
         $('#snow').css("display", "none") 
         $('#sunny').css("display", "none")     
         $('p, h1').css('color', '#393E46')*/
 }
    },
    
    error: function(xhr) {
        $('#temperature').html("We apologize, there's no weather forecast available for this location ");
    }
});
  
  
  
  //api call to convert longitute and latitude to a city, state and a country
  var gKey = 'AIzaSyAGtWV4pe-R6IVDYvJ190pjO6K4mTFf2Wc';
  $.ajax({
  url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=' + gKey,
    
  success: function(results) {
      var city =  results.results[0].address_components[2].long_name;
      var state = results.results[0].address_components[4].short_name;
      var country = results.results[0].address_components[5].short_name;
     x.innerHTML = city + ', ' + state + ' ' + country;
  }

});

}

/*rain js */
// number of drops created.
var nbDrop = 858; 

// function to generate a random number range.
function randRange( minNum, maxNum) {
  return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
}

// function to generate drops
function createRain() {

  for( i=1;i<nbDrop;i++) {
  var dropLeft = randRange(0,1600);
  var dropTop = randRange(-1000,1400);

  $('.rain').append('<div class="drop" id="drop'+i+'"></div>');
  $('#drop'+i).css('left',dropLeft);
  $('#drop'+i).css('top',dropTop);
  }

}