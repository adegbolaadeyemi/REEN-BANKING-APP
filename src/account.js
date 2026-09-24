// ============================================================
// ACCOUNT & OVERVIEW SYNCHRONIZED JAVASCRIPT
// ============================================================

const USER_KEY = "userProfile";
const BANK_KEY = "reenBankData";

// CHECK USER AUTHENTICATION
const savedUser = localStorage.getItem(USER_KEY);
if (!savedUser) {
  window.location.href = "./register.html";
}
const userProfile = JSON.parse(savedUser) || {};

// SAFE NUMBER PARSER TO PREVENT NaN
function safeNumber(val) {
  const num = Number(val);
  return isNaN(num) ? 0 : num;
}

// GET OR INITIALIZE BANK DATA
function getBankData() {
  const savedBankData = localStorage.getItem(BANK_KEY);
  if (!savedBankData) {
    const defaultData = {
      balance: 44500,
      income: 44500,
      expense: 0,
      accounts: [
        {
          id: 1,
          name: "Main Account",
          balance: 44500,
          description: "Primary Account",
        },
      ],
      transactions: [],
    };
    localStorage.setItem(BANK_KEY, JSON.stringify(defaultData));
    return defaultData;
  }

  try {
    const parsed = JSON.parse(savedBankData);

    // Sanitize parsed data to clean up any existing NaN values
    parsed.accounts = (parsed.accounts || []).map((acc) => ({
      ...acc,
      balance: safeNumber(acc.balance),
    }));

    parsed.balance = parsed.accounts.reduce(
      (sum, acc) => sum + safeNumber(acc.balance),
      0,
    );
    parsed.income = safeNumber(parsed.income);
    parsed.expense = safeNumber(parsed.expense);
    parsed.transactions = parsed.transactions || [];

    return parsed;
  } catch (e) {
    // Backup fallback if storage data was corrupted
    return {
      balance: 44500,
      income: 44500,
      expense: 0,
      accounts: [
        {
          id: 1,
          name: "Main Account",
          balance: 44500,
          description: "Primary Account",
        },
      ],
      transactions: [],
    };
  }
}

let bankData = getBankData();
let balanceHidden = false;

// RECALCULATE TOTAL BALANCE AND SAVE TO LOCAL STORAGE
function saveBankData() {
  bankData.balance = bankData.accounts.reduce(
    (sum, acc) => sum + safeNumber(acc.balance),
    0,
  );

  localStorage.setItem(BANK_KEY, JSON.stringify(bankData));
}

