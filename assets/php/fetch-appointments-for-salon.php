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
$salonId = $_GET['salonId'];
$appointmentDate = $_GET['appDate'];
$technicianId = $_GET['technicianId'];

$sql = "SELECT startTime, slots FROM appointments where salonId = '$salonId' AND appointmentDate = '$appointmentDate' AND technicianId = '$technicianId'";

$result = $conn->query($sql);
$counter = 0;
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $resultArray[$counter] = $row;
        $counter++;
    }
    echo json_encode($resultArray);
} else {
    echo "No results";
}
$conn->close();
?>
