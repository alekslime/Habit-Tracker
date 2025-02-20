// Add mobile menu functionality
const createMobileMenu = () => {
  const nav = document.querySelector("nav");
  const mobileMenuBtn = document.createElement("button");
  mobileMenuBtn.classList.add("mobile-menu-btn");
  mobileMenuBtn.innerHTML = "☰";

  mobileMenuBtn.addEventListener("click", () => {
    const navLinks = document.querySelector(".nav-links");
    navLinks.style.display =
      navLinks.style.display === "flex" ? "none" : "flex";
  });

  nav.querySelector(".nav-container").appendChild(mobileMenuBtn);
};

// Initialize mobile menu on load
window.addEventListener("load", createMobileMenu);
