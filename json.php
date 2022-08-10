<!DOCTYPE html>
<?php 
	//	odczyt danych z pliku TXT i przekształcenie ich na obiekt PHP
	//	(c) H.Ś.	Siedlce, dnia 7.08.2022r.

	echo "<b>Test odczytu pliku JSON w PHP:</b><br>";

	//	1. odczyt pliku z danymi GEO.JSON
	$json = @file_get_contents("countryBorders.geo.json")
	or die("Error: problem z odczytem pliku!");
	// echo $json;

	//	2. konwesja na obiekt PHP
	$data = json_decode($json, true);

	$country = $data["features"];
	$count = sizeof($country);

	echo "<br/>";
	print_r($count);
	echo " elements</br>";

	echo "<pre>";
	// print_r($data["type"]);
	// echo "</br>";

	// print_r($data["features"]);
	// echo "</br>";

	// for ($i=0; $i < $count; $i++)
	// 	echo $i . ": " . $country[$i]["properties"]["name"] . "\t" . $country[$i]["properties"]["iso_a3"] . "</br>";

	// print_r($data["features"][154]);	//	Poland
	// echo "= \$data =============================</br>";

	// print_r($data);
	echo "</pre>";

	//	3. budowa SELECT'a
?>
	Chose a country:
	<select name="" id="">
		<?php
			for ($i=0; $i < $count; $i++) {
				$c = $country[$i]["properties"];
				echo "<option value='{$c["iso_a3"]}'>{$c["name"]}</option>";
			}
		?>
	</select>
