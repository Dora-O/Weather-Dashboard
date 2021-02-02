var currentDate = moment().format('MMM Do YYYY');
var API_KEY = "&appid=5399e17af7698732d442019e211d361b";
var cities = JSON.parse(localStorage.getItem('cities')) || [];

$("#search-input").keyup(function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        $("#searchBtn").click();
    }
});

$("#searchBtn").on("click", function () {
    var QUERY = $("#search-input").val().trim();
    getData(QUERY);
    $("#search-input").attr("placeholder", "Enter another city");
    cities.unshift(QUERY);
    localStorage.setItem("cities", JSON.stringify(cities))

    renderButons();
});

function formatUVQuery(lon, lat) {
    return "&lon=" + lon + "&lat=" + lat
}

function init() {
    var query = localStorage.getItem('city') || 'Austin';
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

        .then(function (currentRes) {

            $("#location").html(currentRes.location);
            $("#temp").html(currentRes.main.temp);
            $("#wind").html(currentRes.wind.speed);
            $("#humidity").html(currentRes.main.humidity);
            $("#description").html(currentRes.weather[0].description)

            $.ajax({
                url: uvURL + formatUVQuery(currentRes.coord.lon, currentRes.coord.lat) + API_KEY,
                method: "GET"
            })
                .then(function (uvRes) {
                    $("#uvIndex").html(uvRes.value)
                })
        })


    // var iconPath = currentRes.weather[0].icon;
    // console.log(currentRes)
    // var iconURL = "https://openweathermap.org/img/wn/" + iconPath + "@2x.png";
    // $("#icon").html("<img src='" + iconUrl  + "'>");

    $.ajax({
        url: fiveDayForecastURL + QUERY + unitsURL + API_KEY,
        method: "GET"
    })
        .then(function (forecastRes) {
            //DAY 1
            var dateOne = moment().add(1, 'days').calendar();
            $("#date1").html(dateOne);
            $("#temp1").html(forecastRes.list[0].main.temp);
            $("#humid1").html(forecastRes.list[0].main.humidity);
            console.log(forecastRes)


            //DAY 2
            var dateTwo = moment().add(2, 'days').calendar();
            $("#date2").html(dateTwo);
            $("#temp2").html(forecastRes.list[9].main.temp);
            $("#humid2").html(forecastRes.list[9].main.humidity);

            //DAY 3
            var dateThree = moment().add(3, 'days').calendar();
            $("#date3").html(dateThree);
            $("#temp3").html(forecastRes.list[17].main.temp);
            $("#humid3").html(forecastRes.list[17].main.humidity);

            //DAY 4
            var dateFour = moment().add(4, 'days').calendar();
            $("#date4").html(dateFour);
            $("#temp4").html(forecastRes.list[25].main.temp);
            $("#humid4").html(forecastRes.list[25].main.humidity);

            //DAY 5
            var dateFive = moment().add(5, 'days').calendar();
            $("#date5").html(dateFive);
            $("#temp5").html(forecastRes.list[33].main.temp);
            $("#humid5").html(forecastRes.list[33].main.humidity);
        })
}
function saveSearch(city) {

    localStorage.setItem('city', city);
}

$("#city-list").on("click", ".searches", function () {
    var queryBtn = $(this).text();
    getWeather(queryBtn);
    saveSearch(queryBtn);
})

init();

function renderButons() {

    $("#city-list").empty();
    for (i = 0; i < cities.length; i++) {
        newCity = $("<button></button>").append(cities[i]).addClass("btn btn-light m-1 searches mb-2");
        $("#city-list").append(newCity);
        cities = cities.slice(0, 5);
    }

    $("#search-input").val("");
}
