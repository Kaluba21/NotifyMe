$(document).ready(function(){
    //load up user classes, study groups, calendar, etc from database
    //clear placeholder information and replace with actual user data

    if(Cookies.get('USER_LOGGEDIN') === undefined){
        alert("Access Denied. Unauthorized access forbidden.");
        window.location.href = "https://wwwp.cs.unc.edu/Courses/comp426-f17/users/jwash/final/main.html";
    }
    else {
        var newSession = new Session();
    }

    var newSession = new Session();
})

var Session = function(){

    $("#SelectAllBtn").on("click", SelectAllClasses);

    function SelectAllClasses(){
        var classes = $("#classes").children();
        for(var child of classes){
            $(child).prop("checked", true);
        }
    }
}
