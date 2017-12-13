$(document).ready(function (){
	
	
	var head = "https://wwwp.cs.unc.edu/Courses/comp426-f17/users/meganjn/finalProject/";
	
	$.ajax(head + "profile.php",
		{type: "GET",
		dataType: "json", 
		success: function(user_json){
			var u = new UserProfile(user_json);
			$('#name').empty();
			$('#name').append(u.f_name + " " + u.l_name);
		},
		error: function(user_json){
			alert("Failed to load names");
		}
	}
		);	
	
	
	
	
	$("form").on('submit', function(e){
		e.preventDefault();		
		var name = e.target.inputName.value;
		var nameText = $("<div class='text'> Your Name: " + name.toString() + "</div>");
		$("#name").empty();
		$("#name").append(nameText);
	});
	
	$("#addClassButton").on('click', function(e){

	});
	
	$("#changeNameButton").on('click', function(e){
		
		var name = prompt("Change Name: ");
		
		if(name != null){
			var nameText = $("<div class='text'>" + name + "</div>");
			$("#name").empty();
			$("#name").append(nameText);			
		}
		
		
		
	});
	
	$("#addClassButton").on('click', function(e){
		
		var name = prompt("Add Class: ");
		
		if(name != null){
		
			var classText = $("<div class='course' >" + name + "</div>");
			$("#classList").append(classText);
			
		
			
		}
		
	});
	
});