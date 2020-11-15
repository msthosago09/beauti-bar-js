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
$salonName = $conn->real_escape_string($_GET["salonName"]);
$salonDescription = $conn->real_escape_string($_GET["salonDesc"]);
$streetAddress = $conn->real_escape_string($_GET["salonAddress"]);
$startTime = $_GET["startTime"];
$endTime = $_GET["endTime"];
$startDay = $_GET["startDay"];
$endDay = $_GET["endDay"];
$latitude = $_GET["latitude"];
$longitude = $_GET["longitude"];

$sql = "UPDATE salons SET salonName = '$salonName', salonDescription = '$salonDescription', streetAddress = '$streetAddress', startTime = '$startTime', endTime = '$endTime', startDay = '$startDay', endDay = '$endDay', latitude = '$latitude', longitude = '$longitude' WHERE id = '$salonId'";
$conn->query($sql);
$conn->close();
?>
