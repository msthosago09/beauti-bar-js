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

$salonId = $_GET["salonId"];
$updatedMenu = $_GET["updatedMenu"];
$updatedTechnicians = $_GET["updatedTechnicians"];

$updatedMenu = json_decode(stripslashes($updatedMenu));
$updatedTechnicians = json_decode(stripslashes($updatedTechnicians));
$arrlength = count($updatedMenu);
$arrlength2 = count($updatedTechnicians);


for ($x = 0; $x < $arrlength; $x++) {
    $price = $updatedMenu[$x]->price;
    $desc = $updatedMenu[$x]->productDescription;
    $len = $updatedMenu[$x]->treatmentLength;
    $menuId = $updatedMenu[$x]->menuId;
 		$sql = "INSERT INTO menu(menuId, salonId, price, productDescription,treatmentLength) VALUES('$menuId','$salonId','$price','$desc',$len)";
    $conn->query($sql);
  	if ($conn->affected_rows == -1) {
    $sql = "UPDATE menu SET price =  '$price', productDescription = '$desc', treatmentLength = $len WHERE menuId = '$menuId'";
		$conn->query($sql);
	  }
}

for ($x = 0; $x < $arrlength2; $x++) {
    $name = $updatedTechnicians[$x]->technicianName;
    $num = $updatedTechnicians[$x]->technicianNumber;
    $id = $updatedTechnicians[$x]->id;
		$sql = "INSERT INTO salon_technicians(id, salonId, technicianName, technicianNumber) VALUES('$id','$salonId','$name','$num')";
    $conn->query($sql);
	  if ($conn->affected_rows == -1) {
	    $sql = "UPDATE salon_technicians SET technicianName =  '$name', technicianNumber = '$num'  WHERE id = '$id'";
		  $conn->query($sql);
	  }
}
$conn->close();
?>
