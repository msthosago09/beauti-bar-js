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

echo "Number of itemsToDelete " . $itemsToDelete;
for ($x = 0; $x < $arrlength; $x++) {
      $sql = "DELETE FROM menu Where menuId = '$itemsToDelete[$x]'";
      echo "iteration " . $sql;
      $conn->query($sql);
}
$conn->close();
?>
