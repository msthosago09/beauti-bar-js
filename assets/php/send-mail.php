<?
header("Access-Control-Allow-Origin: *");
$name=$_POST['name'];
$subject=$_POST['subject'];
$email=$_POST['email'];
$message=$_POST['message'];

$headers   = array();
$headers[] = "MIME-Version: 1.0";
$headers[] = "Content-type: text/html; charset=UTF-8";
$headers[] = "From: Domicile Website <admin@thebeautibar.com>";
$headers[] = "To: {$name} <$email>";
$headers[] = "Subject: {$subject}";
$headers[] = "X-Mailer: PHP/".phpversion();

$body .= "<div style='font-family:arial'><p>Order Successful</p></div>";

//replace with your email
mail("u13062060@tuks.co.za","New order placed",$body,implode("\r\n", $headers));
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<script>alert("Thank you for your mail. We will contact you shortly.");</script>
<meta HTTP-EQUIV="REFRESH" content="0; url=/page/contact">

</head>
