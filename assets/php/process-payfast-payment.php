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

$mPaymentId = $_POST["m_payment_id"];
$postFastPaymentId = $_POST["pf_payment_id"];
$paymentStatus = $_POST["payment_status"];
$merchantId = $_POST["merchant_id"];
$signature = $_POST["signature"];

$sql = "INSERT INTO appointments (salonId,technicianId,startTime,salonName,endTime, appointmentDate,appStatus,traceId,userId,cost,orderItems,duration,slots)
VALUES ('$salonId','$technicianId','$startTime','$salonName','$endTime','$appointmentDate','$appStatus','$traceId','$userId','$cost','$orderItems','$duration','$slots')";

if ($conn->query($sql) != TRUE) {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
