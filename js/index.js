var search = document.getElementById('search-input');
var searchBtn = document.getElementById('search-btn');
var locationBtn = document.getElementById('locationBtn');

locationBtn.addEventListener('click', function () {
    userLocation();
});

searchBtn.addEventListener('click', function () {
    let userSearch = search.value;
    getWeather(userSearch);
});

document.addEventListener('keydown', function (e) {
    if (e.key == "Enter") {
        let userSearch = search.value;
        getWeather(userSearch);
    }
});

var allData = [];

async function getWeather(location) {
    try {
        var response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=f70659b4acec4bf0b5d234453241806&q=${location}&days=3`);
        var data = await response.json();
        allData = data.forecast.forecastday;
        console.log(data);
        displayData(data);
    } catch (error) {
        alert(error);
    }
}

getWeather("cairo");

function displayData(data) {
    var cartona = ``;
    for (let i = 0; i < allData.length; i++) {
        let date = new Date(allData[i].date);
        let dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        let dayNumber = date.toLocaleDateString('en-US', { day: 'numeric', month: 'long' });

        if (i == 0) {
            cartona += `
            <div class="col-sm-12 col-md-6 col-lg-4 ">
                <div class="card bg-light bg-opacity-25">
                    <div class="nav-card  d-flex justify-content-between align-item-center  text-white py-1 px-2">
                        <h5>${dayName}</h5>
                        <h5>${dayNumber}</h5>
                    </div>
                    <div class="card-body d-flex flex-column justify-content-between align-content-center text-center">
                        <p>${data.location.name}</p>
                        <h1 class="fw-bolder">${data.current.temp_c}°C</h1>
                        <img src="${data.current.condition.icon}" width="120" height="120" class=" imag" alt="">
                        <p>${data.current.condition.text}</p>
                        
                    </div>
                    <div class="card-footer bg-light bg-opacity-25  ">
                        <div class=" d-flex justify-content-between mx-4 ">
                            <div class="icon-c rounded-circle text-center mt-2 ">
                                <i class="fa-solid fa-umbrella fot-icon mb-5 "></i>
                            </div>
                            <div class="icon-c rounded-circle  text-center  mt-2 ">
                                <i class="fa-solid fa-wind fot-icon mb-5"></i>
                            </div>
                            <div class="icon-c rounded-circle  text-center   mt-2">
                                <i class="fa-regular fa-compass fot-icon mb-5"></i>
                            </div>
                        </div>
                        
                        <div class=" text-p text-center ">
                            <div class=" d-flex justify-content-between  ">
                                <div class="text-center mt-1 mx-4">
                                    <p>${data.current.humidity}%</p>
                                </div>
                                <div class=" text-center  mt-1">
                                    <p>${data.current.wind_kph} km/h</p>
                                </div>
                                <div class=" text-center mt-1 mx-4">
                                    <p>4${data.current.wind_dir}</p>
                                </div>
                            </div>
                            
                    </div>
                        
                    </div>
                </div>
            </div>`;
        } else {
            cartona += `
             <div class="col-sm-12 col-md-6 col-lg-4 ">
                <div
                    class="card bg-body-tertiary bg-opacity-25 d-flex flex-column justify-content-between align-content-center text-center">
                    <div
                        class="nav-card text-center d-flex justify-content-between align-item-center bg-warning  text-white py-1 px-2">
                        <h5>${dayName}</h5>
                        <h5>${dayNumber}</h5>
                    </div>
                    <div class="card-body text-center ">
                        <img src="${allData[i].day.condition.icon}" alt="">
                        <h1 class="fw-bolder my-5 ">${allData[i].day.maxtemp_c}°C</h1>
                        <h3>${allData[i].day.mintemp_c}°C</h3>
                        <p class="card-color">${allData[i].day.condition.text}</p>
                    </div>
                </div>
            </div>`;
        }
    }
    document.getElementById('weatherbktc').innerHTML = cartona;
}

function userLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;

            let loc = `${latitude},${longitude}`;
            getWeather(loc);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

