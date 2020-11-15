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

$appStatus = $_GET["appStatus"];
$traceId = $_GET["traceId"];

$sql = "UPDATE appointments SET appStatus = '$appStatus' WHERE traceId = '$traceId'";
if ($conn->query($sql) != TRUE) {
  echo "Error: " . $sql . "<br>" . $conn->error;
} else {
  $sql = "SELECT * FROM appointments WHERE traceId = '$traceId'";
  $result = $conn->query($sql);
  $counter = 0;
  if ($result->num_rows > 0) {
      while($row = $result->fetch_assoc()) {
          $resultArray[$counter] = $row;
          $counter++;
      }
      echo json_encode($resultArray);
  }
}
$conn->close();
?>
