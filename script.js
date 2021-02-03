var currentDate = moment().format('MMM Do YYYY');
var API_KEY = "&appid=5399e17af7698732d442019e211d361b";
var cities = JSON.parse(localStorage.getItem('cities')) || [];
var userInput = document.querySelector("#search-input");
var searchBtn = document.querySelector("#searchBtn");
var clearBtn = document.querySelector("#clearBtn");

$("#search-input").keyup(function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        $("#searchBtn").click();
    }
});

$("#searchBtn").on("click", function () {
    var QUERY = $("#search-input").val().trim();
    getWeather(QUERY);
    // console.log(QUERY)
    // console.log(getWeather)
    $("#search-input").attr("placeholder", "Enter another city");
    cities.unshift(QUERY);
    localStorage.setItem("cities", JSON.stringify(cities))

    renderButons();
});

function formatUVQuery(lon, lat) {
    return "&lon=" + lon + "&lat=" + lat
}

function init() {
    var query = localStorage.getItem('city') || [];
    getWeather(query);
    renderButons();
}

function getWeather(QUERY) {
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=";
    var uvURL = "https://api.openweathermap.org/data/2.5/uvi?";
    var fiveDayForecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=";
    var unitsURL = "&units=imperial";

    saveSearch(QUERY);

    $(".date").text(currentDate);


    $.ajax({
        url: weatherURL + QUERY + unitsURL + API_KEY,
        method: "GET"
    })
        //will grab current weather info and display it on the webpage
        .then(function (currentRes) {
            $("#location").html(localStorage.getItem('city'))
            $("#location").html(currentRes.location);
            $("#temp").html(Math.floor(currentRes.main.temp));
            $("#wind").html(currentRes.wind.speed + " mph");
            $("#humidity").html(currentRes.main.humidity + " %");
            // $("#description").html(currentRes.weather[0].icon)

            var iconPath = currentRes.weather[0].icon;
            // console.log(currentRes)
            var iconURL = "http://openweathermap.org/img/wn/" + iconPath + "@2x.png";
            //previous icon issues was due to url showing https instead of http - this will show icon of weather description 
            $("#description").html("<img src='" + iconURL + "'>");

            $.ajax({
                url: uvURL + formatUVQuery(currentRes.coord.lon, currentRes.coord.lat) + API_KEY,
                method: "GET"
            })

                .then(function (uvRes) {
                    // console.log(uvRes)
                    // console.log(Math.floor(uvRes.value));
                    // console.log(uvRes.value)
                    var uvValue = JSON.parse(uvRes.value)
                    if (uvValue <= 2) {
                        $("#uvIndex").addClass("favorable");
                    }
                    else if (3 < uvValue < 7) {
                        $("#uvIndex").addClass("moderate");
                    }
                    else($("#uvIndex").addClass("severe"));

                    $("#uvIndex").html(uvRes.value)
                })
        })

    $.ajax({
        url: fiveDayForecastURL + QUERY + unitsURL + API_KEY,
        method: "GET"
    })
        //will grab fiveday weather info and display it on the webpage
        .then(function (forecastRes) {
            //DAY 1
            var dateOne = moment().add(1, 'days').format('MMM Do YYYY');
            //shows date
            $("#date1").html(dateOne);
            //shows temp for said date
            $("#temp1").html(Math.floor(forecastRes.list[0].main.temp));
            //shows humidity for said date 
            $("#humid1").html(forecastRes.list[0].main.humidity);
            //shows description ie clear skys etc since i was not able to get the icons to appear on webpage
            // $("#description1").html(forecastRes.list[0].weather[0].description)
            var iconPath1 = forecastRes.list[0].weather[0].icon;
            // console.log(iconPath1)
            var iconURL = "http://openweathermap.org/img/wn/" + iconPath1 + "@2x.png";
            //previous icon issues was due to url showing https instead of http - this will show icon of weather description 
            $("#description1").html("<img src='" + iconURL + "'>");

            //DAY 2
            var dateTwo = moment().add(2, 'days').format('MMM Do YYYY');
            $("#date2").html(dateTwo);
            $("#temp2").html(Math.floor(forecastRes.list[9].main.temp));
            $("#humid2").html(forecastRes.list[9].main.humidity);
            // $("#description2").html(forecastRes.list[9].weather[0].description)
            var iconPath2 = forecastRes.list[9].weather[0].icon;
            var iconURL = "http://openweathermap.org/img/wn/" + iconPath2 + "@2x.png";
            $("#description2").html("<img src='" + iconURL + "'>");

            //DAY 3
            var dateThree = moment().add(3, 'days').format('MMM Do YYYY');
            $("#date3").html(dateThree);
            $("#temp3").html(Math.floor(forecastRes.list[17].main.temp));
            $("#humid3").html(forecastRes.list[17].main.humidity);
            // $("#description3").html(forecastRes.list[17].weather[0].description)
            var iconPath3 = forecastRes.list[17].weather[0].icon;
            var iconURL = "http://openweathermap.org/img/wn/" + iconPath3 + "@2x.png";
            $("#description3").html("<img src='" + iconURL + "'>");

            //DAY 4
            var dateFour = moment().add(4, 'days').format('MMM Do YYYY');
            $("#date4").html(dateFour);
            $("#temp4").html(Math.floor(forecastRes.list[25].main.temp));
            $("#humid4").html(forecastRes.list[25].main.humidity);
            // $("#description4").html(forecastRes.list[25].weather[0].description)
            var iconPath4 = forecastRes.list[25].weather[0].icon;
            var iconURL = "http://openweathermap.org/img/wn/" + iconPath4 + "@2x.png";
            $("#description4").html("<img src='" + iconURL + "'>");

            //DAY 5
            var dateFive = moment().add(5, 'days').format('MMM Do YYYY');
            $("#date5").html(dateFive);
            $("#temp5").html(Math.floor(forecastRes.list[33].main.temp));
            $("#humid5").html(forecastRes.list[33].main.humidity);
            // $("#description5").html(forecastRes.list[33].weather[0].description)
            var iconPath5 = forecastRes.list[33].weather[0].icon;
            var iconURL = "http://openweathermap.org/img/wn/" + iconPath5 + "@2x.png";
            $("#description5").html("<img src='" + iconURL + "'>");
        })
}

function saveSearch(city) {
    localStorage.setItem('city', city);
}

//will clear list and local storage
$("#clearBtn").on("click", function () {
    window.localStorage.clear()
    $("#city-list").empty();
});

$("#city-list").on("click", ".searches", function () {
    var queryBtn = $(this).text();
    getWeather(queryBtn);
    saveSearch(queryBtn);
})

init();

function renderButons() {
    $("#city-list").empty();
    //adds cities to list and will only show the 5 most recent cities 
    for (i = 0; i < cities.length; i++) {
        newCity = $("<button></button>").append(cities[i]).addClass("btn btn-light m-1 searches mb-2");
        $("#city-list").append(newCity);
        cities = cities.slice(0, 5);
    }

    $("#search-input").val("");
};
