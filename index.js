let weather = {
    apiKey: "80ece4bdf9d87edac71a3853c1e49c97",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city 
            + "&units=imperial&appid=" 
            + this.apiKey
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity} = data.main;
        const {speed} = data.wind;
        console.log(name,icon,description,temp,humidity,speed)
        document.querySelector(".city").textContent = "Weather in " + name;
        document.querySelector(".icon").src = 
           "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").textContent = description;
        document.querySelector(".temp").textContent = Math.floor(temp) + "°F";
        document.querySelector(".humidity").textContent =  
            "Humidity: " + humidity + "%";
        document.querySelector(".wind").textContent = 
            "Wind speed: " + speed + " mph";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name +"')"
    },
    search:function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
        document.querySelector(".search-bar").value = '';
    }
}; 

document
.querySelector(".search button")
.addEventListener("click",function () {
    weather.search();
}); 

document.querySelector(".search-bar").addEventListener("keyup", function (event){
    if (event.key == "Enter") {
        weather.search();
    }
});