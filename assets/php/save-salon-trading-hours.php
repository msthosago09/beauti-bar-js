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

$salonId = $_POST["salonId"];
$openingTimesArray = $_POST["openingTimes"];
$closingTimesArray = $_POST["closingTimes"];
$workingDaysArray = $_POST["workingDays"];
echo "Straight from get " . $workingDaysArray;
echo "SalonId " . $salonId;
$openingTimesArray = json_decode(stripslashes($openingTimesArray));
$closingTimesArray = json_decode(stripslashes($closingTimesArray));
$workingDaysArray = json_decode(stripslashes($workingDaysArray));
$arrlength = count($openingTimesArray);

echo "Opening times " . $openingTimesArray[0] . "closing " . $closingTimesArray[0] . "day " . $workingDaysArray[0];
echo "changed array " . print_r(array_values($openingTimesArray));

/*$sql = "SELECT * FROM trading_hours WHERE salonId = '$salonId'";
$conn->query($sql);
if ($conn->affected_rows > 0) {
    for ($x = 0; $x < $arrlength; $x++) {
        $sql = "UPDATE trading_hours SET openingTime =  '$openingTimesArray[x]', closingTime = '$closingTimesArray[x]' WHERE day = '$workingDaysArray[x]' AND salonId = '$salonId'";
        $conn->query($sql);
    }
} else {
    for ($x = 0; $x < $arrlength; $x++) {
        $sql = "INSERT INTO trading_hours(salonId, day, openingTime, closingTime) VALUES('$salonId','$workingDaysArray[x]','$openingTimesArray[x]','$closingTimesArray[x]')";
        $conn->query($sql);
    }
}*/

$conn->close();
?>
