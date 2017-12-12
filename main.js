$(document).ready(function(){
    $("#NewUserForm").on("submit", function(e){
        e.stopPropagation(); 
        e.preventDefault(); 
        $.ajax({
            type: "POST", 
            url: "user.php", 
            data: $("#NewUserForm").serialize(), 
            error: function(){
                alert("Error creating user"); 
            }, 
            success: function(){
                alert("User successfully created"); 
            }
        }); 
    }); 
})