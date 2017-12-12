<?php

function ValidateUser($u, $p){
        $servername = "classroom.cs.unc.edu";
        $username = "carriems";
        $password = "CH@ngemenow99Please!carriems";
        $database = "carriemsdb";

        $conn = new mysqli($servername, $username, $password, $database);

        $check_user = mysqli_query($conn, "SELECT 1 FROM `F.User` WHERE `user` = '$u' AND `pass` = '$p'");

        if($check_user->num_rows == 0){
                return false;
        }
        else {
                return true;
        }
}

$username = $_POST['Username'];
$password = $_POST['Password'];
$password = md5($password);

if(ValidateUser($username, $password)){
        setcookie("USER_LOGGEDIN", $username, time() + 60, "/");
        header('Content-type: application/json');
        print(json_encode(true));
}
else {
         header('HTTP/1.1 401 Unauthorized');
         header('Content-type: application/json');
         print(json_encode(false));
}

?>
