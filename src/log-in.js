const loginForm = document.getElementById("loginForm");
const successModal = document.getElementById("successModal");
const errorModal = document.getElementById("errorModal");
const errorMessage = document.getElementById("errorMessage");
const closeErrorModalBtn = document.getElementById("closeErrorModalBtn");
const goToDashboardBtn = document.getElementById("goToDashboardBtn");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputEmail = document.getElementById("loginEmail").value.trim();
  const inputPassword = document.getElementById("loginPassword").value;

  const savedData = localStorage.getItem("userProfile");

  // Check if account exists
  if (!savedData) {
    errorMessage.textContent =
      "No registered account found. Please register first.";
    errorModal.classList.remove("hidden");
    return;
  }

  const userProfile = JSON.parse(savedData);

  // Verify credentials against localStorage
  if (
    userProfile.email === inputEmail &&
    userProfile.password === inputPassword
  ) {
    // Show success modal popup
    successModal.classList.remove("hidden");
  } else {
    // Show incorrect input modal popup
    errorMessage.textContent = "Invalid Email or Password!";
    errorModal.classList.remove("hidden");
  }
});

// Close Error Modal
closeErrorModalBtn.addEventListener("click", () => {
  errorModal.classList.add("hidden");
});

// Close error modal when clicking background backdrop
errorModal.addEventListener("click", (e) => {
  if (e.target === errorModal) {
    errorModal.classList.add("hidden");
  }
});

// Redirect to dashboard page when button is clicked
if (goToDashboardBtn) {
  goToDashboardBtn.addEventListener("click", () => {
    window.location.href = "./dashboard.html";
  });
}
