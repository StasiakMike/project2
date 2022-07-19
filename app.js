

/* map setup */
let map = L.map('map').setView([0, 0], 3);

/*base layer setup */
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 13,
    attribution: '© OpenStreetMap'
}).addTo(map);

/*country borders layer setup */
fetch(`countryBorders.geo.json`)
    .then(function(response){
        return response.json();
    })
    .then(function (data){
        L.geoJSON(data).addTo(map)
        console.log(data)
    })

/*custom style for scope counteries */
let mapStyle = {
    fill: "orange"
}


/*define the marker */
const myIcon = L.icon({
    iconUrl: 'assets/logo4.svg',
    iconSize:     [38, 95], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});


/* current position and setting up the marker*/
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    document.getElementById("location").innerHTML =
    "Geolocation is not supported by this browser or cannot be displayed";
  }
  
  function showPosition(position) {
    document.getElementById("location").innerHTML =
    "<b>Your current position:</b><br>" +
    "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude; 
    let marker = L.marker([position.coords.latitude, position.coords.longitude], {icon: myIcon}).addTo(map);
    marker.bindPopup("<b>Your current location</b>").openPopup();
  }


function onMapClick(e) {
    
    /*catching latitude and longitude and cut to intiger as most of API dont accept decimals. Its not target aquisition system
    for Royal Artilery*/
    let myLat = Math.round(e.latlng.lat);
    let myLng = Math.round(e.latlng.lng); 
    /*console.log(myLat);
    console.log(myLng); */
    
    /*get country code from API*/
    fetch(`http://api.geonames.org/countryCodeJSON?formatted=true&lat=${myLat}&lng=${myLng}&username=mikesss&style=full`)
    .then(res => res.json())
    .then(data => {
        /*console.log(data.countryCode)
      document.querySelector("#data-output1").innerHTML =   */
      let countryCode = data.countryCode;   

            /*get country capital, population, languages from API*/
            fetch(`http://api.geonames.org/countryInfoJSON?formatted=true&lang=en&country=${countryCode}&username=mikesss&style=full`)
            .then(res => res.json())
            .then(data => {
            /*console.log(data.geonames[0].capital) */
            document.querySelector("#data-output1").innerHTML =  "Capital: " + data.geonames[0].capital +
                                                                "<br>Languages: " +  data.geonames[0].languages +
                                                                "<br>Population: " + data.geonames[0].population +
                                                                "<br>Area: " + data.geonames[0].areaInSqKm + " Km<sup>2</sup>"
        
            })
            .catch(error => console.log('Ooops some errors here...'))



    })
    .catch(error => console.log('Ooops some errors here...'))


    /* get country name, flag, currency */
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${myLat}+${myLng}&key=1b4732ddd4624b1fa61cf45b49878bea`)
    .then(res => res.json())
    .then(data => {
        /*console.log(data.results[0]) */
        let clickedCountry = data.results[0].components.country;
        let clickedCountryFlag = data.results[0].annotations.flag;
        document.querySelector("#data-output").innerHTML =  "<b>Clicked location:</b><br>" + 
                                                            "Country: " + data.results[0].components.country + " " + data.results[0].annotations.flag + "<br>" +
                                                            "Currency: " + data.results[0].annotations.currency.iso_code + "<br>" 
    /* add marker with country name and flag */                                                        
    let marker = L.marker([e.latlng.lat, e.latlng.lng], {icon: myIcon}).addTo(map);
    marker.bindPopup(clickedCountry + " " + clickedCountryFlag ).openPopup();
                                                            
    })
    .catch(error => console.log('Ooops some errors here...'))

    
    


    /*get wikipedia links from API*/
    fetch(`http://api.geonames.org/findNearbyWikipediaJSON?formatted=true&lat=${myLat}&lng=${myLng}&username=mikesss&style=full`)
    .then(res => res.json())
    .then(data => {
      /*console.log(data.geonames[0].wikipediaUrl) */
        document.querySelector("#data-output2").innerHTML =  "Wikipedia links: " + "https://www." + data.geonames[0].wikipediaUrl
                                                             
    })
    .catch(error => console.log('Ooops some errors here...'))


   /*get weather from API*/
   fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLng}&appid=56c55e9964f7d03830817873684446de&units=metric`)
   .then(res => res.json())
   .then(data => {
       /*console.log(data)*/
       document.querySelector("#data-output3").innerHTML =  "<b>Weather for location:</b><br>" + 
                                                           "Temperature: " + data.main.temp + " C<br>" +
                                                           "Wind speed: " + data.wind.speed + " m/s<br>" + 
                                                           "Clouds: " + data.weather[0].description + 
                                                           "<br>Visibility: " + data.visibility + " m"   
   })
   .catch(error => console.log('Ooops some errors here...'))


    /*fire alert with coordinates 
    alert("You clicked the map at " + e.latlng);*/
}
map.on('click', onMapClick);










    




