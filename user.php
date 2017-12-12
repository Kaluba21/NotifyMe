<?php

$servername = "classroom.cs.unc.edu";
$username = "carriems";
$password = "CH@ngemenow99Please!carriems";
$database = "carriemsdb";

$conn = new mysqli($servername, $username, $password, $database);

if($conn->connect_error){
        die("Connection failed: " . $conn->connect_error);
}

else {

$username = $_POST['Username'];
$password = $_POST['Password'];
$password = md5($password);

$check_duplicates = mysqli_query($conn, "SELECT 1 FROM `F.login` WHERE `user` = '$username'");

if(!$check_duplicates){
        echo "Error: " . mysqli_error($conn);
}

else {

        if($check_duplicates->num_rows == 0){
                $insert_new_user = mysqli_query($conn, "INSERT INTO `F.login` VALUES(NULL, '$username', '$password')");
                if(!$insert_new_user){
                        echo "Error: " . mysqli_error($conn);
                }
        }

}

}

$conn->close();

?>
