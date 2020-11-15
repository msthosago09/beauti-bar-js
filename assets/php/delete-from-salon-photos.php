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

$itemsToDelete = $_GET["itemsToDelete"];
$itemsToDelete = json_decode(stripslashes($itemsToDelete));
$arrlength = count($itemsToDelete);

$photoNames = $_GET["photoNames"];
$photoNames = json_decode(stripslashes($photoNames));

for ($x = 0; $x < $arrlength; $x++) {
      $sql = "DELETE FROM salon_images Where id = $itemsToDelete[$x]";
      $conn->query($sql);
}
$conn->close();

$ftp_server = "160.153.133.212";
$ftp_username = "development@thebeautibar.com";
$ftp_userpass = "Vodacom_19";
$ftp_conn = ftp_connect($ftp_server) or die("Could not connect to $ftp_server");

$login = ftp_login($ftp_conn, $ftp_username, $ftp_userpass);
ftp_pasv($ftp_conn,true);
$salonId = $_GET["salonId"];

$arrlength = count($photoNames);
ftp_chdir($ftp_conn, "assets/salon-images/". $salonId);

for ($x = 0; $x < $arrlength; $x++) {
     ftp_delete($ftp_conn, $photoNames[$x]);
}

?>
