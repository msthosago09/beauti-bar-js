<?php
header("Access-Control-Allow-Origin: *");

$signatureString = $_POST["signatureString"];
echo md5( $signatureString );
?>
