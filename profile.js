$(document).ready(function (){
	
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