// Add dates to each weather slot
var cityName = document.getElementById("city-name")
var today = moment();
$("#currentDay").text(today.format("l"));
$("#date1").text(today.add(1, 'days').format("l"));
$("#date2").text(today.add(1, 'days').format("l"));
$("#date3").text(today.add(1, 'days').format("l"));
$("#date4").text(today.add(1, 'days').format("l"));
$("#date5").text(today.add(1, 'days').format("l"));

//Default weather onLoad
var weather_api = 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&units=imperial&APPID=17bd6f57b113fadbf97777a7da55a3ca'
async function defaultWeather() {
    const responce = await fetch(weather_api);
    const data = await responce.json();
    cityName.textContent = (data.name);
    const { main, wind, weather } = data;
    console.log (data);
    document.getElementById("temp").textContent = (main.temp)
    document.getElementById("wind").textContent = (wind.speed)
    document.getElementById("humidity").textContent = (main.humidity) 
    document.getElementById("weatherIcon").innerHTML = "<img src='https://openweathermap.org/img/w/" + weather[0].icon + ".png' alt='" + weather[0].main + "' />"
}
defaultWeather()

var forecast_url = 'http://api.openweathermap.org/data/2.5/forecast?q=London,uk&units=imperial&APPID=17bd6f57b113fadbf97777a7da55a3ca'
async function defaultForecastWeather() {
    const responce = await fetch(forecast_url);
    const data = await responce.json();
    console.log (data);
    var idBank = [
        ["temp1", "wind1", "humidity1", "weatherIcon1"],
        ["temp2", "wind2", "humidity2", "weatherIcon2"],
        ["temp3", "wind3", "humidity3", "weatherIcon3"],
        ["temp4", "wind4", "humidity4", "weatherIcon4"],
        ["temp5", "wind5", "humidity5", "weatherIcon5"],
    ]
    
    for (i = 0, j = 4; i < 5; i++, j += 8){
    var forecastedDay = data.list[j]
    document.getElementById(idBank[i][0]).textContent = (forecastedDay.main.temp)
    document.getElementById(idBank[i][1]).textContent = (forecastedDay.wind.speed)
    document.getElementById(idBank[i][2]).textContent = (forecastedDay.main.humidity)
    document.getElementById(idBank[i][3]).innerHTML = "<img src='https://openweathermap.org/img/w/" + forecastedDay.weather[0].icon + ".png' alt='" + forecastedDay.weather[0].main + "' />"
    }
}
defaultForecastWeather()