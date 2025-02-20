document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // Reset previous error states
  clearErrors();

  // Validate form
  let isValid = true;

  // Name validation
  if (name.length < 2) {
    showError("name", "Name must be at least 2 characters long");
    isValid = false;
  }

  // Email validation
  if (!isValidEmail(email)) {
    showError("email", "Please enter a valid email address");
    isValid = false;
  }

  // Password validation
  if (password.length < 8) {
    showError("password", "Password must be at least 8 characters long");
    isValid = false;
  }

  // Confirm password validation
  if (password !== confirmPassword) {
    showError("confirmPassword", "Passwords do not match");
    isValid = false;
  }

  // If form is valid, submit it
  if (isValid) {
    // Here you would typically send the data to your server
    console.log("Form submitted:", { name, email, password });
    alert(
      "Sign up successful! Please check your email to verify your account."
    );
    this.reset();
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
