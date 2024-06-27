// homepage.js
document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
  
    loginForm.addEventListener("submit", function(event) {
      event.preventDefault();
      navigate("login.html");
    });
  
    signupForm.addEventListener("submit", function(event) {
      event.preventDefault();
      navigate("signup.html");
    });
  
    const navLinks = document.querySelectorAll(".navigation a");
    navLinks.forEach(link => {
      link.addEventListener("click", function(event) {
        event.preventDefault();
        const url = this.getAttribute("href");
        navigate(url);
      });
    });
  
    function navigate(url) {
      window.location.href = url;
    }
  });