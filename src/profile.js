// ============================================================
// PROFILE PAGE SYNCHRONIZED JAVASCRIPT
// ============================================================

const USER_KEY = "userProfile";
const BANK_KEY = "reenBankData";

// ============================================================
// CHECK USER AUTHENTICATION
// ============================================================

const savedUser = localStorage.getItem(USER_KEY);

if (!savedUser) {
  window.location.href = "./register.html";
}

let userProfile = JSON.parse(savedUser) || {};

// ============================================================
// SAFE NUMBER PARSER
// ============================================================

function safeNumber(val) {
  const num = Number(val);
  return Number.isNaN(num) ? 0 : num;
}

// ============================================================
// GET LATEST BANK DATA
// ============================================================

function getBankData() {
  const savedBankData = localStorage.getItem(BANK_KEY);

  // Default data
  const defaultData = {
    balance: 0,
    income: 0,
    expense: 0,
    accounts: [
      {
        id: 1,
        name: "Main Account",
        balance: 0,
        description: "Primary",
      },
    ],
    transactions: [
      {
        id: 1,
        name: "Oluwaben Jamin",
        type: "Transfer",
        amount: 10000,
        date: "06.Mar.2023 - 09:39",
        isIncome: false,
      },
      {
        id: 2,
        name: "Oluwaben Jamin",
        type: "Deposit",
        amount: 10000,
        date: "06.Mar.2023 - 09:39",
        isIncome: true,
      },
      {
        id: 3,
        name: "Oluwaben Jamin",
        type: "Transfer",
        amount: 10000,
        date: "06.Mar.2023 - 09:39",
        isIncome: false,
      },
      {
        id: 4,
        name: "Oluwaben Jamin",
        type: "Deposit",
        amount: 10000,
        date: "06.Mar.2023 - 09:39",
        isIncome: true,
      },
      {
        id: 5,
        name: "Oluwaben Jamin",
        type: "Transfer",
        amount: 10000,
        date: "06.Mar.2023 - 09:39",
        isIncome: false,
      },
      {
        id: 6,
        name: "Oluwaben Jamin",
        type: "Deposit",
        amount: 10000,
        date: "06.Mar.2023 - 09:39",
        isIncome: true,
      },
      {
        id: 7,
        name: "Oluwaben Jamin",
        type: "Transfer",
        amount: 10000,
        date: "06.Mar.2023 - 09:39",
        isIncome: false,
      },
      {
        id: 8,
        name: "Oluwaben Jamin",
        type: "Deposit",
        amount: 10000,
        date: "06.Mar.2023 - 09:39",
        isIncome: true,
      },
    ],
  };

  if (!savedBankData) {
    return defaultData;
  }

  try {
    const parsed = JSON.parse(savedBankData);

    return {
      ...defaultData,
      ...parsed,
      transactions: Array.isArray(parsed.transactions)
        ? parsed.transactions
        : [],
      accounts: Array.isArray(parsed.accounts)
        ? parsed.accounts
        : defaultData.accounts,
    };
  } catch (error) {
    console.error("Error reading bank data:", error);
    return defaultData;
  }
}

// Always get the latest bank data
let bankData = getBankData();

let balanceHidden = false;

// ============================================================
// FORMAT CURRENCY
// ============================================================

