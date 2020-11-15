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

$userId = $conn->real_escape_string($_GET["userId"]);
$password = $conn->real_escape_string($_GET["password"]);
$email = $conn->real_escape_string($_GET["email"]);

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

$sql = "INSERT INTO users (userId,  password, email,adminRights) VALUES ('$userId','$hashedPassword', '$email','customer')";

$conn->query($sql);

$conn->close();
?>
