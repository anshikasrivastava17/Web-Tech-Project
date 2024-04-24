function validateForm() {
            var username = document.getElementById("username").value.trim();
            var password = document.getElementById("password").value.trim();
    
            if (username === "" || password === "") {
                alert("Please enter both username and password.");
                return false;
            }
    
            var alphabetsCount = username.match(/[a-zA-Z]/g);
            if (!alphabetsCount || alphabetsCount.length < 2) {
                alert("Username must contain at least 2 alphabetic characters.");
                return false;
            }
    
            if (password.length < 6) {
                alert("Password must be at least 6 characters long.");
                return false;
            }
    
            var specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
            if (!specialCharacters.test(password)) {
                alert("Password must contain at least one special character.");
                return false;
            }
    
            window.location.href = "/home";
            return false;
        }
    