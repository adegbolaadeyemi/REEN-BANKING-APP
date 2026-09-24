// ============================================================
// TRANSACTIONS PAGE JAVASCRIPT
// ============================================================

const USER_KEY = "userProfile";
const BANK_KEY = "reenBankData";

// CHECK USER AUTHENTICATION
const savedUser = localStorage.getItem(USER_KEY);
if (!savedUser) {
  window.location.href = "./register.html";
}
const userProfile = JSON.parse(savedUser) || {};

// SAFE NUMBER PARSER
function safeNumber(val) {
  const num = Number(val);
  return isNaN(num) ? 0 : num;
}

// GET OR INITIALIZE BANK DATA WITH DEFAULT TRANSACTIONS
function getBankData() {
  const savedBankData = localStorage.getItem(BANK_KEY);
  if (!savedBankData) {
    const defaultData = {
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
          amount: 10000,
          isIncome: false,
          date: "06.Mar.2023 - 09:39",
        },
        {
          id: 2,
          name: "Oluwaben Jamin",
          amount: 10000,
          isIncome: true,
          date: "06.Mar.2023 - 09:39",
        },
        {
          id: 3,
          name: "Oluwaben Jamin",
          amount: 10000,
          isIncome: false,
          date: "06.Mar.2023 - 09:39",
        },
        {
          id: 4,
          name: "Oluwaben Jamin",
          amount: 10000,
          isIncome: true,
          date: "06.Mar.2023 - 09:39",
        },
        {
          id: 5,
          name: "Oluwaben Jamin",
          amount: 10000,
          isIncome: false,
          date: "06.Mar.2023 - 09:39",
        },
        {
          id: 6,
          name: "Oluwaben Jamin",
          amount: 10000,
          isIncome: true,
          date: "06.Mar.2023 - 09:39",
        },
        {
          id: 7,
          name: "Oluwaben Jamin",
          amount: 10000,
          isIncome: false,
          date: "06.Mar.2023 - 09:39",
        },
        {
          id: 8,
          name: "Oluwaben Jamin",
          amount: 10000,
          isIncome: true,
          date: "06.Mar.2023 - 09:39",
        },
      ],
    };
    localStorage.setItem(BANK_KEY, JSON.stringify(defaultData));
    return defaultData;
  }

  try {
    const parsed = JSON.parse(savedBankData);
    if (!parsed.transactions || parsed.transactions.length === 0) {
      parsed.transactions = [
        {
          id: 1,
          name: "Oluwaben Jamin",
          amount: 10000,
          isIncome: false,
          date: "06.Mar.2023 - 09:39",
        },
        {
          id: 2,
          name: "Oluwaben Jamin",
          amount: 10000,
          isIncome: true,
          date: "06.Mar.2023 - 09:39",
        },
        {
          id: 3,
          name: "Oluwaben Jamin",
          amount: 10000,
          isIncome: false,
          date: "06.Mar.2023 - 09:39",
        },
        {
          id: 4,
          name: "Oluwaben Jamin",
          amount: 10000,
          isIncome: true,
          date: "06.Mar.2023 - 09:39",
        },
        {
          id: 5,
          name: "Oluwaben Jamin",
          amount: 10000,
          isIncome: false,
          date: "06.Mar.2023 - 09:39",
        },
        {
          id: 6,
          name: "Oluwaben Jamin",
          amount: 10000,
          isIncome: true,
          date: "06.Mar.2023 - 09:39",
        },
        {
          id: 7,
          name: "Oluwaben Jamin",
          amount: 10000,
          isIncome: false,
          date: "06.Mar.2023 - 09:39",
        },
        {
          id: 8,
          name: "Oluwaben Jamin",
          amount: 10000,
          isIncome: true,
          date: "06.Mar.2023 - 09:39",
        },
      ];
      localStorage.setItem(BANK_KEY, JSON.stringify(parsed));
    }
    return parsed;
  } catch (e) {
    return { transactions: [] };
  }
}

