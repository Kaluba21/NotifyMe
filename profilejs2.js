$(document).ready(function (){
	
	var head = "https://wwwp.cs.unc.edu/Courses/comp426-f17/users/meganjn/finalProject/";
	
	$.ajax(head + "profile.php",
		{type: "GET",
		dataType: "json", 
		success: function(user_json){
			$('#name').empty();
			$('#name').append(user_json.f_name + " " + user_json.l_name);
			if(user_json.pic == null){
				$('#profilePic').append("<img src='Snow4.JPG' alt='Profile Picture' height='150px' width='150px' >");
		}else{
				$('#profilePic').append("<img src='"+ user_json.pic + "' alt='Profile Picture' height='150px' width='150px' >");
			}
		},
		error: function(user_json){
		}
	}
); 
	
	$("#addNotificationButton").on('click', function(e){
			console.log("add button");
			$("#addNotForm").css("visibility", "visible");
});
	
	$("#addNotForm").on('submit', function(e){
		e.preventDefault();
		console.log("add not. form");
		
		$.ajax(head + "profile.php" + "/addNot",
		{type: "POST",
		dataType: "json",
		data: $(this).serialize(),
		success: function(){
			alert("Added Notification");
		},
		error: function(){
			alert("Failed to Add Notification. Make sure you enter the name of a class that you are enroled in");
		}
	}			
		);
		
		$("#addNotForm").css("visibility", "hidden");
		
	/*	$("#addNotification").empty();
		$("#addNotification").append("<button type='button' id ='addNotificationButton'> Add Notification </button>"); */
		
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
		},
		error: function(){
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
		},
		error: function(){
		}
	}			
		);
		
		$('#profilePic').empty();
		
		$('#profilePic').append("<img src='"+ newPicture + "' alt='Profile Picture' height='150px' width='150px' >")
		
		
		
	});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	
	if(Cookies.get('USER_LOGGEDIN') === undefined){
        alert("Access Denied. Unauthorized access forbidden.");
        window.location.href = "https://wwwp.cs.unc.edu/Courses/comp426-f17/users/meganjn/finalProject2/main.html";
    }
    else {
        var newSession = new Session();
        newSession.start();
	}
	
	$("#NewClass").on("submit", function(e){
		e.stopPropagation();
		e.preventDefault();
		$.ajax({
			type: "post",
			url: "add_class.php",
			data: $("#NewClass").serialize(),
			error: function(){
				alert("Failed to Add Class");
			}, success: function(json){
				alert("Class Added");
				$("#classes").append(getClassByID(json.id) + "<br>");
			}
		}); 
	})	
	
	/*$("#DeleteClass").on("submit",function(e){
		e.stopPropagation();
		e.preventDefault();
		  $.ajax({
            type: "POST", 
            url: "rm_class.php", 
            async: false, 
            dataType: "json", 
            data: $(this).serialize(),
            success: function(data){
                alert("Class was removed");
                window.location.href = "https://wwwp.cs.unc.edu/Courses/comp426-f17/users/meganjn/finalProject2/profile.html"; 
            }, 
            error: function(){
                alert("Could not remove class"); 
            }
        }); 
			//SetUpClasses();
        
	}); */
	
	
})
	
	var Session = function(){
		
		var classes = []; //all current classes stored here
        var class_ids = [];
		this.start = function(){
						
			 SetUpClasses(); 

    /////////////////Fetch Classes from DB/////////////////////
    
    function SetUpClasses(){
		$.ajax( "fetch_classes.php", {
        type: "GET",
        async: false,
        dataType: "json",
        success: function(data){
            for(var i = 0; i < data.length; i++){
                classes.push(JSON.stringify(data[i]));
            }
        },
        error: function(data){
            alert("Failed to Load Classes");
        }
            });

    for(var i = 0; i < classes.length; i++){
        classes[i] = clean_string(classes[i]);
    }
        
	$.ajax("fetch_classids.php", {
        type: "GET", 
        async: false, 
        dataType: "json", 
        success: function(data){
            for(var i = 0; i < data.length; i++){
                class_ids.push(JSON.stringify(data[i])); 
            }
        }, 
        error: function(){
            alert("Error: Could not retrieve class IDs"); 
        }
}); 
   
    ////////////////////////////////////////////////////////

    
    /////////////////////Fill in classes////////////////////
        
    var class_show = $("#classes");
    $(class_show).empty(); 
    $(classes).each(function(){
			var box = $('<div id="classes">' + this + '<br>');
			box.val(this);
		box.attr("id",this);
            $(class_show).append(box); 
        
    });
  
	
}
		}
		
		
	//$("#SelectAllBtn").on("click", SelectAllClasses);
    
    }    

   /*function SelectAllClasses(){
        var classes = $("#classes").children();
        for(var child of classes){
            $(child).prop("checked", true);
        }
    }
       
    function RemoveClass(){
        
            $.ajax({
            type: "POST", 
            url: "rm_class.php", 
            async: false, 
            dataType: "json", 
            data: {Class:  $("#delClass").serialize()},
            success: function(data){
                alert("Class was removed");
                window.location.href = "https://wwwp.cs.unc.edu/Courses/comp426-f17/users/carriems/finalproj/profile.html"; 
            }, 
            error: function(){
                alert("Could not remove class"); 
            }
        }); 
			//SetUpClasses();
        };
    */
        
    function getClassByID(id){
		console.log("id: " + id);
        var name = ""; 
        $.ajax({
            type: "POST", 
            url: "fetch_oneclass.php", 
            async: false, 
            dataType: "json", 
            data: {ID: id},
            success: function(data){
                name = clean_string(JSON.stringify(data));  
            },
            error: function(){
                alert("ERROR: GETCLASSBYID-INVALID REQUEST"); 
            }
        });
		console.log("Name: " + name);
        return name; 
    }

    function clean_string(string){
        return string.replace(/[\[\]]+/g, "").replace(/"/g, "");
    }