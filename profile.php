<?php

session_start();

require_once('userORM.php');

$userName = $_SESSION['user'];

if($_SERVER['REQUEST_METHOD'] == "GET"){
		
		$user = User::findByUserName($userName);		
		header("Content-type: application/json");
		print($user->getJSON());

}

?>