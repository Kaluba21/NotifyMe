<?php
echo "hello";
$servername = "classroom.cs.unc.edu";
$username = "carriems"
$password = "CH@ngemenow99Please!carriems"
$database = carriemsdb


$conn = new mysqli($servername, $username, $password, $database);

if($conn->connect_error){
	die("Connection failed: " . $conn->connect_error);
}

if(isset($_POST['submit'])){


$username = $POST['Username'];
$password = $POST['Password'];
$password = md5($password);



echo "hello";
$check_duplicates = mysqli_query($conn, "SELECT 1 FROM F.login WHERE user = '$username'";);  

if(!$check_duplicates){
	echo "error".$check_duplicates->error;

}
if($check_duplicates->num_rows == 0){
	$result = $mysqli->query("insert into F.login values (NULL, $mysqli->real_escape_string($username),$mysqli->real_escape_string($password))");
	
}
}



}

?>