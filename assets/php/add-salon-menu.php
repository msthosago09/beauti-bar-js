<?php
header("Access-Control-Allow-Origin: *");
$servername = "thebeautibar.com";
$username = "developer";
$password = "beautyBarDeveloper";
$dbname = "_beauty_bar_main_db";
$port = 3306;
$conn = new mysqli($servername, $username, $password, $dbname,$port);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$salonId = $_GET["salonId"];
$updatedMenu = $_GET["updatedMenu"];
$updatedMenu = json_decode(stripslashes($updatedMenu));
$arrlength = count($updatedMenu);

for ($x = 0; $x < $arrlength; $x++) {
		$sql = "INSERT INTO menu(salonId, price, productDescription,treatmentLength) VALUES('$salonId',".$updatedMenu[$x]->price.",'".$updatedMenu[$x]->productDescription ."'," . $updatedMenu[$x]->treatmentLength.")";
		$conn->query($sql);
}
$conn->close();
?>
