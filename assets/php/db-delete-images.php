<?php
header("Access-Control-Allow-Origin: *");
$ftp_server = "160.153.133.212";
$ftp_username = "development@thebeautibar.com";
$ftp_userpass = "Vodacom_19";
$ftp_conn = ftp_connect($ftp_server) or die("Could not connect to $ftp_server");

$login = ftp_login($ftp_conn, $ftp_username, $ftp_userpass);
ftp_pasv($ftp_conn,true);
ftp_chdir($ftp_conn, "assets/salon-images/");
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
  $fileName = $_FILES["photos"]["name"][$counter];
  $filePath = $_FILES["photos"]["tmp_name"][$counter];
  if (ftp_put($ftp_conn, $fileName, $filePath, FTP_BINARY)){
    $salonId = $_POST["salonId"];
    uploadToSql($conn,$salonId,$fileName);
    echo "Successfully uploaded";
  } else {
    echo "Error uploading";
  }
  $counter++;
}

ftp_close($ftp_conn);
$conn->close();

function uploadToSql($connection,$salonId, $fileName) {
  $sql = "INSERT INTO salon_images (filePath, salonId) VALUES ('$fileName', '$salonId')";

  if ($connection->query($sql) === TRUE) {
    echo "Success";
  } else {
    echo "Error: " . $sql . "<br>" . $connection->error;
  }
}

?>
