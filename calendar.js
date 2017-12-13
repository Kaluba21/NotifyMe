$(document).ready(function(){
    //load up user classes, study groups, calendar, etc from database
    //clear placeholder information and replace with actual user data

    if(Cookies.get('USER_LOGGEDIN') === undefined){
        alert("Access Denied. Unauthorized access forbidden.");
        window.location.href = "https://wwwp.cs.unc.edu/Courses/comp426-f17/users/jwash/final/main.html";
    }
    else {
        var newSession = new Session();
        newSession.start();
    }
})

var Session = function(){
    
    var classes = []; //all current classes stored here
    
    
    this.start = function(){
        SetUpClasses(); 

    /////////////////Fetch Classes from DB/////////////////////
    
    function SetUpClasses(){
        $.ajax("fetch_classes.php", {
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
    ////////////////////////////////////////////////////////

    
    /////////////////////Fill in classes////////////////////
        
    var class_check_boxes = $("#classes");  
    $(class_check_boxes).empty(); 
    $(classes).each(function(){
        var box = $('<input type = "checkbox">' + this + '<br>');
        box.val(this); 
        $(class_check_boxes).append(box); 
        
    }); 
        
        
        
    ////////////////////////////////////////////////////////
        
    
    $("#SelectAllBtn").on("click", SelectAllClasses);
    $("#RemoveClassBtn").on("click", RemoveClass); 
    }    

    function SelectAllClasses(){
        var classes = $("#classes").children();
        for(var child of classes){
            $(child).prop("checked", true);
        }
    }
        
    function RemoveClass(){
        var classes = $("#classes").children(); 
        var classes_toRm = []; 
        $(classes).each(function(){ 
            if($(this).prop("checked") && !classes_toRm.includes(this)){
               classes_toRm.push(this); 
            }
        }); 
        
        $(classes_toRm).each(function(){
            var cl_name = $(this).val(); 
            var parent = $("#classes"); 
            var cl = this; 
            
            $.ajax({
            type: "POST", 
            url: "rm_class.php", 
            async: false, 
            dataType: "json", 
            data: {Class: cl_name},
            success: function(data){
                alert("Class was removed"); 
                parent.empty(); 
            }, 
            error: function(){
                alert("Could not remove class"); 
            }
        }); 
        });
    }

    function clean_string(string){
        return string.replace("[","").replace("]", "").replace(/"/g, "");
    }
    }
}

