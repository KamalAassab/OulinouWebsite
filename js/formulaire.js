// JavaScript for form validation
function verif() {
   
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const fullName = document.getElementById("full-name").value;

    if (fullName.trim() === "") {
        alert("Please enter your full name.!");
        return false;
    }
    if (email.trim() === "") {
        alert("Please enter your email!");
        return false;
    }
    // we have to add this condition uppercase lowercase
    if (!email.includes("@") ) {
        alert("Your email is incorrect!");
        return false;
    }

   
    if (password.trim() === "") {
        alert("Please enter your Password!");
        return false;
    }
    if (password !== confirmPassword) {
        alert("The passwords doesn't match.!");
       
        return false;
    }

    alert("Congratulations! Your account has been successfully created.");
    return true;
}