<?php
session_start();
$user = $_SESSION['user'];
$add_class = $_POST['Class'];
$servername = "classroom.cs.unc.edu";
$username = "carriems";
$password = "CH@ngemenow99Please!carriems";
$database = "carriemsdb";
$conn = new mysqli($servername, $username, $password, $database);
if($conn->connect_error){
print(json_encode(false . "query failed"));
        die("Connection failed: " . $conn->connect_error);
		}
else {
        $user_id = mysqli_query($conn, "SELECT ID FROM `F.User` WHERE `user` = '$user'");
        $user_id = mysqli_fetch_assoc($user_id);
        $user_id = $user_id['ID'];
		
		if($add_class == ''){
			die("Error");			
		}
		
        $class_id = mysqli_query($conn, "SELECT c_id FROM `F.Classes` WHERE `name` = '$add_class' or `comp_num` = '$add_class'");
        $class_id = mysqli_fetch_assoc($class_id);
        $class_id = $class_id['c_id'];
			
	/*	$add_query = mysqli_query($conn, "INSERT INTO `F.EnrolledKeys(`UserID`,`ClassID`)  VALUES  ('$user_id','$class_id')");
        if(!$add_query){
                print(json_encode(false . "query failed"));
        }
        else {
                print(json_encode(true."it worked"));
        }
		*/		
		
		$add = mysqli_query($conn, "SELECT 1 FROM `F.EnrolledKeys` WHERE `UserID` = '$user_id' and `ClassID` = '$class_id'");
		if($add->num_rows == 0){
			$add_query = mysqli_query($conn, "INSERT INTO `F.EnrolledKeys` (`UserID`,`ClassID`)  VALUES  ('$user_id','$class_id')");
			if(!$add_query){
				die("Error");
			}			
			header("Content-type: application/json");
			print(json_encode(array('id' => $class_id)));
			return true;			
		}else{
			print(json_encode(false . "query did something"));
			return false;
			
		}
}
$conn->close();
?>