// Initialize charts and stats
document.addEventListener("DOMContentLoaded", function () {
  updateStats();
  initializeCharts();
  loadAchievements();
});

// Update Statistics
function updateStats() {
  const habits = JSON.parse(localStorage.getItem("habits")) || {};

  // Calculate total habits
  const totalHabits = Object.values(habits).flat().length;
  document.getElementById("totalHabits").textContent = totalHabits;

  // Calculate completion rate
  const completedHabits = Object.values(habits)
    .flat()
    .filter((habit) => habit.completed).length;
  const completionRate = totalHabits
    ? Math.round((completedHabits / totalHabits) * 100)
    : 0;
  document.getElementById("completionRate").textContent = `${completionRate}%`;

  // Calculate streak (simulated)
  const streak = calculateStreak();
  document.getElementById("currentStreak").textContent = `${streak} days`;
}

// Initialize Charts
function initializeCharts() {
  // Weekly Progress Chart
  const weeklyCtx = document.getElementById("weeklyProgress").getContext("2d");
  new Chart(weeklyCtx, {
    type: "line",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Completed Habits",
          data: [5, 7, 4, 6, 8, 6, 7],
          borderColor: "#1a49af",
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
        },
      },
    },
  });

  // Category Distribution Chart
  const categoryCtx = document
    .getElementById("categoryDistribution")
    .getContext("2d");
  new Chart(categoryCtx, {
    type: "doughnut",
    data: {
      labels: ["Activity", "Decline", "To-Dos"],
      datasets: [
        {
          data: [30, 40, 30],
          backgroundColor: ["#1a49af", "#4c7dff", "#8bb3ff"],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
        },
      },
    },
  });
}

// Load Achievements
function loadAchievements() {
  const achievements = [
    {
      name: "Early Bird",
      description: "Complete all habits before noon",
      icon: "🌅",
      unlocked: true,
    },
    {
      name: "Perfect Week",
      description: "Complete all habits for 7 days straight",
      icon: "🏆",
      unlocked: false,
    },
    {
      name: "Habit Master",
      description: "Maintain 10 active habits",
      icon: "⭐",
      unlocked: false,
    },
    {
      name: "Consistency King",
      description: "30-day streak on any habit",
      icon: "👑",
      unlocked: false,
    },
  ];

  const achievementsGrid = document.getElementById("achievementsGrid");
  achievements.forEach((achievement) => {
    const achievementCard = document.createElement("div");
    achievementCard.className = `achievement-card ${
      achievement.unlocked ? "" : "locked"
    }`;
    achievementCard.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-name">${achievement.name}</div>
            <div class="achievement-description">${achievement.description}</div>
        `;
    achievementsGrid.appendChild(achievementCard);
  });
}

// Helper function to calculate streak (simulated)
function calculateStreak() {
  return Math.floor(Math.random() * 10) + 1; // Simulated streak between 1-10 days
}
