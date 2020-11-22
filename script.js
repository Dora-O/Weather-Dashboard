// Use the [OpenWeather API](https://openweathermap.org/api)

//     Weather API
//     - http://api.openweathermap.org/data/2.5/weather
//     example query:
//     http://api.openweathermap.org/data/2.5/weather?q=austin&appid=YOUR_API_KEY&units=imperial

//     Forcast API
//     - http://api.openweathermap.org/data/2.5/forecast
//     example query:
//     http://api.openweathermap.org/data/2.5/forecast?q=austin&appid=YOUR_API_KEY&units=imperial


//     UVI API
//     - http://api.openweathermap.org/data/2.5/uvi

//     Use weather API to get longitude and latitude coordinates
//     example query:
//     http://api.openweathermap.org/data/2.5/uvi?appid=YOUR_API_KEY&lat=30.27&lon=-97.74


// // weather API
// $.ajax({}).then(function(response) {
//     consol.log(response);

//     // UVI API => pass coordinates from weather API to UVI API
//     $.ajax({}).then(function(response){

//     });

//     // 5 day forcast 
//     $.ajax({}).then(function(response){

//     });
// });
var currentDate = moment().format('L');
var API_KEY = "&appid=5399e17af7698732d442019e211d361b";
var cities = JSON.parse(localStorage.getItem('cities')) || [];

$("#search-input").keyup(function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();        
        $("#searchBtn").click();
    }
});


$("#searchBtn").on("click", function(){});