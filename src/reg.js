document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const userProfile = {
        name: document.getElementById("regName").value.trim(),
        email: document.getElementById("regEmail").value.trim(),
        password: document.getElementById("regPassword").value,
      };

      // Save registration data to localStorage
      localStorage.setItem("userProfile", JSON.stringify(userProfile));

      // Redirect to OTP verification page
      window.location.href = "./otp.html";
    });
  }
});
