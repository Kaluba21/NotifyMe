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
$F_name = $_POST['Firstname'];
$L_name = $_POST['Lastname'];
$email = $_POST['email'];
$phone = $_POST['phone'];

if(!isset($username) || !isset($password)){
        echo "Failed";
        header('HTTP/1.1 401 Unauthorized');
        header('Content-type: application/json');
        print(json_encode(false));
        die("Username and/or password POST Failed");
}

$check_duplicates = mysqli_query($conn, "SELECT 1 FROM `F.User` WHERE `user` = '$username'");

if(!$check_duplicates){
        die("Error: " . mysqli_error($conn));
}

else {

        if($check_duplicates->num_rows == 0){
                $insert_new_user = mysqli_query($conn, "INSERT INTO `F.User` VALUES(NULL, '$F_name', '$L_name', '$username', '$password', '$email', '$phone', NULL)");
                if(!$insert_new_user){
                        die("Error: " . mysqli_error($conn));
                }
                header('Content-type: application/json');
                print(json_encode(true));
        }
        else {
                header('HTTP/1.1 401 Unauthorized');
                header('Content-type: application/json');
                print(json_encode(false));
        }

}

}

$conn->close();

?>
