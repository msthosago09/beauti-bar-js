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

$salonId = $_GET["salonId"];
$slotArray = json_decode($_GET["slotArray"]);
$appointmentDate = $_GET["appointmentDate"];
$technicianId = $_GET['technicianId'];

foreach($slotArray as $value) {
  $sql = "DELETE FROM unavailable_slots WHERE salonId = '$salonId' AND date = '$appointmentDate' AND startTime = '$value' AND technicianId = '$technicianId'";
  $conn->query($sql);
}

$conn->close();
?>
