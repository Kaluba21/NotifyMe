<?php

$user = $_COOKIE['USER_LOGGEDIN'];
$kill_class = $_POST['Class'];

$servername = "classroom.cs.unc.edu";
$username = "carriems";
$password = "CH@ngemenow99Please!carriems";
$database = "carriemsdb";

$conn = new mysqli($servername, $username, $password, $database);

if($conn->connect_error){
        die("Connection failed: " . $conn->connect_error);
}
else {
        $user_id = mysqli_query($conn, "SELECT ID FROM `F.User` WHERE `user` = '$user'");
        $user_id = mysqli_fetch_assoc($user_id);
        $user_id = $user_id['ID'];

        $class_id = mysqli_query($conn, "SELECT c_id FROM `F.Classes` WHERE `name` = '$kill_class'");
        $class_id = mysqli_fetch_assoc($class_id);
        $class_id = $class_id['c_id'];

        $del_query = mysqli_query($conn, "DELETE FROM `F.EnrolledKeys` WHERE `UserID` = '$user_id' AND `ClassID` = '$class_id'");
        if(!$del_query){
                print(json_encode(false . "query failed"));
        }
        else {
                print(json_encode(true));
        }
}

$conn->close();

?>