let bankData = getBankData();

// FORMAT AMOUNT HELPER
function formatAmount(amount) {
  const validAmount = safeNumber(amount);
  return validAmount.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// SECURITY HELPER
function escapeHTML(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// USER ACCOUNT INFO
function generateAccountNumber() {
  const savedNumber = localStorage.getItem("reenAccountNumber");
  if (savedNumber) return savedNumber;
  const number = "10" + Math.floor(100000000 + Math.random() * 900000000);
  localStorage.setItem("reenAccountNumber", number);
  return number;
}

function renderUser() {
  const name = userProfile.name || "Maureen Oguche";
  const accountNumber = generateAccountNumber();

  const desktopName = document.getElementById("desktop-user-name");
  const desktopNumber = document.getElementById("desktop-account-number");
  if (desktopName) desktopName.textContent = name;
  if (desktopNumber) desktopNumber.textContent = accountNumber;

  const mobileName = document.getElementById("mobile-user-name");
  const mobileNumber = document.getElementById("mobile-account-number");
  if (mobileName) mobileName.textContent = name;
  if (mobileNumber) mobileNumber.textContent = accountNumber;

  const userInitial = document.getElementById("userInitial");
  if (userInitial) userInitial.textContent = name.charAt(0).toUpperCase();
}

// RENDER TRANSACTIONS EXACTLY LIKE SCREENSHOT DESIGN
function renderTransactions(searchTerm = "") {
  const desktopList = document.getElementById("transaction-list");
  const mobileList = document.getElementById("mobile-transaction-list");

  const filtered = bankData.transactions.filter((t) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      (t.name && t.name.toLowerCase().includes(term)) ||
      (t.date && t.date.toLowerCase().includes(term))
    );
  });

  if (filtered.length === 0) {
    const emptyState = `
      <div class="text-center py-10 text-gray-400">
        <p class="font-medium text-sm">No transactions found</p>
      </div>
    `;
    if (desktopList) desktopList.innerHTML = emptyState;
    if (mobileList) mobileList.innerHTML = emptyState;
    return;
  }

  const transactionsHTML = filtered
    .map((t) => {
      const isIncome = Boolean(t.isIncome);
      const sign = isIncome ? "+" : "-";
      const amountColor = isIncome ? "text-[#33B786]" : "text-[#E74F5B]";

      return `
        <div class="flex items-center justify-between py-4.5 transition-colors hover:bg-gray-50/50 px-2 rounded-lg">
          <!-- NAME -->
          <div class="w-1/3 text-gray-500 font-medium text-sm sm:text-base truncate">
            ${escapeHTML(t.name)}
          </div>

          <!-- DATE & TIME -->
          <div class="w-1/3 text-center text-gray-400 text-xs sm:text-sm font-normal">
            ${escapeHTML(t.date || "06.Mar.2023 - 09:39")}
          </div>

          <!-- AMOUNT -->
          <div class="w-1/3 text-right font-bold text-sm sm:text-base ${amountColor}">
            ${sign} ${formatAmount(t.amount)}
          </div>
        </div>
      `;
    })
    .join("");

  if (desktopList) desktopList.innerHTML = transactionsHTML;
  if (mobileList) mobileList.innerHTML = transactionsHTML;
}

// LOGOUT MODAL & UTILITIES
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

function toggleMobileSearch() {
  const mobileSearch = document.getElementById("mobileSearch");
  if (mobileSearch) mobileSearch.classList.toggle("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  renderUser();
  renderTransactions();

  const desktopSearch = document.getElementById("desktop-search");
  if (desktopSearch) {
    desktopSearch.addEventListener("input", (e) => {
      renderTransactions(e.target.value.trim());
    });
  }

  const mobileSearchInput = document.getElementById("mobile-search");
  if (mobileSearchInput) {
    mobileSearchInput.addEventListener("input", (e) => {
      renderTransactions(e.target.value.trim());
    });
  }
});
