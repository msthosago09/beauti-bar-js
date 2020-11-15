<?php
header("Access-Control-Allow-Origin: *");
$ftp_server = "160.153.133.212";
$ftp_username = "development@thebeautibar.com";
$ftp_userpass = "Vodacom_19";
$ftp_conn = ftp_connect($ftp_server) or die("Could not connect to $ftp_server");

$login = ftp_login($ftp_conn, $ftp_username, $ftp_userpass);
ftp_pasv($ftp_conn,true);
$salonId = $_POST["salonId"];

if(!ftp_chdir($ftp_conn, "assets/salon-images/". $salonId)){
  ftp_mkdir($ftp_conn, "assets/salon-images/" . $salonId);
  ftp_chdir($ftp_conn, "assets/salon-images/". $salonId);
}

//sql connections
$servername = "thebeautibar.com";
$username = "developer";
$password = "beautyBarDeveloper";
$dbname = "_beauty_bar_main_db";
$port = 3306;
$conn = new mysqli($servername, $username, $password, $dbname,$port);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$counter = 0;
while (array_key_exists($counter,$_FILES["photos"]["name"])){
  echo "Iterating uploadPhotos";
  $fileName = $_FILES["photos"]["name"][$counter];
  $filePath = $_FILES["photos"]["tmp_name"][$counter];
  if (ftp_put($ftp_conn, $fileName, $filePath, FTP_BINARY)){
    uploadToSql($conn,$salonId,$fileName);
  }
  $counter++;
}

ftp_close($ftp_conn);
$conn->close();

function uploadToSql($connection,$salonId, $fileName) {
  $sql = "INSERT INTO salon_images (filePath, salonId) VALUES ('$fileName', '$salonId')";
  $connection->query($sql);
}

?>
