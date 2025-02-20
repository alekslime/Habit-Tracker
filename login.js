document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form values
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const remember = document.getElementById("remember").checked;

  // Reset previous error states
  clearErrors();

  // Validate form
  let isValid = true;

  // Email validation
  if (!isValidEmail(email)) {
    showError("email", "Please enter a valid email address");
    isValid = false;
  }

  // Password validation
  if (password.length < 1) {
    showError("password", "Please enter your password");
    isValid = false;
  }

  // If form is valid, submit it
  if (isValid) {
    // Here you would typically send the data to your server
    console.log("Login attempt:", { email, password, remember });

    // Simulate login success
    // In a real application, you would verify credentials with your server
    simulateLogin();
  }
});

function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const formGroup = field.parentElement;

  // Add error class to form group
  formGroup.classList.add("error");

  // Create error message element if it doesn't exist
  let errorMessage = formGroup.querySelector(".error-message");
  if (!errorMessage) {
    errorMessage = document.createElement("div");
    errorMessage.className = "error-message";
    formGroup.appendChild(errorMessage);
  }

  errorMessage.textContent = message;
}

function clearErrors() {
  // Remove all error messages and classes
  document.querySelectorAll(".form-group").forEach((group) => {
    group.classList.remove("error");
    const errorMessage = group.querySelector(".error-message");
    if (errorMessage) {
      errorMessage.remove();
    }
  });
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function simulateLogin() {
  const button = document.querySelector(".auth-button");
  const originalText = button.textContent;

  // Show loading state
  button.disabled = true;
  button.textContent = "Signing in...";

  // Simulate API call
  setTimeout(() => {
    button.textContent = "Success!";

    // Redirect to dashboard (you should change this to your actual dashboard URL)
    setTimeout(() => {
      window.location.href = "index.html";
    }, 500);
  }, 1500);
}

// Handle social login buttons
document.querySelectorAll(".social-button").forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();
    alert("Social login feature coming soon!");
  });
});
