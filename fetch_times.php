<?php

$user = $_COOKIE['USER_LOGGEDIN'];
$cl_id = $_POST['ID'];


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

        $times = mysqli_query($conn, "SELECT e_time, e_date FROM `F.Classes` INNER JOIN `F.Time` ON `F.Classes`.time_id = `F.Time`.time_id WHERE c_id = '$cl_id'");
        $times = mysqli_fetch_all($times);

        header('Content-type: application/json');
        print(json_encode($times));
}

$conn->close();

?>
