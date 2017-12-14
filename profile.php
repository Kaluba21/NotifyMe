<?php

session_start();

require_once('userORM.php');

$userName = $_SESSION['user'];


if($_SERVER['REQUEST_METHOD'] == "GET"){
		
		$user = User::findByUserName($userName);		
		header("Content-type: application/json");
		print($user->getJSON());

}else if($_SERVER['REQUEST_METHOD'] == "POST"){
	
	$user = User::findByUserName($userName);	
	$path_components = explode('/', $_SERVER['PATH_INFO']);	
	
	if((count($path_components) >= 2)){		
		if($path_components[1] == "pic"){
		$pic = $_POST['newPic'];
		$user->changePic($userName, $pic);
		header("Content-type: application/json");
		print($user->getJSON());
		}else if($path_components[1] == "name"){
			$fname = $_POST['fname'];
			$lname = $_POST['lname'];		
		$user->changeName($userName, $fname, $lname);
		header("Content-type: application/json");
		print($user->getJSON());
		}else if($path_components[1] == "addNot"){
			$class = $_POST['addNot'];
		$user->addNotification($class);
		header("Content-type: application/json");
		print($user->getJSON());	
		}
	}else{
	
	}  
	
	
}

?>