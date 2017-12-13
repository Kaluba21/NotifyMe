<?php

class User{
	
	private $id;
	private $f_name;
	private $l_name;
	
	public static function connect(){
		return new mysqli("classroom.cs.unc.edu", 
		"carriems", "CH@ngemenow99Please!carriems", "carriemsdb");		
	}
	
	public static function findByUserName($user){
		$conn = User::connect();
		
		$userName = $conn->real_escape_string($user);
		
		$result = mysqli_query($conn, "SELECT * FROM `F.User` WHERE `user` = '$userName'");

			if($result-> num_rows ==0){
				die("Error");
			}
			$person = $result->fetch_array();
			if($person['F_Name'] == null){
				die("Error");
			}
			
			$newUser = new User($person['ID'], $person['F_Name'], $person['L_Name']);
			
			return $newUser;

			$conn->close();
	}
	
	private function __construct($id, $f_name, $l_name){
		$this-> id =  $id;		
		$this-> f_name = $f_name;
		$this-> l_name =$l_name;	
	}
	
	public function getFirstName(){
		return $this->f_name;		
	}
	
	public function getLastName(){
		return $this->l_name;
	}
	
	public function getJSON(){
		$json_obj = array('id' => $this-> id, 'f_name' => $this-> f_name, 
			'l_name' => $this-> l_name);			
		return json_encode($json_obj);		
	}
	
}

?>