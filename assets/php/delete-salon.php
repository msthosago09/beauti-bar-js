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

$salonId = $_POST["salonId"];

$sql = "DELETE FROM salons WHERE id = '$salonId'";
$conn->query($sql);
$sql = "DELETE FROM salon_technicians WHERE salonId = '$salonId'";
$conn->query($sql);
$sql = "DELETE FROM menu WHERE salonId = '$salonId'";
$conn->query($sql);
$sql = "DELETE FROM salon_images WHERE salonId = '$salonId'";
$conn->query($sql);
$sql = "DELETE FROM appointments WHERE salonId = '$salonId'";
$conn->query($sql);
$sql = "DELETE FROM unavailable_slots WHERE salonId = '$salonId'";
$conn->query($sql);


$conn->close();
?>
