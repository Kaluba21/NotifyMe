<?php

$username = $_COOKIE['USER_LOGGEDIN'];

$headers = "From: NotifyMe@notify.com\r\n";
$classname = "COMP 426";
$email = "jwash@live.unc.edu";

$message = "Hello $username, this is an automated message to alert you that you have an exam in the following class today: \n $classname";
$message = wordwrap($message, 70, "\r\n");

mail($email, 'Exam Notification', $message, $headers);



?>
