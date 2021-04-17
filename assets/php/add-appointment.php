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

$salonId = $_POST["salonId"];
$salonName = $conn->real_escape_string($_POST["salonName"]);
$startTime = $_POST["startTime"];
$endTime = $_POST["endTime"];
$appointmentDate = $_POST["appointmentDate"];
$appStatus = $_POST["appStatus"];
$traceId = $_POST["traceId"];
$userId = $_POST["userId"];
$cost = $_POST["cost"];
$orderItems = $_POST["orderItems"];
$duration = $_POST["duration"];
$slots = $_POST["slots"];
$technicianId = $_POST['technicianId'];

$sql = "INSERT INTO appointments (salonId,technicianId,startTime,salonName,endTime, appointmentDate,appStatus,traceId,userId,cost,orderItems,duration,slots)
VALUES ('$salonId','$technicianId','$startTime','$salonName','$endTime','$appointmentDate','$appStatus','$traceId','$userId','$cost','$orderItems','$duration','$slots')";

if ($conn->query($sql) != TRUE) {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
