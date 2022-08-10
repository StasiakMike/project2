<!DOCTYPE html>
<html lang="en">
<head>
	<title>Project 1 ITS</title>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<!--BOOTSTRAP 5  +++++++++++++++++++++++++++++++++++++++++++++++++++-->
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
	<!--jQuery CDN  +++++++++++++++++++++++++++++++++++++++++++++++++++-->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
	<!--LEAFLET JS INIT +++++++++++++++++++++++++++++++++++++++++++++++++++-->
	<link rel="stylesheet" href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css" integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ==" crossorigin=""/>
	<script src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js" integrity="sha512-BB3hKbKWOc9Ez/TAwyWxNXeoV9c1v6FIeYiBieIWkpLjauysF18NzgR1MBNBXf8/KABdlkX68nAhlwcDFLGPCQ==" crossorigin=""></script>
</head>

<style>
	#map {
		height: 600px;
		/*height: 50%;*/
		/*padding: 10px;*/
	}
	.text {
		width: 62%;
		padding: 20px;
	}
	select {
		margin: 1em;
	}
	p {
		/*border-radius: 1em;*/
		/*border: 1px solid blue;*/
	}
	section {
		display: inline-block;
		width: 33%;
		vertical-align: top;
	}
</style>

<body>
	<div class="container-fluid">		<!-- map -->
		<div id="map"></div>
	</div>

	<div class="text">		<!-- text -->
		<div id="location"></div>				<!-- Your current position -->
		<div id="data-output"></div>		<!-- Cliced Location -->
		<div id="data-output1"></div>		<!-- Country Info -->
		<div id="data-output2"></div>		<!-- Wikipedia -->
		<div id="data-output3"></div>		<!-- Weather for location -->

		<div>
			<?php
				@$json = file_get_contents("countryBorders.geo.json")
					or die("Error: Geodata file reading problem!");
				$data = json_decode($json, true);
				$country = $data["features"];
				$count = sizeof($country);
			?>
			Choose a country:
			<select name="" id="">
				<?php
					for ($i=0; $i < $count; $i++) {
						$c = $country[$i]["properties"];
						echo "<option value='{$c["iso_a3"]}'>{$c["name"]}</option>";
					}
				?>
			</select>
			<button id="geodata">geoData</button>

			<input type="text" name="search" id="search" placeholder="Search for the country" class="form-control">
			<div>
				<ul class="list-group" id="result"></ul>
			</div>
		</div>

		<div>
			<section>
				<b>Position:</b><br/>
				Latitude:  <span id="lat">52.164543</span><br/>
				Longitude: <span id="lng">22.278568</span><br/>
			</section>
			<section>
				<b>Location:</b><br/>
				Country:<br/>
				Capital:<br/>
				Currency:<br/>
				Languages:<br/>
				Population:<br/>
				Area: km<sup>2</sup>
			</section>
			<section>
				<b>Weather:</b><br/>
				Station Name:	<span id="txtStation"></span><br>
				Clouds:				<span id="txtClouds"></span><br>
				Temperature:	<span id="txtTemperature"></span><br>
				Wind:					<span id="txtWind"></span><br>
				Date & Time:	<span id="txtDateTime"></span><br>
				Status:				<span id="txtStatus" class="status"></span>
			</section>
		</div>

		<!-- to delete -->
	  Choose ICAO station to check the weather
	  <select id="selStation">
	    <option value="EGBB">Birmingham International</option>
	    <option value="EGVN">Brize Norton RAF</option>
	    <option value="EDDB">Berlin Schönefeld Airport</option>
	    <option value="EPWA">Warsaw Chopin Airport</option>
	  </select>
	  <button id="btnRun3">Run</button>

	</div>

	<script src="app.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

	<script>
	</script>
</body>
</html>