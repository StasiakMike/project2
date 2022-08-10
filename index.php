<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project 1 ITS</title>
    <!--LEAFLET JS INIT +++++++++++++++++++++++++++++++++++++++++++++++++++-->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
    integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ=="
    crossorigin=""/>
    <script src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js"
   integrity="sha512-BB3hKbKWOc9Ez/TAwyWxNXeoV9c1v6FIeYiBieIWkpLjauysF18NzgR1MBNBXf8/KABdlkX68nAhlwcDFLGPCQ=="
   crossorigin=""></script>
    <!--BOOTSTRAP 5  +++++++++++++++++++++++++++++++++++++++++++++++++++-->
   <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
   <!--jQuery CDN  +++++++++++++++++++++++++++++++++++++++++++++++++++-->
   <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
   <!-- markre cluster CDN-->
   <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.css">
   <!--easy button plugin-->
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/leaflet-easybutton@2/src/easy-button.css">
   <script src="https://cdn.jsdelivr.net/npm/leaflet-easybutton@2/src/easy-button.js"></script>
    <link rel="stylesheet" href="style.css">
  
    
</head>
<body>
    <div class="loader-container">
        <div class="loader"></div>
    </div>

    <div class="container-fluid">

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Gazetter Project</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#aboutModal">About</a>
        </li>
      </ul>
      <form class="d-flex">
            <?php
				@$json = file_get_contents("countryBorders.geo.json")
					or die("Error: Geodata file reading problem!");
				$data = json_decode($json, true);
				$country = $data["features"];
				$count = sizeof($country);
			?>
			Choose a country:
			<select name="" id="" class="form-control me-2">
				<?php
					for ($i=0; $i < $count; $i++) {
						$c = $country[$i]["properties"];
						echo "<option value='{$c["iso_a3"]}'>{$c["name"]}</option>";
					}
				?>
			</select>
			<button id="geodata" class="btn btn-outline-success" type="submit">geoData</button>
      </form>
    </div>
  </div>
</nav>
        <div>
			
            <!-- 
			<input type="text" name="search" id="search" placeholder="Search for the country" class="form-control">
			<div>
				<ul class="list-group" id="result"></ul>
			</div>
                -->
		</div>
        <div id="map">
            
        </div>
    </div>
    
    <div id="location"></div>
    <div id="data-output"></div>
    <div id="data-output1"></div>
    <div id="data-output2"></div>
    <div id="data-output3"></div>
       
   <div>
    <br><br>
    <input type="text" name="search" id="search" placeholder="Search for the country" class="form-control">
   </div>
   <div>
    <ul class="list-group" id="result"></ul>
   </div>




   <label>Choose ICAO station to check the weather</label>
   <select id="selStation">
       <option value="EGBB">Birmingham International</option>
       <option value="EGVN">Brize Norton RAF</option>
       <option value="EDDB">Berlin Schönefeld Airport</option>
       <option value="EPWA">Warsaw Chopin Airport</option>
   </select>
</td> 
<td><button id="btnRun3">Run</button></td>
<p>
    <!--table ICAO weather results: -->
    <h3>Weather ICAO API:</h3>
    <span>Station Name:</span>	<span id="txtStation"></span><br>
    <span>Clouds:</span>		<span id="txtClouds"></span><br>
    <span>Temperature:</span>	<span id="txtTemperature"></span><br>
    <span>Wind:</span>			<span id="txtWind"></span><br>
    <span>Date & Time:</span>	<span id="txtDateTime"></span><br>
    <span>Status:</span>		<span id="txtStatus3" class="status"></span>
</p>




<!-- Modal -->
<div class="modal fade" id="aboutModal" tabindex="-1" aria-labelledby="aboutModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="aboutModalLabel">About the project</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>info about the projet, how to and copy rights</p>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam corporis, adipisci quasi debitis quod delectus? Dignissimos ex nihil recusandae suscipit distinctio repudiandae rerum fuga pariatur corrupti autem. Quibusdam quo similique, eveniet consectetur earum illum cupiditate porro excepturi amet, suscipit odio nihil ipsa sunt in. Sint modi officia ducimus accusantium laboriosam.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>



    <script src="app.js"></script>
   
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <script src="https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster.js"></script>
   <script>

        $(document).ready(function(){
            $('#search').keyup(function(){
                $('#result').html('');
                var serachField = $('search').val();
                var expression = new RegExp(serachField, "i");
                $.getJSON('countryBorders.geo.json', function(data){
                    $.each(data, function(key, value){
                        $('#result').append('<li class="list-group-item">' + data.features[0].properties.name + '</>')
                    });
                });
            });
        });
   </script>
</body>
</html>