// Add dates to each weather slot
var cityName = document.getElementById("city-name")
var today = moment();
$("#currentDay").text(today.format("l"));
$("#date1").text(today.add(1, 'days').format("l"));
$("#date2").text(today.add(1, 'days').format("l"));
$("#date3").text(today.add(1, 'days').format("l"));
$("#date4").text(today.add(1, 'days').format("l"));
$("#date5").text(today.add(1, 'days').format("l"));


//clear history
function clearHistory(){
    localStorage.setItem('allCities', "[]")
    removeAllChildNodes(document.getElementById("search-history"))
    removeAllChildNodes(document.getElementById("search-history-mobile"))
}
document.getElementById("clear-history").addEventListener("click", clearHistory)
document.getElementById("clear-history-mobile").addEventListener("click", clearHistory)

//Default weather onLoad
var weather_api = 'https://api.openweathermap.org/data/2.5/weather?q=London,uk&units=imperial&APPID=17bd6f57b113fadbf97777a7da55a3ca'
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

var forecast_url = 'https://api.openweathermap.org/data/2.5/forecast?q=London,uk&units=imperial&APPID=17bd6f57b113fadbf97777a7da55a3ca'
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

//Search Weather
let searchFormMobile = document.getElementById("form-mobile")
var searchForm = document.getElementById("form-desktop");
searchForm.addEventListener("submit", searchWeather)
searchFormMobile.addEventListener("submit", searchWeather)

function searchWeather (event){
    event.preventDefault()

    var cityValue = document.getElementById("city-search").value
    var cityValueMobile = document.getElementById("city-search-mobile").value
    
    function mobile(cityValue, cityValueMobile) {
        if (cityValue === ""){
            return cityValueMobile;
        } else {
            return cityValue;
        }
    }
    

    var map_api = 'https://api.openweathermap.org/geo/1.0/direct?q='+mobile(cityValue, cityValueMobile)+'&limit=1&appid=17bd6f57b113fadbf97777a7da55a3ca'

    function locationToChords() {
    fetch(map_api)
        .then(response => {return response.json()})
        .then(function(data){
            localStorage.setItem("city", JSON.stringify(data[0].name))
            if (localStorage.getItem("init-data") != "true"){
                localStorage.setItem("init-data", "true")
            
                var allCities = []
                localStorage.setItem('allCities', JSON.stringify(allCities));
            }
            var initData = localStorage.getItem("init-data")
            if (initData = "true"){
                allCities = JSON.parse(localStorage.getItem("allCities"));
                allCities.push(JSON.parse(localStorage.getItem("city")));
                localStorage.setItem('allCities', JSON.stringify(allCities));
            }
            var lat = data[0].lat
            var lon = data[0].lon
            var choords = [lat,lon]
            localStorage.setItem("choords", JSON.stringify(choords))
            })
        // Create search history buttons on search
        .then(function(){
            
            searchHistory()

        })    
        .then(function(){
            var choords = JSON.parse(localStorage.getItem("choords"))
            var searchWeatherApi = 'https://api.openweathermap.org/data/2.5/forecast?lat='+choords[0]+'&lon='+choords[1]+'&units=imperial&&appid=17bd6f57b113fadbf97777a7da55a3ca'
            return fetch(searchWeatherApi)
                .then(response => {
            return response.json()
            })
                .then(data => {
    cityName.textContent = (data.city.name);
    
    console.log (data);
    var forecastedWeather = data.list[4]
    document.getElementById("temp").textContent = (forecastedWeather.main.temp)
    document.getElementById("wind").textContent = (forecastedWeather.wind.speed)
    document.getElementById("humidity").textContent = (forecastedWeather.main.humidity) 
    document.getElementById("weatherIcon").innerHTML = "<img src='https://openweathermap.org/img/w/" + forecastedWeather.weather[0].icon + ".png' alt='" + forecastedWeather.weather[0].main + "' />"
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
        })
        })
        .catch(error => alert (error))
        .finally(() => console.log("this is the end of the fetch request"))
    }
    locationToChords()
}

