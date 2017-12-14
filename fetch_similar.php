<?php

$user = $_COOKIE['USER_LOGGEDIN'];
$class = $_POST['Class'];


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

        $same_users = mysqli_query($conn, "SELECT email FROM `F.EnrolledKeys` INNER JOIN `F.User` ON `F.EnrolledKeys`.UserID = `F.User`.ID WHERE ClassID = '$class' AND UserID != '$user_id'");
        $same_users = mysqli_fetch_all($same_users);
        print(json_encode($same_users));

}

$conn->close();

?>
