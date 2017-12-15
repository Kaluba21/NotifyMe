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
    $("#SignInForm").on("submit", function(e){
        e.stopPropagation(); 
        e.preventDefault(); 
        $.ajax({
            type: "post",
            url: "login.php", 
            data: $("#SignInForm").serialize(), 
            error: function(){
                alert("Login Failed. Please try again.");
            }, 
            success: function(){
                alert("Login Successful!");
				window.location.href = "https://wwwp.cs.unc.edu/Courses/comp426-f17/users/meganjn/finalProject2/profile.html ";
         			}
        }); 
    }); 
})
