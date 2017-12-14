<?php

class User{
	
	private $id;
	private $f_name;
	private $l_name;
	private $pic;
	
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
			
			$newUser = new User($person['ID'], $person['F_Name'], $person['L_Name'], $person['pic']);
			
			if($person['pic'] == null){
				die("Error");
			}
			
			return $newUser;

			$conn->close();
	}
	
	private function __construct($id, $f_name, $l_name, $pic){
		$this-> id =  $id;		
		$this-> f_name = $f_name;
		$this-> l_name =$l_name;
		$this-> pic = $pic;
	}
	

	public function getFirstName(){
		return $this->f_name;		
	}
	
	public function getLastName(){
		return $this->l_name;
	}
	
	public function getJSON(){
		$json_obj = array('id' => $this-> id, 'f_name' => $this-> f_name, 
			'l_name' => $this-> l_name, 'pic' => $this-> pic);			
		return json_encode($json_obj);		
	}
	
	public function changeName($user, $fname, $lname){
		$conn = User::connect();
		
		$userName = $conn->real_escape_string($user);
		$first = $conn->real_escape_string($fname);
		$last = $conn->real_escape_string($lname);		
		
		$result = mysqli_query($conn, "UPDATE `F.User` SET `F_Name` = '".$first."',`L_Name` = '".$last."' WHERE `user` ='".$userName."'");
			
		if(!$result){
			die("Error");			
		}else{
			$this-> f_name = $fname;
			$this-> l_name =$lname;
			return true;
		}		
	}
	
	public function changePic($user, $profilePic){
		$conn = User::connect();
		
		$userName = $conn->real_escape_string($user);
		$newPic = $conn->real_escape_string($profilePic);	
		
		$result = mysqli_query($conn, "UPDATE `F.User` SET `pic` = '".$newPic."' WHERE `user` ='".$userName."'");
			
		if(!$result){
			die("Error");			
		}else{
			$this-> pic = $newPic;
			return true;
		}	
	}	
}

?>