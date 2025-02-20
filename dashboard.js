// Initialize habits from localStorage or use default habits
let habits = JSON.parse(localStorage.getItem("habits")) || {
  activity: [
    { id: 1, name: "Eat Healthy", completed: false },
    { id: 2, name: "30 Min Cardio", completed: false },
    { id: 3, name: "Work 3 Hours", completed: false },
  ],
  decline: [
    { id: 4, name: "2 Hours of Screen Time", completed: false },
    { id: 5, name: "Calorie Limit", completed: false },
  ],
  todos: [
    { id: 6, name: "Morning Meditation", completed: false },
    { id: 7, name: "Read 30 Minutes", completed: false },
  ],
};

// DOM Elements
const modal = document.getElementById("habitModal");
const addHabitBtn = document.getElementById("addHabitBtn");
const closeModal = document.querySelector(".close-modal");
const habitForm = document.getElementById("habitForm");
const categoryButtons = document.querySelectorAll(".add-to-category-btn");

// Event Listeners
addHabitBtn.addEventListener("click", () => (modal.style.display = "block"));
closeModal.addEventListener("click", () => (modal.style.display = "none"));
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

// Handle category-specific add buttons
categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    document.getElementById("category").value = button.dataset.category;
    modal.style.display = "block";
  });
});

// Form submission
habitForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const habitName = document.getElementById("habitName").value;
  const category = document.getElementById("category").value;

  // Add new habit
  const newHabit = {
    id: Date.now(),
    name: habitName,
    completed: false,
  };

  habits[category].push(newHabit);
  saveAndRenderHabits();

  // Reset and close form
  habitForm.reset();
  modal.style.display = "none";
});

// Render habits for each category
function renderHabits() {
  Object.keys(habits).forEach((category) => {
    const listElement = document.getElementById(`${category}List`);
    listElement.innerHTML = "";

    habits[category].forEach((habit) => {
      const habitElement = document.createElement("div");
      habitElement.className = `habit-item ${
        habit.completed ? "completed" : ""
      }`;
      habitElement.innerHTML = `
                <input type="checkbox" 
                       class="habit-checkbox" 
                       ${habit.completed ? "checked" : ""}
                       onchange="toggleHabit('${category}', ${habit.id})">
                <span class="habit-name">${habit.name}</span>
                <button class="delete-habit" onclick="deleteHabit('${category}', ${
        habit.id
      })">
                    ×
                </button>
            `;
      listElement.appendChild(habitElement);
    });
  });
}

// Toggle habit completion
function toggleHabit(category, habitId) {
  const habit = habits[category].find((h) => h.id === habitId);
  if (habit) {
    habit.completed = !habit.completed;
    saveAndRenderHabits();
  }
}

// Delete habit
function deleteHabit(category, habitId) {
  if (confirm("Are you sure you want to delete this habit?")) {
    habits[category] = habits[category].filter((h) => h.id !== habitId);
    saveAndRenderHabits();
  }
}

// Save to localStorage and render
function saveAndRenderHabits() {
  localStorage.setItem("habits", JSON.stringify(habits));
  renderHabits();
}

// Initialize the dashboard
renderHabits();

// Logout functionality
document.getElementById("logoutBtn").addEventListener("click", () => {
  if (confirm("Are you sure you want to logout?")) {
    window.location.href = "login.html";
  }
});