//Preform search from history buttons
function searchHistory(){
    var searchHistory = document.getElementById("search-history")
    removeAllChildNodes(searchHistory)
    var allCities = JSON.parse(localStorage.getItem("allCities"))
    var allCitiesLength = allCities.length
    var searchHistoryList = document.getElementById("search-history")

    var searchHistoryMobile = document.getElementById("search-history-mobile")
    removeAllChildNodes(searchHistoryMobile)
    var searchHistoryListMobile = document.getElementById("search-history-mobile")

    for(let i = 0; i < allCitiesLength; i++){
        var cityButton = document.createElement("button")
        cityButton.setAttribute("class", "search-history-button")
        cityButton.textContent = allCities[i]
        searchHistoryList.appendChild(cityButton)

        var cityButtonMobile = document.createElement("button")
        cityButtonMobile.setAttribute("class", "search-history-button-mobile")
        cityButtonMobile.textContent = allCities[i]
        searchHistoryListMobile.appendChild(cityButtonMobile)
    };  
   
    searchHistoryList.addEventListener("click", searchHistoryButtons)
    searchHistoryListMobile.addEventListener("click", searchHistoryButtons)

    function searchHistoryButtons (event){
        var cityValue = event.target.textContent
        var map_api = 'https://api.openweathermap.org/geo/1.0/direct?q='+cityValue+'&limit=1&appid=17bd6f57b113fadbf97777a7da55a3ca'
        function locationToChords() {
            fetch(map_api)
                .then(response => {return response.json()})
                .then(function(data){
                    localStorage.setItem("city", JSON.stringify(data[0].name))
                    if (localStorage.getItem("init-data") != "true"){
                        localStorage.setItem("init-data", "true")
                    
                        var allCities = []
                    allCities.push(JSON.parse(localStorage.getItem("city")));
                    localStorage.setItem('allCities', JSON.stringify(allCities));
                    return;
                    }
                    var initData = localStorage.getItem("init-data");
                    if (initData = "true"){
                        allCities = JSON.parse(localStorage.getItem("allCities"));
                        allCities.push(JSON.parse(localStorage.getItem("city")));
                        localStorage.setItem('allCities', JSON.stringify(allCities));
                    }
                    var lat = data[0].lat
                    var lon = data[0].lon
                    var choords = [lat,lon]
                    localStorage.setItem("choords", JSON.stringify(choords))
                    })
                .then(function(){
                    var choords = JSON.parse(localStorage.getItem("choords"))
                    var searchWeatherApi = 'https://api.openweathermap.org/data/2.5/forecast?lat='+choords[0]+'&lon='+choords[1]+'&units=imperial&&appid=17bd6f57b113fadbf97777a7da55a3ca'
                    return fetch(searchWeatherApi)
                        .then(response => {
                    return response.json()
                    })
                        .then(data => {
            cityName.textContent = (data.city.name);
            
            console.log (data);
            var forecastedWeather = data.list[4]
            document.getElementById("temp").textContent = (forecastedWeather.main.temp)
            document.getElementById("wind").textContent = (forecastedWeather.wind.speed)
            document.getElementById("humidity").textContent = (forecastedWeather.main.humidity) 
            document.getElementById("weatherIcon").innerHTML = "<img src='https://openweathermap.org/img/w/" + forecastedWeather.weather[0].icon + ".png' alt='" + forecastedWeather.weather[0].main + "' />"
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
                })
                })
                .catch(error => console.log (error))
                .finally(() => console.log("this is the end of the fetch request"))
            }
            locationToChords()
            
    console.log("search")
    }
}
searchHistory()


function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const openMenuBtn = document.getElementById('open-menu');
const closeMenuBtn = document.getElementById('close-menu');
const overlayMenu = document.getElementById('overlay-menu');

openMenuBtn.addEventListener('click', () => {
  overlayMenu.classList.add('open');
  openMenuBtn.classList.add('open');
});

closeMenuBtn.addEventListener('click', () => {
  overlayMenu.classList.remove('open');
  openMenuBtn.classList.remove('open');
});
