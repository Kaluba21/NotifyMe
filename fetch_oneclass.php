<?php

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
        $class = mysqli_query($conn, "SELECT name FROM `F.Classes` WHERE c_id = '$cl_id'");
        $class = mysqli_fetch_assoc($class);
        $class = $class['name'];

        header('Content-type: application/json');
        print(json_encode($class));
}

$conn->close();

?>
