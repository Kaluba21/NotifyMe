$(document).ready(function(){
    //load up user classes, study groups, calendar, etc from database
    //clear placeholder information and replace with actual user data
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