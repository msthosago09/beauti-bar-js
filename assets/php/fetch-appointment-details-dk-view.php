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

$sql = "SELECT A.appointmentId, A.salonName, A.startTime, A.appointmentDate, A.appStatus, A.orderItems, A.rating, A.review, T.technicianName,
        T.technicianNumber FROM appointments A INNER JOIN salon_technicians T ON T.id = A.technicianId";

$result = $conn->query($sql);
$counter = 0;
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $resultArray[$counter] = $row;
        $counter++;
    }
    echo json_encode($resultArray);
} else {
    echo "0 results";
}
$conn->close();
?>
