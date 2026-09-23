const registerForm = document.getElementById("registerForm");
const successModal = document.getElementById("successModal");
const goToDashboardBtn = document.getElementById("goToDashboardBtn");

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const userProfile = {
    name: document.getElementById("regName").value.trim(),
    email: document.getElementById("regEmail").value.trim(),
    password: document.getElementById("regPassword").value,
  };

  // Save user profile data into localStorage
  localStorage.setItem("userProfile", JSON.stringify(userProfile));

  // Display the custom modal popup instead of alert
  successModal.classList.remove("hidden");
});

// Redirect to profile/dashboard page when button is clicked
goToDashboardBtn.addEventListener("click", () => {
  window.location.href = "./profile.html";
});
