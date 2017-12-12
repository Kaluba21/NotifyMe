$(document).ready(function(){
        $("#NewUserForm").on("submit", function(e){
        e.stopPropagation();
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "user.php",
            data: $("#NewUserForm").serialize(),
            error: function(){
                alert("Error creating user. Please try again.");
            },
            success: function(){
                alert("User successfully created. Please log in with your new credentials.");
            }
        });
    });
})
