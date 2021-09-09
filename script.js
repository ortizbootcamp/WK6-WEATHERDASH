// API & Variables

var myAPI = "&appid=12c8d7d987e144d10fd28bd86cd762a1"
var currentRequest = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + myAPI
var fiveDayRequest = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial" + myAPI
var currentWeather = "";
var storedCity = "";
var city = $(".cityform").val();

// Listener for New City

$(".btn").on("click", function (event) {

    currentWeather = $(".cityform").val();

    getCurrentWeather(event);
    event.preventDefault();

})

// Listener for Old Cities

$(".storedcity").on("click", function (event) {
    
    $(".cityform").val(event.target.textContent);
    currentWeather = $("cityform").val();
    
    getCurrentWeather(event);
    event.preventDefault();

})

// 

function cityStorage() {
    var rSearch = JSON.parse(localStorage.getItem("cities")) || []
    for (var i = 0; i  < rSearch.length; i++) {

        while (rSearch.length > 5) {
            var fiveSearches = rSearch.length - 5;
            var index = 0;
            rSearch.splice(index, fiveSearches);
            index++;
        }
        // Trying to figure out past city list here*
}
}
cityStorage();



// Current City Weather

function getCurrentWeather(event) {

    let city = $(".cityform").val();
    currentWeather = $(".cityform").val();

    let currentRequest = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + myAPI;

    fetch(currentRequest)
    .then(function (response) {

        return response.json();
    })
        .then(function (response) {

        cityStorage();
        getFiveWeather(event);

        $("#cname").text(response.cname);

        let cWeatherCard = 
        `<h5>${response.name}</h5>
        <ul>
        <li>Temperature: ${response.main.temp};</li>
        <li>Humidity: ${response.main.humidity};</li>
        <li>Wind Speed: ${response.wind.speed};</li>
        </ul>`;

        $("#current").html(cWeatherCard);
        });

}

// Five Day Weather

function getFiveWeather() {

    let city = $(".cityform").val();
    currentWeather = $(".cityform").val();

    let fiveDayRequest = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial" + myAPI;

    fetch(fiveDayRequest)
    .then(function (response) {

        return response.json();
    })

        .then (function (response) {

            let fiveDayCard = ``

            for (let i = 0; i < response.list.length; i++) {
                let dayta = response.list[i];
                let timeZUTC = dayta.dt;
                let tZone = response.city.timezone;
                let tZoneHrs = tZone / 60 / 60;
                let thisMoment = moment.unix(timeZUTC).utc().utcOffset(tZoneHrs);

                if (thisMoment.format("HH:mm:ss") === "11:00:00" || thisMoment.format("HH:mm:ss") === "12:00:00" || thisMoment.format("HH:mm:ss") === "13:00:00") {
                    fiveDayCard += 
                    `
                    <ul>
                    <li>${thisMoment.format("MM/DD/YY")}</li>
                    <li>Temperature: ${dayta.main.temp}</li>
                    <li>Humidity: ${dayta.main.humidity}</li>
                    </ul>
                    `
                }
            }

            
            $("#fcard").html(fiveDayCard);

        })
    }

