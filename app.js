
//Loader display
$(window).on("load",function(){
    $(".loader-container").fadeOut(1500);
});

/* map setup */
let map = L.map('map').setView([51, 0], 3);

/*base layer setup */
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 13,
    attribution: '© OpenStreetMap'
}).addTo(map);

/*country borders layer setup
fetch(`countryBorders.geo.json`)
    .then(function(response){
        return response.json();
    })
    .then(function (data){
        L.geoJSON(data).addTo(map)
        console.log(data.features[100].properties.name)
    }) */

  /* colouring nad highlighting block start */ 

let Countries;
let geojson;

$.getJSON("countryBorders.geo.json", function(data) {
	Countries = data;
    L.geoJson(Countries, {style: style}).addTo(map);
    geojson = L.geoJson(Countries, {
        style: style,
        onEachFeature: onEachFeature
    }).addTo(map);
    buildSelect();
});

function buildSelect() {

}
/* o
wn map styles applied */ 
function getColor() {
    return '#800026'    
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties),
        weight: 2,
        opacity: 1,
        color: 'green',
        dashArray: '2',
        fillOpacity: 0.1
    };
}

// L.geoJson(Countries).addTo(map);
// L.geoJson(Countries, {style: style}).addTo(map);
  
/* mouseover highlight */  
  function highlightFeature(e) {
      var layer = e.target;
  
      layer.setStyle({
          weight: 5,
          color: '#5af542',
          dashArray: '',
          fillOpacity: 0.7
      });
  
      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
          layer.bringToFront();
      }
      /*info.update(layer.feature.properties);*/
  }
  
  function resetHighlight(e) {
      geojson.resetStyle(e.target);
      /*info.update();*/
  }
  
  function zoomToFeature(e) {
      map.fitBounds(e.target.getBounds());
  }
  
  function onEachFeature(feature, layer) {
      layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          click: zoomToFeature
      });
  }
  
console.log("ładowanie danych: " + Countries);
  
  /*coloring nad higlighting - block ends */


/*define the marker */
const myIcon = L.icon({
    iconUrl: 'assets/logo4.svg',
    iconSize:     [38, 95], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

const myIconSmall = L.icon({
    iconUrl: 'assets/logo4.svg',
    iconSize:     [1, 1], // size of the icon
    iconAnchor:   [1, 1], // point of the icon which will correspond to marker's location
    popupAnchor:  [1, 1] // point from which the popup should open relative to the iconAnchor
});


/* current position and setting up the marker*/
if (navigator.geolocation) navigator.geolocation.getCurrentPosition(showPosition);
else document.getElementById("location").innerHTML = "Geolocation is not supported by this browser or cannot be displayed";

function showPosition(position) {
    document.getElementById("location").innerHTML =
    "<b>Your current position:</b><br>" +
    "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude; 
    let marker = L.marker([position.coords.latitude, position.coords.longitude], {icon: myIcon}).addTo(map);
    marker.bindPopup('<b>Your current location</b>').openPopup();
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
        //console.log(data.countryCode);
      //document.querySelector("#data-output1").innerHTML =   */
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

            //console.log(countryCode);
            let countryCodeLowercase = countryCode.toLowerCase();
            //console.log(countryCodeLowercase);

            fetch(`https://www.triposo.com/api/20220705/poi.json?countrycode=${countryCodeLowercase}&count=51&account=6BHFQUHX&token=aneyzbmlp24indiz93ki4milmjewdtts`)
                .then(res => res.json())
                .then(data => {
                //console.log(data);
                let markers = data.results

                markers.forEach(getMarkers);

                function getMarkers(item) {
                // console.log(item.name, item.coordinates.longitude, item.coordinates.latitude);
                L.marker([item.coordinates.latitude, item.coordinates.longitude]).addTo(map).bindPopup("<b>" + item.name + "</b>" + "<br>" + item.snippet + "<br>");
    
                }
            })

            .catch(error => console.log('Ooops some errors here...'))
           
    })
    .catch(error => console.log('Ooops some errors here...'))

    /*
    var markers = L.markerClusterGroup();
    markers.addLayer(L.marker(marker2, marker3, marker4, marker5));

    map.addLayer(markers);
    */


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
    let marker = L.marker([e.latlng.lat, e.latlng.lng], {icon: myIconSmall}).addTo(map);
    marker.bindPopup(clickedCountry + " " + clickedCountryFlag + '<br><br><button>See POIs</button' ).openPopup();
                                                            
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

//Footer set up  - FIX IT+++++++++++++++++++++++++++++++++++++++++++++++++++++++
var footer = L.control({position: 'bottomleft'});

footer.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'footer')
    
        this.div.innerHTML = '<span>Michal Stasiak</span>';
       
    return div;
};

footer.addTo(map);

/* TEST AREA +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
$('#btnRun3').click(function() {

    $('#txtStatus3').html("");

    $.ajax({
        url: "getWeather.php",
        type: "POST",
        dataType: "JSON",
        data: {
            station: $('#selStation').val()
        },
        success: function(result) {
            console.log(JSON.stringify(result));
            if (result.status.code == 200) {
                if ('status' in result.data)
                    // $('#txtStatus3')     .html(result['data']['status']['message']);
                    $('#txtStatus3')    .html(result.data.status.message);
                else {
                    wo = result.data.weatherObservation;
                    // $('#txtStation')    .html(result['data']['weatherObservation']['stationName']);
                    $('#txtStation')    .html(wo.stationName);
                    $('#txtClouds')     .html(wo.clouds);
                    // $('#txtTemperature').html(result['data']['weatherObservation']['temperature']);
                    $('#txtTemperature').html(result.data.weatherObservation.temperature);
                    $('#txtWind')       .html(result['data']['weatherObservation']['windSpeed']);
                    // $('#txtDateTime')   .html(result['data']['datetime']);
                    $('#txtDateTime')   .html(result.data.weatherObservation.datetime);
                }
                showResponseTime(result.status.returnedIn);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Error: " + textStatus  + " - " + errorThrown);
        }
    }); 

});