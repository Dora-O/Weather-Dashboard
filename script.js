var currentDate = moment().format('L');
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
    var uvURL = "http://api.openweathermap.org/data/2.5/uvi?";
    var fiveDayForecast = "http://api.openweathermap.org/data/2.5/forecast?q=";
    var unitsURL = "&units=imperial";

    saveSearch(QUERY);

    $(".lead").text(currentDate);


    $.ajax({
        url: weatherURL + QUERY + unitsURL + API_KEY,
        method: "GET"
    })

        .then(function (currentRes) {

            $("#location").html(currentRes.location);
            $("#temp").html(currentRes.main.temp);
            $("#wind").html(currentRes.wind.speed);
            $("#humidity").html(currentRes.main.humidity);

            $.ajax({
                url: uvURL + formatUVQuery(currentRes.coord.lon, currentRes.coord.lat) + API_KEY,
                method: "GET"
            })
                .then(function (uvRes) {
                    $("#uvIndex").html(uvRes.value)
                })
        })


    var iconPath = weatherRes.weather[0].icon;
    var iconURL = "https://openweathermap.org/img/wn/" + iconPath + "@2x.png";

    var IMG1 = $("<img>");
    IMG1.attr("src", iconURL);
    $("#icon").html(IMG1);

    $.ajax({
        url: fiveDayForecastURL + QUERY + unitsURL + API_KEY,
        method: "GET"
    })
        .then(function (forecastRes) {
            //DAY 1
            var dateOne = moment().add(1, 'days').format('L');
            $("#date1").html(dateOne);

            var icon5dayPath1 = forecastRes.list[2].weather[0].icon;
            var icon5dayURL1 = "https://openweathermap.org/img/wn/" + icon5dayPath1 + "@2x.png";

            var iconDay1 = $("<img>");
            iconDay1.attr("src", icon5dayURL1);
            $("#icon1").html(iconDay1);

            $("#temp1").html(forecastRes.list[2].main.temp);
            $("#humid1").html(forecastRes.list[2].main.humidity);

            //DAY 2
            var dateTwo = moment().add(2, 'days').format('L');
            $("#date2").html(dateTwo);

            var icon5dayPath2 = forecastRes.list[9].weather[0].icon;
            var icon5dayURL2 = "https://openweathermap.org/img/wn/" + icon5dayPath2 + "@2x.png";

            var iconDay2 = $("<img>");
            iconDay2.attr("src", icon5dayURL2);
            $("#icon2").html(iconDay2);

            $("#temp2").html(forecastRes.list[9].main.temp);
            $("#humid2").html(forecastRes.list[9].main.humidity);

            //DAY 3
            var dateThree = moment().add(3, 'days').format('L');
            $("#date3").html(dateThree);

            var icon5dayPath3 = forecastRes.list[17].weather[0].icon;
            var icon5dayURL3 = "https://openweathermap.org/img/wn/" + icon5dayPath3 + "@2x.png";

            var iconDay3 = $("<img>");
            iconDay3.attr("src", icon5dayURL3);
            $("#icon3").html(iconDay3);

            $("#temp3").html(forecastRes.list[17].main.temp);
            $("#humid3").html(forecastRes.list[17].main.humidity);

            //DAY 4
            var dateFour = moment().add(4, 'days').format('L');
            $("#date4").html(dateFour);

            var icon5dayPath4 = forecastRes.list[25].weather[0].icon;
            var icon5dayURL4 = "https://openweathermap.org/img/wn/" + icon5dayPath4 + "@2x.png";

            var iconDay4 = $("<img>");
            iconDay4.attr("src", icon5dayURL4);
            $("#icon4").html(iconDay4);

            $("#temp4").html(forecastRes.list[25].main.temp);
            $("#humid4").html(forecastRes.list[25].main.humidity);

            //DAY 5
            var dateFive = moment().add(5, 'days').format('L');
            $("#date5").html(dateFive);

            var icon5dayPath5 = forecastRes.list[33].weather[0].icon;
            var icon5dayURL5 = "https://openweathermap.org/img/wn/" + icon5dayPath5 + "@2x.png";

            var iconDay5 = $("<img>");
            iconDay5.attr("src", icon5dayURL5);
            $("#icon5").html(iconDay5);

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
