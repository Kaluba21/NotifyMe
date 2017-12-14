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
    var class_ids = []; //all class ID stored here
    
    
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
        
    var class_check_boxes = $("#classes");  
    $(class_check_boxes).empty(); 
    $(classes).each(function(){
        var box = $('<input type = "checkbox">' + this + '<br>');
        box.val(this); 
        box.attr("id", this); 
        $(class_check_boxes).append(box); 
        
    }); 
    ////////////////////////////////////////////////////////
        
    ///////////////////////FILL IN CALENDAR/////////////////
    
    $(class_ids).each(function(){
        var id = clean_string(this);
        $.ajax({
            type: "POST", 
            url: "fetch_times.php", 
            async: false, 
            dataType: "json", 
            data: {ID: id},
            success: function(data){
                var c_n = getClassByID(id);
                var c = clean_string(JSON.stringify(data));
                var slot = $("<br><text>" + "<b>" + c[0] + c[1] + ":00</b><br>" + c_n + "</text><br>");
                $("#"+c[17]+c[18]).append(slot);  
            }, 
            error: function(){
                alert("Error: Failed to update calendar"); 
            }
        }); 
    });    
        
        
        
    ////////////////////////////////////////////////////////
        
    
    $("#SelectAllBtn").on("click", SelectAllClasses);
    $("#RemoveClassBtn").on("click", RemoveClass);
    sendNotificationMail(); 
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
                window.location.href = "https://wwwp.cs.unc.edu/Courses/comp426-f17/users/jwash/final/calendar.html"; 
            }, 
            error: function(){
                alert("Could not remove class"); 
            }
        }); 
        });
    }
        
    function getClassByID(id){
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
        return name; 
    }

    function clean_string(string){
        return string.replace(/[\[\]]+/g, "").replace(/"/g, "");
    }
    }
}