function formatCurrency(amount) {
  const validAmount = safeNumber(amount);

  return `₦ ${validAmount.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

// ============================================================
// ESCAPE HTML
// ============================================================

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// ============================================================
// GENERATE ACCOUNT NUMBER
// ============================================================

function generateAccountNumber() {
  const savedNumber = localStorage.getItem("reenAccountNumber");

  if (savedNumber) {
    return savedNumber;
  }

  const number = "1234567890";

  localStorage.setItem("reenAccountNumber", number);

  return number;
}

// ============================================================
// PROFILE RENDERING
// ============================================================

function renderProfile() {
  // Get latest user data
  const latestUser = localStorage.getItem(USER_KEY);

  if (latestUser) {
    try {
      userProfile = JSON.parse(latestUser) || {};
    } catch (error) {
      console.error("Error reading user profile:", error);
    }
  }

  const name = userProfile.name || "Maureen Oguche";
  const email = userProfile.email || "oguchemaureenm@gmail.com";
  const phone = userProfile.phone || "+234 803 041 1314";
  const gender = userProfile.gender || "Female";
  const avatar = userProfile.avatar || "";

  const accountNumber = generateAccountNumber();

  // ==========================================================
  // HEADER USER INFO
  // ==========================================================

  const desktopName = document.getElementById("desktop-user-name");
  const desktopNumber = document.getElementById("desktop-account-number");

  if (desktopName) {
    desktopName.textContent = name;
  }

  if (desktopNumber) {
    desktopNumber.textContent = accountNumber;
  }

  const mobileName = document.getElementById("mobile-user-name");
  const mobileNumber = document.getElementById("mobile-account-number");

  if (mobileName) {
    mobileName.textContent = name;
  }

  if (mobileNumber) {
    mobileNumber.textContent = accountNumber;
  }

  // ==========================================================
  // INITIAL
  // ==========================================================

  const initial = name.charAt(0).toUpperCase();

  [
    "userInitial",
    "userInitials",
    "profileInitialPreview",
    "mobileProfileInitialPreview",
  ].forEach((id) => {
    const element = document.getElementById(id);

    if (element) {
      element.textContent = initial;
    }
  });

  // ==========================================================
  // DESKTOP PROFILE FORM
  // ==========================================================

  const fullNameEl = document.getElementById("profileFullName");
  const emailEl = document.getElementById("profileEmail");
  const phoneEl = document.getElementById("profilePhone");
  const genderEl = document.getElementById("profileGender");

  if (fullNameEl) {
    fullNameEl.textContent = name;
  }

  if (emailEl) {
    emailEl.value = email;
  }

  if (phoneEl) {
    phoneEl.value = phone;
  }

  if (genderEl) {
    genderEl.value = gender;
  }

  // ==========================================================
  // MOBILE PROFILE FORM
  // ==========================================================

  const mobileFullNameEl = document.getElementById("mobileProfileFullName");

  const mobileEmailEl = document.getElementById("mobileProfileEmail");

  const mobilePhoneEl = document.getElementById("mobileProfilePhone");

  const mobileGenderEl = document.getElementById("mobileProfileGender");

  if (mobileFullNameEl) {
    mobileFullNameEl.textContent = name;
  }

  if (mobileEmailEl) {
    mobileEmailEl.value = email;
  }

  if (mobilePhoneEl) {
    mobilePhoneEl.value = phone;
  }

  if (mobileGenderEl) {
    mobileGenderEl.value = gender;
  }

  // ==========================================================
  // AVATAR
  // ==========================================================

  const avatarImages = [
    "headerUserAvatar",
    "profileImagePreview",
    "mobileProfileImagePreview",
  ];

  const initials = [
    "userInitial",
    "profileInitialPreview",
    "mobileProfileInitialPreview",
  ];

  if (avatar) {
    avatarImages.forEach((id) => {
      const img = document.getElementById(id);

      if (img) {
        img.src = avatar;
        img.classList.remove("hidden");
      }
    });

    initials.forEach((id) => {
      const init = document.getElementById(id);

      if (init) {
        init.classList.add("hidden");
      }
    });
  } else {
    avatarImages.forEach((id) => {
      const img = document.getElementById(id);

      if (img) {
        img.classList.add("hidden");
      }
    });

    initials.forEach((id) => {
      const init = document.getElementById(id);

      if (init) {
        init.classList.remove("hidden");
      }
    });
  }
}

// ============================================================
// IMAGE UPLOAD
// ============================================================

function handleImageUpload(event) {
  const file = event.target.files?.[0];

  if (!file) {
    return;
  }

  if (!file.type.startsWith("image/")) {
    showNotification("Please select a valid image.");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    const base64Image = e.target.result;

    userProfile.avatar = base64Image;

    localStorage.setItem(USER_KEY, JSON.stringify(userProfile));

    renderProfile();

    showNotification("Profile image updated!");
  };

  reader.onerror = function () {
    showNotification("Unable to upload image.");
  };

  reader.readAsDataURL(file);
}

// ============================================================
// SAVE PROFILE CHANGES
// ============================================================

function saveProfileChanges() {
  const isMobile = window.innerWidth < 768;

  const emailElement = document.getElementById(
    isMobile ? "mobileProfileEmail" : "profileEmail",
  );

  const phoneElement = document.getElementById(
    isMobile ? "mobileProfilePhone" : "profilePhone",
  );

  const genderElement = document.getElementById(
    isMobile ? "mobileProfileGender" : "profileGender",
  );

  if (!emailElement || !phoneElement || !genderElement) {
    return;
  }

  userProfile.email = emailElement.value.trim();
  userProfile.phone = phoneElement.value.trim();
  userProfile.gender = genderElement.value;

  localStorage.setItem(USER_KEY, JSON.stringify(userProfile));

  renderProfile();

  showNotification("Profile details saved successfully!");
}

// ============================================================
// MAIN ACCOUNT BALANCE
// ============================================================

function toggleBalanceVisibility() {
  balanceHidden = !balanceHidden;

  renderMainAccount();
  renderRightTransactions();
}

// ============================================================
// IMPORTANT:
// ALWAYS READ THE LATEST BANK DATA FROM LOCAL STORAGE
// ============================================================

function renderMainAccount() {
  const balanceElement = document.getElementById("profileMainBalance");

  if (!balanceElement) {
    return;
  }

  // Refresh bank data every time balance is rendered
  bankData = getBankData();

  const currentBalance = safeNumber(bankData.balance);

  balanceElement.textContent = balanceHidden
    ? "••••••"
    : formatCurrency(currentBalance);
}

// ============================================================
// TRANSACTIONS
// ============================================================

function renderRightTransactions() {
  const container = document.getElementById("rightTransactionsList");

  const mobileContainer = document.getElementById("mobileTransactionsList");

  // Always retrieve latest data
  bankData = getBankData();

  const list = Array.isArray(bankData.transactions)
    ? bankData.transactions.slice(0, 8)
    : [];

  if (list.length === 0) {
    const empty = `
      <p class="text-xs text-gray-400 py-4 text-center">
        No transactions available.
      </p>
    `;

    if (container) {
      container.innerHTML = empty;
    }

    if (mobileContainer) {
      mobileContainer.innerHTML = empty;
    }

    return;
  }

  const html = list
    .map((transaction) => {
      const isIncome = Boolean(transaction.isIncome);

      const colorClass = isIncome ? "text-[#33B786]" : "text-[#EB5757]";

      const sign = isIncome ? "+" : "-";

      const amount = safeNumber(transaction.amount);

      return `
        <div
          class="flex items-center justify-between py-1 border-b border-gray-50 text-xs"
        >
          <div class="truncate pr-2">
            <p class="font-bold text-gray-700 truncate">
              ${escapeHTML(transaction.name)}
            </p>
          </div>

          <div class="text-right flex-shrink-0">
            <p class="text-[10px] text-gray-400 mb-0.5">
              ${escapeHTML(transaction.date || "Today")}
            </p>

            <p class="font-extrabold ${colorClass}">
              ${balanceHidden ? "••••" : `${sign} ${formatCurrency(amount)}`}
            </p>
          </div>
        </div>
      `;
    })
    .join("");

  if (container) {
    container.innerHTML = html;
  }

  if (mobileContainer) {
    mobileContainer.innerHTML = html;
  }
}

// ============================================================
// RESET PASSWORD MODAL
// ============================================================

function openResetPasswordModal() {
  document.getElementById("resetPasswordModal")?.classList.remove("hidden");
}

function closeResetPasswordModal() {
  document.getElementById("resetPasswordModal")?.classList.add("hidden");

  const currentPassword = document.getElementById("currentPassword");

  const newPassword = document.getElementById("newPassword");

  const confirmPassword = document.getElementById("confirmNewPassword");

  if (currentPassword) {
    currentPassword.value = "";
  }

  if (newPassword) {
    newPassword.value = "";
  }

  if (confirmPassword) {
    confirmPassword.value = "";
  }
}

// ============================================================
// PASSWORD RESET
// ============================================================

function submitPasswordReset() {
  const current = document.getElementById("currentPassword")?.value || "";

  const newPass = document.getElementById("newPassword")?.value || "";

  const confirmPass =
    document.getElementById("confirmNewPassword")?.value || "";

  if (!current || !newPass || !confirmPass) {
    showNotification("Please fill in all password fields.");
    return;
  }

  if (newPass !== confirmPass) {
    showNotification("New passwords do not match.");
    return;
  }

  // Check current password if one exists
  if (userProfile.password && current !== userProfile.password) {
    showNotification("Current password is incorrect.");
    return;
  }

  userProfile.password = newPass;

  localStorage.setItem(USER_KEY, JSON.stringify(userProfile));

  closeResetPasswordModal();

  showNotification("Password updated successfully!");
}

// ============================================================
// LOGOUT
// ============================================================

function openLogoutModal() {
  document.getElementById("logoutModal")?.classList.remove("hidden");
}

function closeLogoutModal() {
  document.getElementById("logoutModal")?.classList.add("hidden");
}

function logout() {
  localStorage.removeItem(USER_KEY);

  window.location.href = "./index.html";
}

// ============================================================
// NOTIFICATION / TOAST
// ============================================================

function showNotification(message) {
  const existing = document.getElementById("dashboardToast");

  if (existing) {
    existing.remove();
  }

  const toast = document.createElement("div");

  toast.id = "dashboardToast";

  toast.className =
    "fixed top-5 right-5 z-[100] bg-[#33B786] text-white px-5 py-3 rounded-xl shadow-xl font-semibold text-sm";

  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// ============================================================
// REFRESH DATA WHEN PAGE BECOMES VISIBLE
// ============================================================

function refreshPageData() {
  // Get latest bank data
  bankData = getBankData();

  // Get latest user data
  const latestUser = localStorage.getItem(USER_KEY);

  if (latestUser) {
    try {
      userProfile = JSON.parse(latestUser) || {};
    } catch (error) {
      console.error("Could not refresh user profile:", error);
    }
  }

  renderProfile();
  renderMainAccount();
  renderRightTransactions();
}

// ============================================================
// STORAGE EVENT
// ============================================================

// This runs when another browser tab/window changes
// reenBankData or userProfile.
window.addEventListener("storage", function (event) {
  if (event.key === BANK_KEY || event.key === USER_KEY) {
    refreshPageData();
  }
});

// ============================================================
// WHEN RETURNING TO THIS PAGE
// ============================================================

document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "visible") {
    refreshPageData();
  }
});

// ============================================================
// INITIAL PAGE LOAD
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  refreshPageData();
});
