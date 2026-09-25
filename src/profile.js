// ============================================================
// PROFILE PAGE SYNCHRONIZED JAVASCRIPT
// ============================================================

const USER_KEY = "userProfile";
const BANK_KEY = "reenBankData";

// CHECK USER AUTHENTICATION
const savedUser = localStorage.getItem(USER_KEY);
if (!savedUser) {
  window.location.href = "./register.html";
}
let userProfile = JSON.parse(savedUser) || {};

// SAFE NUMBER PARSER
function safeNumber(val) {
  const num = Number(val);
  return isNaN(num) ? 0 : num;
}

// GET BANK DATA FROM SHARED STORAGE
function getBankData() {
  const savedBankData = localStorage.getItem(BANK_KEY);
  if (!savedBankData) {
    return {
      balance: 44500,
      income: 44500,
      expense: 0,
      accounts: [
        { id: 1, name: "Main Account", balance: 44500, description: "Primary" },
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
  }

  try {
    const parsed = JSON.parse(savedBankData);
    parsed.transactions = parsed.transactions || [];
    return parsed;
  } catch (e) {
    return {
      balance: 0,
      income: 0,
      expense: 0,
      accounts: [],
      transactions: [],
    };
  }
}

let bankData = getBankData();
let balanceHidden = false;

// FORMAT CURRENCY HELPER
function formatCurrency(amount) {
  const validAmount = safeNumber(amount);
  return `₦ ${validAmount.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

// ESCAPE HTML FOR SAFETY
function escapeHTML(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// GENERATE ACCOUNT NUMBER
function generateAccountNumber() {
  const savedNumber = localStorage.getItem("reenAccountNumber");
  if (savedNumber) return savedNumber;

  const number = "1234567890";
  localStorage.setItem("reenAccountNumber", number);
  return number;
}

// ============================================================
// PROFILE RENDERING
// ============================================================
function renderProfile() {
  const name = userProfile.name || "Maureen Oguche";
  const email = userProfile.email || "oguchemaureenm@gmail.com";
  const phone = userProfile.phone || "+234 803 041 1314";
  const gender = userProfile.gender || "Female";
  const avatar = userProfile.avatar || "";
  const accountNumber = generateAccountNumber();

  // Header User Info
  const desktopName = document.getElementById("desktop-user-name");
  const desktopNumber = document.getElementById("desktop-account-number");
  if (desktopName) desktopName.textContent = name;
  if (desktopNumber) desktopNumber.textContent = accountNumber;

  const mobileName = document.getElementById("mobile-user-name");
  const mobileNumber = document.getElementById("mobile-account-number");
  if (mobileName) mobileName.textContent = name;
  if (mobileNumber) mobileNumber.textContent = accountNumber;

  // Set Initials
  const initial = name.charAt(0).toUpperCase();
  [
    "userInitial",
    "userInitials",
    "profileInitialPreview",
    "mobileProfileInitialPreview",
  ].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.textContent = initial;
  });

  // Profile Form Inputs
  const fullNameEl = document.getElementById("profileFullName");
  const emailEl = document.getElementById("profileEmail");
  const phoneEl = document.getElementById("profilePhone");
  const genderEl = document.getElementById("profileGender");

  if (fullNameEl) fullNameEl.textContent = name;
  if (emailEl) emailEl.value = email;
  if (phoneEl) phoneEl.value = phone;
  if (genderEl) genderEl.value = gender;

  // Mobile inputs
  const mFullNameEl = document.getElementById("mobileProfileFullName");
  const mEmailEl = document.getElementById("mobileProfileEmail");
  const mPhoneEl = document.getElementById("mobileProfilePhone");
  const mGenderEl = document.getElementById("mobileProfileGender");

  if (mFullNameEl) mFullNameEl.textContent = name;
  if (mEmailEl) mEmailEl.value = email;
  if (mPhoneEl) mPhoneEl.value = phone;
  if (mGenderEl) mGenderEl.value = gender;

  // Avatar handling
  if (avatar) {
    [
      "headerUserAvatar",
      "profileImagePreview",
      "mobileProfileImagePreview",
    ].forEach((id) => {
      const img = document.getElementById(id);
      if (img) {
        img.src = avatar;
        img.classList.remove("hidden");
      }
    });

    [
      "userInitial",
      "profileInitialPreview",
      "mobileProfileInitialPreview",
    ].forEach((id) => {
      const init = document.getElementById(id);
      if (init) init.classList.add("hidden");
    });
  }
}

// ============================================================
// PROFILE ACTIONS
// ============================================================
function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const base64Image = e.target.result;
    userProfile.avatar = base64Image;
    localStorage.setItem(USER_KEY, JSON.stringify(userProfile));
    renderProfile();
    showNotification("Profile image updated!");
  };
  reader.readAsDataURL(file);
}

function saveProfileChanges() {
  const isMobile = window.innerWidth < 768;

  const email = isMobile
    ? document.getElementById("mobileProfileEmail").value
    : document.getElementById("profileEmail").value;

  const phone = isMobile
    ? document.getElementById("mobileProfilePhone").value
    : document.getElementById("profilePhone").value;

  const gender = isMobile
    ? document.getElementById("mobileProfileGender").value
    : document.getElementById("profileGender").value;

  userProfile.email = email;
  userProfile.phone = phone;
  userProfile.gender = gender;

  localStorage.setItem(USER_KEY, JSON.stringify(userProfile));
  showNotification("Profile details saved successfully!");
  renderProfile();
}

// ============================================================
// MAIN ACCOUNT & TRANSACTIONS WIDGET
// ============================================================
function toggleBalanceVisibility() {
  balanceHidden = !balanceHidden;
  renderMainAccount();
  renderRightTransactions();
}

function renderMainAccount() {
  const balanceEl = document.getElementById("profileMainBalance");
  if (balanceEl) {
    balanceEl.textContent = balanceHidden
      ? "••••••"
      : formatCurrency(bankData.balance || 44500);
  }
}

function renderRightTransactions() {
  const container = document.getElementById("rightTransactionsList");
  const mobileContainer = document.getElementById("mobileTransactionsList");

  const list = (bankData.transactions || []).slice(0, 8);

  if (list.length === 0) {
    const empty = `<p class="text-xs text-gray-400 py-4 text-center">No transactions available.</p>`;
    if (container) container.innerHTML = empty;
    if (mobileContainer) mobileContainer.innerHTML = empty;
    return;
  }

  const html = list
    .map((t) => {
      const isIncome = Boolean(t.isIncome);
      const colorClass = isIncome ? "text-[#33B786]" : "text-[#EB5757]";
      const sign = isIncome ? "+" : "- ";

      return `
        <div class="flex items-center justify-between py-1 border-b border-gray-50 text-xs">
          <div class="truncate pr-2">
            <p class="font-bold text-gray-700 truncate">${escapeHTML(t.name)}</p>
          </div>
          <div class="text-right flex-shrink-0">
            <p class="text-[10px] text-gray-400 mb-0.5">${escapeHTML(t.date || "Today")}</p>
            <p class="font-extrabold ${colorClass}">
              ${balanceHidden ? "••••" : sign + formatCurrency(t.amount)}
            </p>
          </div>
        </div>
      `;
    })
    .join("");

  if (container) container.innerHTML = html;
  if (mobileContainer) mobileContainer.innerHTML = html;
}

// ============================================================
// RESET PASSWORD MODAL
// ============================================================
function openResetPasswordModal() {
  document.getElementById("resetPasswordModal")?.classList.remove("hidden");
}

function closeResetPasswordModal() {
  document.getElementById("resetPasswordModal")?.classList.add("hidden");
  document.getElementById("currentPassword").value = "";
  document.getElementById("newPassword").value = "";
  document.getElementById("confirmNewPassword").value = "";
}

function submitPasswordReset() {
  const current = document.getElementById("currentPassword").value;
  const newPass = document.getElementById("newPassword").value;
  const confirmPass = document.getElementById("confirmNewPassword").value;

  if (!current || !newPass || !confirmPass) {
    showNotification("Please fill in all password fields.");
    return;
  }

  if (newPass !== confirmPass) {
    showNotification("New passwords do not match.");
    return;
  }

  userProfile.password = newPass;
  localStorage.setItem(USER_KEY, JSON.stringify(userProfile));

  closeResetPasswordModal();
  showNotification("Password updated successfully!");
}

// ============================================================
// LOGOUT & UTILITIES
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

function showNotification(message) {
  const existing = document.getElementById("dashboardToast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.id = "dashboardToast";
  toast.className =
    "fixed top-5 right-5 z-[100] bg-[#33B786] text-white px-5 py-3 rounded-xl shadow-xl font-semibold text-sm";
  toast.textContent = message;

  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

document.addEventListener("DOMContentLoaded", () => {
  renderProfile();
  renderMainAccount();
  renderRightTransactions();
});
