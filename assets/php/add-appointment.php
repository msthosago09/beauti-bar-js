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
$salonName = $conn->real_escape_string($_GET["salonName"]);
$startTime = $_GET["startTime"];
$endTime = $_GET["endTime"];
$appointmentDate = $_GET["appointmentDate"];
$appStatus = $_GET["appStatus"];
$traceId = $_GET["traceId"];
$userId = $_GET["userId"];
$cost = $_GET["cost"];
$orderItems = $_GET["orderItems"];
$duration = $_GET["duration"];
$slots = $_GET["slots"];
$technicianId = $_GET['technicianId'];

$sql = "INSERT INTO appointments (salonId,technicianId,startTime,salonName,endTime, appointmentDate,appStatus,traceId,userId,cost,orderItems,duration,slots)
VALUES ('$salonId','$technicianId','$startTime','$salonName','$endTime','$appointmentDate','$appStatus','$traceId','$userId','$cost','$orderItems','$duration','$slots')";

if ($conn->query($sql) != TRUE) {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
