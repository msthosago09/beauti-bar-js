<?php
header("Access-Control-Allow-Origin: *");
$servername = "thebeautibar.com";
$username = "developer";
$password = "beautyBarDeveloper";
$dbname = "_beauty_bar_main_db";
$port = 3306;

$conn = new mysqli($servername, $username, $password, $dbname, $port);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$salonName = $conn->real_escape_string($_GET["salonName"]);
$salonDescription = $conn->real_escape_string($_GET["salonDesc"]);
$streetAddress = $conn->real_escape_string($_GET["salonAddress"]);
$startTime = $_GET["startTime"];
$endTime = $_GET["endTime"];
$startDay = $_GET["startDay"];
$endDay = $_GET["endDay"];
$salonId = $_GET["salonId"];
$latitude = $_GET["latitude"];
$longitude = $_GET["longitude"];

$sql = "INSERT INTO salons (id, salonName, salonDescription, streetAddress, startTime, endTime, startDay, endDay,latitude,longitude) VALUES ('$salonId','$salonName', '$salonDescription', '$streetAddress', '$startTime', '$endTime', '$startDay', '$endDay','$latitude','$longitude')";
$conn->query($sql);

$technicians = $_GET["technicians"];
$technicians = json_decode(stripslashes($technicians));
$arrlength = count($technicians);
for ($x = 0; $x < $arrlength; $x++) {
  $sql = "INSERT INTO salon_technicians (salonId, technicianName, technicianNumber) VALUES ('$salonId','".$technicians[$x]->technicianName."','".$technicians[$x]->technicianNumber ."')";
  $conn->query($sql);
}

$conn->close();
?>
