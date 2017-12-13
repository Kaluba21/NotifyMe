<?php

$user = $_COOKIE['USER_LOGGEDIN'];



$servername = "classroom.cs.unc.edu";
$username = "carriems";
$password = "CH@ngemenow99Please!carriems";
$database = "carriemsdb";

$conn = new mysqli($servername, $username, $password, $database);

if($conn->connect_error){
        header('HTTP/1.1 401 Unauthorized');
        header('Content-type: application/json');
        print(json_encode(false));
        die("Connection failed: " . $conn->connect_error);
}

else {

$user_id = mysqli_query($conn, "SELECT ID FROM `F.User` WHERE `user` = '$user'");
$user_id = mysqli_fetch_assoc($user_id);
$user_id = $user_id['ID'];

$class_ids = mysqli_query($conn, "SELECT ClassID FROM `F.EnrolledKeys` WHERE UserID = '$user_id'");
$class_ids = mysqli_fetch_all($class_ids);

header('Content-type: application/json');
print(json_encode($class_ids));

}

$conn->close();

?>
