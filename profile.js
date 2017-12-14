$(document).ready(function (){
	
	
	var head = "https://wwwp.cs.unc.edu/Courses/comp426-f17/users/meganjn/finalProject/";
	
	$.ajax(head + "profile.php",
		{type: "GET",
		dataType: "json", 
		success: function(user_json){
			var u = new UserProfile(user_json);
			$('#name').empty();
			$('#name').append(u.f_name + " " + u.l_name);
			if(user_json.pic == null){
				$('#profilePic').append("<img src='Snow4.JPG' alt='Profile Picture' height='150px' width='150px' >")
				console.log('here, pic is null');
			}else{
				console.log(user_json.pic);
				$('#profilePic').append("<img src='"+ u.pic + "' alt='Profile Picture' height='150px' width='150px' >")
			}
		},
		error: function(user_json){
			alert("Failed to load names");
		}
	}
		);	
	
	
	
	
	$("#addClassButton").on('click', function(e){

	});
	
	$("#changeNameForm").on('submit', function(e){
		e.preventDefault();
		var fname = e.target.fname.value;
		var lname = e.target.lname.value
		
		if(fname != null && lname != null){
			var nameText = $("<div class='text'>" + fname + " " + lname+ "</div>");
			$("#name").empty();
			$("#name").append(nameText);			
		}
		
		$.ajax(head + "profile.php" + "/name",
		{type: "POST",
		dataType: "json",
		data: $(this).serialize(),
		success: function(){
			alert("Name Changed");
		},
		error: function(){
			alert("Name Failed to Change");
		}
	}			
		);
		
	});
	$("#changePicForm").on('submit', function(e){
		e.preventDefault();
		var newPicture = e.target.newPic.value;
		
		$.ajax(head + "profile.php" + "/pic",
		{type: "POST",
		dataType: "json",
		data: $(this).serialize(),
		success: function(){
			alert("Picture Changed");
		},
		error: function(){
			alert("Picture Failed to Change");
		}
	}			
		);
		
		$('#profilePic').empty();
		
		$('#profilePic').append("<img src='"+ newPicture + "' alt='Profile Picture' height='150px' width='150px' >")
		
		
		
	});
	
	$("#addClassButton").on('click', function(e){
		
		var name = prompt("Add Class: ");
		
		if(name != null){
		
			var classText = $("<div class='course' >" + name + "</div>");
			$("#classList").append(classText);
			
		
			
		}
		
	});
	
});