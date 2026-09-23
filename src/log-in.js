const loginForm = document.getElementById("loginForm");
const successModal = document.getElementById("successModal");
const goToDashboardBtn = document.getElementById("goToDashboardBtn");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputEmail = document.getElementById("loginEmail").value.trim();
  const inputPassword = document.getElementById("loginPassword").value;

  const savedData = localStorage.getItem("userProfile");

  if (!savedData) {
    alert("No registered account found. Please register first.");
    window.location.href = "./reg.html";
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
    alert("Invalid email or password.");
  }
});

// Redirect to profile/dashboard page when button is clicked
goToDashboardBtn.addEventListener("click", () => {
  window.location.href = "./profile.html";
});
