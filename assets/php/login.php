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

$email = $conn->real_escape_string($_GET["email"]);
$password = $conn->real_escape_string($_GET["password"]);

$sql = "SELECT email, adminRights, userId, password FROM users WHERE email = '$email'";

$result = $conn->query($sql);
if ($result->num_rows > 0) {
  $row = $result->fetch_assoc();
	if (password_verify($password, $row["password"])){
    	 echo json_encode($row);
	} else{
	  echo "Invalid password. Try again";
	}
} else {
	  echo "Email does not exist";
}
$conn->close();
?>