// FORMAT CURRENCY HELPER
function formatCurrency(amount) {
  const validAmount = safeNumber(amount);
  return `₦ ${validAmount.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
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

// ============================================================
// USER INFORMATION & HEADER
// ============================================================
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

  const userInitials = document.getElementById("userInitials");
  if (userInitials) userInitials.textContent = name.charAt(0).toUpperCase();
}

// ============================================================
// ACCOUNTS CARDS & OVERVIEW BALANCE DISPLAY
// ============================================================
function toggleBalanceVisibility() {
  balanceHidden = !balanceHidden;
  renderAccounts();
  renderTransactions();
}

function renderAccounts() {
  const totalOverviewBalance = document.getElementById("total-balance");
  if (totalOverviewBalance) {
    totalOverviewBalance.textContent = balanceHidden
      ? "••••••"
      : formatCurrency(bankData.balance);
  }

  const desktopContainer = document.getElementById("desktop-accounts-list");
  const mobileContainer = document.getElementById("mobile-accounts-list");

  const accountsHTML = bankData.accounts
    .map((account, index) => {
      const formattedBalance = balanceHidden
        ? "••••••"
        : formatCurrency(account.balance);
      const isPurpleBorder =
        index % 2 === 0 ? "border-l-4 border-[#46237A]" : "";

      return `
        <div class="bg-[#D4F3E7] rounded-2xl p-6 w-full relative flex flex-col justify-between h-35 ${isPurpleBorder}">
          <div class="flex justify-between items-center">
            <p class="text-[#46237A] font-semibold text-base">
              ${escapeHTML(account.name)}
            </p>
            <button onclick="toggleBalanceVisibility()" class="text-gray-500 hover:text-gray-700">
              👁
            </button>
          </div>

          <p class="text-3xl font-extrabold tracking-tight my-auto">
            ${formattedBalance}
          </p>

          <div class="flex gap-5 mt-2">
            <button onclick="openFundModal(${account.id})" class="bg-[#33B786] text-white text-xs font-semibold px-5 py-2 rounded-lg hover:opacity-90 transition">
              Fund
            </button>
            <button onclick="openWithdrawModal(${account.id})" class="bg-gray-200 text-gray-700 text-xs font-semibold px-5 py-2 rounded-lg hover:bg-gray-300 transition">
              Withdraw
            </button>
          </div>
        </div>
      `;
    })
    .join("");

  // STATIC ADD ACCOUNT CARD (No longer binding to total bank balance)
  const addAccountCard = `
    <div onclick="openAddAccountModal()" class="bg-gray-100/70 border border-dashed border-gray-300 rounded-2xl p-6 flex flex-col justify-between h-35 w-full cursor-pointer hover:bg-gray-100 transition">
      <div class="flex items-center gap-3 text-gray-600 font-semibold text-sm">
        <span class="text-xl">+</span>
        <span>Add Account</span>
      </div>
      <p class="text-xl font-medium text-gray-400 my-auto">Create New Account</p>
    </div>
  `;

  if (desktopContainer) {
    desktopContainer.innerHTML = accountsHTML + addAccountCard;
  }

  if (mobileContainer) {
    mobileContainer.innerHTML = bankData.accounts
      .map((account) => {
        return `
          <div class="bg-[#D4F3E7] rounded-2xl p-4 min-w-[200px] flex-shrink-0 flex flex-col justify-between">
            <p class="text-[#46237A] text-sm font-semibold">${escapeHTML(account.name)}</p>
            <p class="text-xl font-bold my-2">${balanceHidden ? "••••••" : formatCurrency(account.balance)}</p>
            <div class="flex gap-2 mt-2">
              <button onclick="openFundModal(${account.id})" class="bg-[#33B786] text-white text-[10px] px-3 py-1.5 rounded-lg">Fund</button>
              <button onclick="openWithdrawModal(${account.id})" class="bg-gray-200 text-gray-700 text-[10px] px-3 py-1.5 rounded-lg">Withdraw</button>
            </div>
          </div>
        `;
      })
      .join("");
  }
}

// ============================================================
// TRANSACTIONS LIST
// ============================================================
function renderTransactions(searchTerm = "") {
  const desktopList = document.getElementById("transaction-list");
  const mobileList = document.getElementById("mobile-transaction-list");

  const filtered = bankData.transactions.filter((t) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      (t.name && t.name.toLowerCase().includes(term)) ||
      (t.type && t.type.toLowerCase().includes(term)) ||
      (t.status && t.status.toLowerCase().includes(term))
    );
  });

  if (filtered.length === 0) {
    const emptyState = `
      <div class="text-center py-8 text-gray-500">
        <p class="font-medium">No recent transactions found</p>
      </div>
    `;
    if (desktopList) desktopList.innerHTML = emptyState;
    if (mobileList) mobileList.innerHTML = emptyState;
    return;
  }

  const listToRender = filtered.slice(0, 8);

  // DESKTOP LAYOUT (Full Row Table Layout)
  const desktopHTML = listToRender
    .map((t) => {
      const isIncome = Boolean(t.isIncome);
      const icon = isIncome ? "+" : "−";

      // Color codes matching the reference design
      const greenColor = "#33B786";
      const redColor = "#EB5757";

      // Status pill configuration
      const status = t.status || "Completed";
      let statusBg = greenColor;
      let statusTextColor = "#FFFFFF";

      if (status.toLowerCase() === "pending") {
        statusBg = "#CCCCCC";
        statusTextColor = "#555555";
      } else if (status.toLowerCase() === "") {
        statusBg = redColor;
        statusTextColor = "#FFFFFF";
      }

      return `
        <div class="grid grid-cols-12 items-center py-3 border-b border-gray-100 hover:bg-white/50 transition px-2">
          <!-- Icon -->
          <div class="col-span-1 flex items-center justify-start">
            <div 
              style="background-color: ${isIncome ? greenColor : redColor}" 
              class="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-lg leading-none"
            >
              ${icon}
            </div>
          </div>

          <!-- Name -->
          <div class="col-span-3 text-gray-500 font-medium text-sm truncate">
            ${escapeHTML(t.name)}
          </div>

          <!-- Type / Method -->
          <div class="col-span-2 text-gray-400 text-sm truncate">
            ${escapeHTML(t.type || "Bank Transfer")}
          </div>

          <!-- Date & Time -->
          <div class="col-span-3 text-gray-400 text-sm truncate">
            ${escapeHTML(t.date || "Today")}
          </div>

          <!-- Amount -->
          <div 
            style="color: ${isIncome ? greenColor : redColor}" 
            class="col-span-2 text- font-bold text-sm"
          >
            ${balanceHidden ? "••••" : (isIncome ? "+ " : "- ") + formatCurrency(t.amount)}
          </div>

          <!-- Status Badge -->
          <div class="col-span-1 flex justify-end">
            <span 
              style="background-color: ${statusBg}; color: ${statusTextColor};" 
              class="w-28 py-2 rounded text-xs font-semibold text-center tracking-wide block"
            >
              ${escapeHTML(status)}
            </span>
          </div>
        </div>
      `;
    })
    .join("");

  // MOBILE LAYOUT (Compact Stacked View)
  const mobileHTML = listToRender
    .map((t) => {
      const isIncome = Boolean(t.isIncome);
      const icon = isIncome ? "+" : "−";
      const greenColor = "#33B786";
      const redColor = "#EB5757";

      return `
        <div class="flex items-center justify-between border-b border-gray-100 pb-3">
          <div class="flex items-center gap-3">
            <div 
              style="background-color: ${isIncome ? greenColor : redColor}" 
              class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
            >
              ${icon}
            </div>
            <div>
              <p class="font-semibold text-sm text-gray-700">${escapeHTML(t.name)}</p>
              <p class="text-xs text-gray-400">${escapeHTML(t.type || "Transfer")} • ${escapeHTML(t.date || "Today")}</p>
            </div>
          </div>
          <p class="font-bold text-sm" style="color: ${isIncome ? greenColor : redColor}">
            ${balanceHidden ? "••••" : (isIncome ? "+" : "-") + formatCurrency(t.amount)}
          </p>
        </div>
      `;
    })
    .join("");

  if (desktopList) desktopList.innerHTML = desktopHTML;
  if (mobileList) mobileList.innerHTML = mobileHTML;
}

// ============================================================
// MODAL CONTROLLERS & ACTIONS
// ============================================================

// --- ADD ACCOUNT MODAL ---
function openAddAccountModal() {
  const modal = document.getElementById("accountModal");
  if (modal) modal.classList.remove("hidden");
}

function closeAddAccountModal() {
  const modal = document.getElementById("accountModal");
  if (modal) modal.classList.add("hidden");
  document.getElementById("accountName").value = "";
  document.getElementById("accountDescription").value = "";
}

function createAccount() {
  const nameInput = document.getElementById("accountName");
  const descInput = document.getElementById("accountDescription");

  const name = nameInput.value.trim();
  const description = descInput.value.trim();

  if (!name) {
    showNotification("Please enter an account name.");
    return;
  }

  bankData.accounts.push({
    id: Date.now(),
    name,
    description,
    balance: 0,
  });

  saveBankData();
  closeAddAccountModal();
  renderAccounts();
  showNotification(`${name} created successfully!`);
}

// --- WITHDRAW MODAL ---
function openWithdrawModal(accountId) {
  document.getElementById("withdrawAccountId").value = accountId;
  const modal = document.getElementById("withdrawModal");
  if (modal) modal.classList.remove("hidden");
}

function closeWithdrawModal() {
  const modal = document.getElementById("withdrawModal");
  if (modal) modal.classList.add("hidden");
  document.getElementById("withdrawAmount").value = "";
  document.getElementById("withdrawAccNumber").value = "";
  document.getElementById("withdrawAccName").value = "";
  document.getElementById("withdrawBank").selectedIndex = 0;
}

function submitWithdrawal() {
  const accountId = Number(document.getElementById("withdrawAccountId").value);
  const amount = safeNumber(document.getElementById("withdrawAmount").value);
  const accNum = document.getElementById("withdrawAccNumber").value.trim();
  const accName = document.getElementById("withdrawAccName").value.trim();
  const bank = document.getElementById("withdrawBank").value;

  const account = bankData.accounts.find((a) => a.id === accountId);
  if (!account) return;

  if (amount <= 0) {
    showNotification("Please enter a valid withdrawal amount.");
    return;
  }

  if (amount > safeNumber(account.balance)) {
    showNotification("Insufficient funds in this account.");
    return;
  }

  account.balance = safeNumber(account.balance) - amount;
  bankData.expense = safeNumber(bankData.expense) + amount;

  bankData.transactions.unshift({
    id: Date.now(),
    name: `Withdrawal - ${bank || "Bank"} (${accName || "Account"})`,
    type: "withdrawal",
    isIncome: false,
    amount: amount,
    date: getCurrentFormattedDate(),
  });

  saveBankData();
  closeWithdrawModal();
  renderAccounts();
  renderTransactions();
  showNotification(`Withdrew ${formatCurrency(amount)} successfully!`);
}

// --- FUND MODAL ---
function openFundModal(accountId) {
  document.getElementById("fundAccountId").value = accountId;
  const modal = document.getElementById("fundModal");
  if (modal) modal.classList.remove("hidden");
}

function closeFundModal() {
  const modal = document.getElementById("fundModal");
  if (modal) modal.classList.add("hidden");
  document.getElementById("fundAmount").value = "";
}

function submitFunding() {
  const accountId = Number(document.getElementById("fundAccountId").value);
  const amount = safeNumber(document.getElementById("fundAmount").value);
  const source = document.getElementById("fundSource").value;

  if (amount <= 0) {
    showNotification("Please enter a valid amount.");
    return;
  }

  const account = bankData.accounts.find((a) => a.id === accountId);
  if (account) {
    account.balance = safeNumber(account.balance) + amount;
    bankData.income = safeNumber(bankData.income) + amount;

    bankData.transactions.unshift({
      id: Date.now(),
      name: `Funding via ${source}`,
      type: "deposit",
      isIncome: true,
      amount: amount,
      date: getCurrentFormattedDate(),
    });

    saveBankData();
    closeFundModal();
    renderAccounts();
    renderTransactions();
    showNotification(`Funded ${formatCurrency(amount)} into ${account.name}`);
  }
}

// ============================================================
// LOGOUT MODAL & UTILITIES
// ============================================================
function getCurrentFormattedDate() {
  const now = new Date();
  return (
    now.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }) +
    " - " +
    now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
}

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
  saveBankData();
  renderUser();
  renderAccounts();
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
