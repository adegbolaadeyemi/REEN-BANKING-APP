document.addEventListener("DOMContentLoaded", () => {
  const otpForm = document.getElementById("otpForm");
  const successModal = document.getElementById("successModal");
  const goToDashboardBtn = document.getElementById("goToDashboardBtn");
  const displayEmail = document.getElementById("displayEmail");
  const otpBoxes = document.querySelectorAll(".otp-box");
  const timerText = document.getElementById("timerText");
  const resendBtn = document.getElementById("resendBtn");

  let countdown = 45;
  let timerInterval = null;

  // 1. Mask Email from localStorage
  const savedProfile = JSON.parse(localStorage.getItem("userProfile"));
  if (savedProfile && savedProfile.email && displayEmail) {
    const parts = savedProfile.email.split("@");
    if (parts[0].length > 4) {
      const masked = parts[0].substring(0, 2) + "****" + parts[0].slice(-2);
      displayEmail.textContent = `${masked}@${parts[1]}`;
    } else {
      displayEmail.textContent = savedProfile.email;
    }
  }

  // 2. Focus Management for OTP Input Boxes
  otpBoxes.forEach((box, index) => {
    box.addEventListener("input", (e) => {
      // Strip non-numeric input
      box.value = box.value.replace(/[^0-9]/g, "");

      if (box.value.length === 1 && index < otpBoxes.length - 1) {
        otpBoxes[index + 1].focus();
      }
    });

    box.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !box.value && index > 0) {
        otpBoxes[index - 1].focus();
      }
    });
  });

  // 3. Countdown Timer Functionality
  function startTimer() {
    clearInterval(timerInterval);
    countdown = 45;

    timerInterval = setInterval(() => {
      countdown--;
      const secs = countdown < 10 ? `0${countdown}` : countdown;
      if (timerText) {
        timerText.textContent = `00:${secs} remaining`;
      }

      if (countdown <= 0) {
        clearInterval(timerInterval);
        if (timerText) {
          timerText.textContent = "Code expired. Please resend.";
        }
      }
    }, 1000);
  }

  startTimer();

  // 4. Resend Button
  if (resendBtn) {
    resendBtn.addEventListener("click", () => {
      startTimer();
      otpBoxes.forEach((box) => (box.value = ""));
      otpBoxes[0].focus();
    });
  }

  // 5. Submit OTP -> Trigger Modal Popup
  if (otpForm) {
    otpForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Show success modal
      if (successModal) {
        successModal.classList.remove("hidden");
      }
    });
  }

  // 6. Navigate to Dashboard
  if (goToDashboardBtn) {
    goToDashboardBtn.addEventListener("click", () => {
      window.location.href = "./dashboard.html";
    });
  }
});
