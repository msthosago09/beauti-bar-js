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

$salonName = $conn->real_escape_string($_POST["salonName"]);
$salonPhone = $conn->real_escape_string($_POST["salonPhone"]);
//$streetAddress = $conn->real_escape_string($_POST["salonAddress"]);
$salonDay1Start = $_POST["salonDay1Start"];
$salonDay1End = $_POST["salonDay1End"];
$salonDay2Start = $_POST["salonDay2Start"];
$salonDay2End = $_POST["salonDay2End"];
$salonDay3Start = $_POST["salonDay3Start"];
$salonDay3End = $_POST["salonDay3End"];
$salonDay1 = $_POST["salonDay1"];
$salonDay2 = $_POST["salonDay2"];
$salonDay3 = $_POST["salonDay3"];
$orderNotes = $conn->real_escape_string($_POST["orderNotes"]);
$salonId = $_POST["salonId"];
/*$latitude = $_POST["latitude"];
$longitude = $_POST["longitude"];*/

$sql = "INSERT INTO salons (id, salonName, salonDescription, phoneNumber) VALUES ('$salonId','$salonName', '$orderNotes', '$salonPhone')";
$conn->query($sql);

$sql = "INSERT INTO trading_hours (salonId, day, openingTime, closingTime,open) VALUES ('$salonId', 'MonFri', '$salonDay1Start', '$salonDay1End', '$salonDay1') ";
$conn->query($sql);
$sql = "INSERT INTO trading_hours (salonId, day, openingTime, closingTime,open) VALUES ('$salonId','Saturday', '$salonDay2Start', '$salonDay2End', '$salonDay2') ";
$conn->query($sql);
$sql = "INSERT INTO trading_hours (salonId, day, openingTime, closingTime,open) VALUES ('$salonId','Sunday', '$salonDay3Start', '$salonDay3End', '$salonDay3') ";
$conn->query($sql);


$technicians = $_POST["technicians"];
$technicians = json_decode(stripslashes($technicians));
$arrlength = count($technicians);
for ($x = 0; $x < $arrlength; $x++) {
  $sql = "INSERT INTO salon_technicians (salonId, technicianName, technicianNumber) VALUES ('$salonId','".$technicians[$x]->technicianName."','".$technicians[$x]->technicianNumber ."')";
  $conn->query($sql);
}

$menuItems = $_POST["menuItems"];
$menuItems = json_decode(stripslashes($menuItems));
$arrlength = count($menuItems);

for ($x = 0; $x < $arrlength; $x++) {
  $sql = "INSERT INTO menu(salonId, price, productDescription,treatmentLength) VALUES('$salonId',".$menuItems[$x]->price.",'".$menuItems[$x]->productDescription ."'," . $menuItems[$x]->treatmentLength.")";
  $conn->query($sql);
}
$conn->close();
?>
