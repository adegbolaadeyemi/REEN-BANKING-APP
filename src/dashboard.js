// ============================================================
// REEN BANK DASHBOARD
// ============================================================
// STORAGE KEYS
//

const USER_KEY = "userProfile";
const BANK_KEY = "reenBankData";

// ============================================================
// GET REGISTERED USER
// ============================================================

const savedUser = localStorage.getItem(USER_KEY);

if (!savedUser) {
  window.location.href = "./register.html";
}

const userProfile = JSON.parse(savedUser);

// ============================================================
// BANK DATA
// ============================================================

function createDefaultBankData() {
  return {
    balance: 0,
    income: 0,
    expense: 0,

    accounts: [
      {
        id: Date.now(),
        name: "Main Account",
        balance: 0,
        description: "Your main account",
      },
    ],

    transactions: [],
  };
}

function getBankData() {
  const savedBankData = localStorage.getItem(BANK_KEY);

  if (!savedBankData) {
    const newBankData = createDefaultBankData();

    localStorage.setItem(BANK_KEY, JSON.stringify(newBankData));

    return newBankData;
  }

  return JSON.parse(savedBankData);
}

let bankData = getBankData();

// ============================================================
// SAVE BANK DATA
// ============================================================

function saveBankData() {
  localStorage.setItem(BANK_KEY, JSON.stringify(bankData));
}

// ============================================================
// CURRENCY
// ============================================================

function formatCurrency(amount) {
  return `₦${Number(amount).toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

// ============================================================
// USER INFORMATION
// ============================================================

function generateAccountNumber() {
  const savedNumber = localStorage.getItem("reenAccountNumber");

  if (savedNumber) {
    return savedNumber;
  }

  const number = "10" + Math.floor(100000000 + Math.random() * 900000000);

  localStorage.setItem("reenAccountNumber", number);

  return number;
}

function renderUser() {
  const name = userProfile.name || "User";

  const accountNumber = generateAccountNumber();

  // Desktop
  const desktopName = document.getElementById("desktop-user-name");

  const desktopNumber = document.getElementById("desktop-account-number");

  if (desktopName) {
    desktopName.textContent = name;
  }

  if (desktopNumber) {
    desktopNumber.textContent = accountNumber;
  }

  // Mobile
  const mobileName = document.getElementById("mobile-user-name");

  const mobileNumber = document.getElementById("mobile-account-number");

  if (mobileName) {
    mobileName.textContent = name;
  }

  if (mobileNumber) {
    mobileNumber.textContent = accountNumber;
  }

  // Welcome
  const welcomeName = document.getElementById("welcomeName");

  if (welcomeName) {
    welcomeName.textContent = name.split(" ")[0];
  }

  // Initial
  const userInitial = document.getElementById("userInitial");

  if (userInitial) {
    userInitial.textContent = name.charAt(0).toUpperCase();
  }

  const userInitials = document.getElementById("userInitials");

  if (userInitials) {
    userInitials.textContent = name.charAt(0).toUpperCase();
  }
}

// Mobile Inial

// ============================================================
// BALANCE VISIBILITY
// ============================================================

let balanceHidden = false;

function toggleBalanceVisibility() {
  balanceHidden = !balanceHidden;

  renderBalances();
  renderAccounts();
  renderTransactions();
}

function renderBalances() {
  const balance = balanceHidden ? "••••••" : formatCurrency(bankData.balance);

  const income = balanceHidden ? "••••••" : formatCurrency(bankData.income);

  const expense = balanceHidden ? "••••••" : formatCurrency(bankData.expense);

  // Desktop
  const desktopBalance = document.getElementById("desktop-balance");

  const desktopIncome = document.getElementById("desktop-income");

  const desktopExpense = document.getElementById("desktop-expense");

  if (desktopBalance) {
    desktopBalance.textContent = balance;
  }

  if (desktopIncome) {
    desktopIncome.textContent = income;
  }

  if (desktopExpense) {
    desktopExpense.textContent = expense;
  }

  // Mobile
  const mobileBalance = document.getElementById("mobile-balance");

  const mobileIncome = document.getElementById("mobile-income");

  const mobileExpense = document.getElementById("mobile-expense");

  if (mobileBalance) {
    mobileBalance.textContent = balance;
  }

  if (mobileIncome) {
    mobileIncome.textContent = income;
  }

  if (mobileExpense) {
    mobileExpense.textContent = expense;
  }

  renderStatistics();
}

// ============================================================
// ACCOUNTS
// ============================================================

function renderAccounts() {
  const desktop = document.getElementById("desktop-accounts-list");

  const mobile = document.getElementById("mobile-accounts-list");

  // Desktop
  if (desktop) {
    desktop.innerHTML = bankData.accounts
      .map((account) => {
        return `
              <div
                class="bg-[#D4F3E7] rounded-2xl p-5 min-h-[130px]"
              >

                <p
                  class="text-[#46237A] text-sm font-semibold"
                >
                  ${escapeHTML(account.name)}
                </p>

                <p class="text-2xl font-bold mt-5">
                  ${balanceHidden ? "••••••" : formatCurrency(account.balance)}
                </p>

                ${
                  account.description
                    ? `
                      <p class="text-xs text-gray-500 mt-2">
                        ${escapeHTML(account.description)}
                      </p>
                    `
                    : ""
                }

              </div>
            `;
      })
      .join("");
  }

  // Mobile
  if (mobile) {
    mobile.innerHTML = bankData.accounts
      .map((account) => {
        return `
              <div
                class="bg-[#D4F3E7] rounded-2xl p-4 min-w-[160px] flex-shrink-0"
              >

                <p
                  class="text-[#46237A] text-sm font-semibold"
                >
                  ${escapeHTML(account.name)}
                </p>

                <p class="text-lg font-bold mt-3">
                  ${balanceHidden ? "••••••" : formatCurrency(account.balance)}
                </p>

              </div>
            `;
      })
      .join("");
  }
}

// ============================================================
// TRANSACTION ICON
// ============================================================

function getTransactionIcon(transaction) {
  if (transaction.type === "transfer") {
    return "⇄";
  }

  return transaction.isIncome ? "+" : "-";
}

// ============================================================
// TRANSACTION COLOR
// ============================================================

function getTransactionColor(transaction) {
  if (transaction.type === "transfer") {
    return "#46237A";
  }

  return transaction.isIncome ? "#33B786" : "#E74F5B";
}

// ============================================================
// TRANSACTIONS
// ============================================================

function renderTransactions(searchTerm = "") {
  const desktop = document.getElementById("transaction-list");

  const mobile = document.getElementById("mobile-transaction-list");

  const filtered = bankData.transactions.filter((transaction) => {
    if (!searchTerm) {
      return true;
    }

    const search = searchTerm.toLowerCase();

    return (
      transaction.name.toLowerCase().includes(search) ||
      transaction.type.toLowerCase().includes(search) ||
      (transaction.fromAccount || "").toLowerCase().includes(search) ||
      (transaction.toAccount || "").toLowerCase().includes(search)
    );
  });

  // Empty
  if (filtered.length === 0) {
    const emptyHTML = `
      <div class="text-center py-10">

        <div
          class="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3"
        >
          <span class="text-xl">
            ₦
          </span>
        </div>

        <p class="font-semibold text-gray-600">
          No transactions yet
        </p>

        <p class="text-xs text-gray-400 mt-1">
          Your deposits, withdrawals and transfers will appear here.
        </p>

      </div>
    `;

    if (desktop) {
      desktop.innerHTML = emptyHTML;
    }

    if (mobile) {
      mobile.innerHTML = emptyHTML;
    }

    return;
  }

  // ==========================================================
  // DESKTOP
  // ==========================================================

  if (desktop) {
    desktop.innerHTML = filtered
      .slice(0, 8)
      .map((transaction) => {
        const icon = getTransactionIcon(transaction);

        const color = getTransactionColor(transaction);

        const background =
          transaction.type === "transfer"
            ? "bg-purple-50"
            : transaction.isIncome
              ? "bg-[#E4F8F0]"
              : "bg-red-50";

        return `
              <div
                class="flex items-center justify-between border-b border-gray-100 pb-4"
              >

                <div class="flex items-center gap-3">

                  <div
                    class="w-9 h-9 rounded-full ${background} flex items-center justify-center"
                  >
                    <span
                      style="color: ${color}"
                      class="font-bold"
                    >
                      ${icon}
                    </span>
                  </div>

                  <div>

                    <p class="font-semibold text-sm">
                      ${escapeHTML(transaction.name)}
                    </p>

                    ${
                      transaction.type === "transfer"
                        ? `
                          <p class="text-xs text-gray-500">
                            ${escapeHTML(transaction.fromAccount)}
                            →
                            ${escapeHTML(transaction.toAccount)}
                          </p>
                        `
                        : ""
                    }

                    <p class="text-xs text-gray-400">
                      ${escapeHTML(transaction.date)}
                    </p>

                  </div>

                </div>

                <p
                  class="font-bold text-sm"
                  style="color: ${color}"
                >
                  ${balanceHidden ? "••••" : transaction.amount}
                </p>

              </div>
            `;
      })
      .join("");
  }

  // ==========================================================
  // MOBILE
  // ==========================================================

  if (mobile) {
    mobile.innerHTML = filtered
      .slice(0, 10)
      .map((transaction) => {
        const icon = getTransactionIcon(transaction);

        const color = getTransactionColor(transaction);

        const background =
          transaction.type === "transfer"
            ? "bg-purple-50"
            : transaction.isIncome
              ? "bg-[#E4F8F0]"
              : "bg-red-50";

        return `
              <div
                class="flex justify-between items-center border-b border-gray-100 pb-4"
              >

                <div class="flex items-center gap-3">

                  <div
                    class="w-9 h-9 rounded-full ${background} flex items-center justify-center"
                  >
                    <span
                      style="color: ${color}"
                      class="font-bold"
                    >
                      ${icon}
                    </span>
                  </div>

                  <div>

                    <p class="font-semibold text-sm">
                      ${escapeHTML(transaction.name)}
                    </p>

                    ${
                      transaction.type === "transfer"
                        ? `
                          <p class="text-[10px] text-gray-500">
                            ${escapeHTML(transaction.fromAccount)}
                            →
                            ${escapeHTML(transaction.toAccount)}
                          </p>
                        `
                        : ""
                    }

                    <p class="text-[10px] text-gray-400">
                      ${escapeHTML(transaction.date)}
                    </p>

                  </div>

                </div>

                <span
                  class="font-bold text-sm"
                  style="color: ${color}"
                >
                  ${balanceHidden ? "••••" : transaction.amount}
                </span>

              </div>
            `;
      })
      .join("");
  }
}

// ============================================================
// STATISTICS
// ============================================================

function renderStatistics() {
  const income = bankData.income;

  const expense = bankData.expense;

  const total = income + expense;

  let incomePercentage = 0;

  let expensePercentage = 0;

  if (total > 0) {
    incomePercentage = (income / total) * 100;

    expensePercentage = (expense / total) * 100;
  }

  // Desktop
  const incomeText = document.getElementById("statistics-income");

  const expenseText = document.getElementById("statistics-expense");

  const incomeBar = document.getElementById("income-bar");

  const expenseBar = document.getElementById("expense-bar");

  if (incomeText) {
    incomeText.textContent = balanceHidden ? "••••" : formatCurrency(income);
  }

  if (expenseText) {
    expenseText.textContent = balanceHidden ? "••••" : formatCurrency(expense);
  }

  if (incomeBar) {
    incomeBar.style.width = `${incomePercentage}%`;
  }

  if (expenseBar) {
    expenseBar.style.width = `${expensePercentage}%`;
  }

  // Mobile
  const mobileIncome = document.getElementById("mobile-stat-income");

  const mobileExpense = document.getElementById("mobile-stat-expense");

  const mobileIncomeBar = document.getElementById("mobile-income-bar");

  const mobileExpenseBar = document.getElementById("mobile-expense-bar");

  if (mobileIncome) {
    mobileIncome.textContent = balanceHidden ? "••••" : formatCurrency(income);
  }

  if (mobileExpense) {
    mobileExpense.textContent = balanceHidden
      ? "••••"
      : formatCurrency(expense);
  }

  if (mobileIncomeBar) {
    mobileIncomeBar.style.width = `${incomePercentage}%`;
  }

  if (mobileExpenseBar) {
    mobileExpenseBar.style.width = `${expensePercentage}%`;
  }
}

// ============================================================
// ADD ACCOUNT
// ============================================================

function openAddAccountModal() {
  const modal = document.getElementById("accountModal");

  if (modal) {
    modal.classList.remove("hidden");
  }

  const input = document.getElementById("accountName");

  if (input) {
    input.focus();
  }
}

function closeAddAccountModal() {
  const modal = document.getElementById("accountModal");

  if (modal) {
    modal.classList.add("hidden");
  }

  const name = document.getElementById("accountName");

  const description = document.getElementById("accountDescription");

  if (name) {
    name.value = "";
  }

  if (description) {
    description.value = "";
  }
}

function createAccount() {
  const name = document.getElementById("accountName").value.trim();

  const description = document
    .getElementById("accountDescription")
    .value.trim();

  if (!name) {
    alert("Please enter an account name.");

    return;
  }

  const accountExists = bankData.accounts.some(
    (account) => account.name.toLowerCase() === name.toLowerCase(),
  );

  if (accountExists) {
    alert("An account with this name already exists.");

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

  updateDashboard();

  showNotification(`${name} account created.`);
}

// ============================================================
// SEARCH
// ============================================================

function setupSearch() {
  const desktopSearch = document.getElementById("desktop-search");

  const mobileSearch = document.getElementById("mobile-search");

  if (desktopSearch) {
    desktopSearch.addEventListener("input", () => {
      renderTransactions(desktopSearch.value.trim());
    });
  }

  if (mobileSearch) {
    mobileSearch.addEventListener("input", () => {
      renderTransactions(mobileSearch.value.trim());
    });
  }
}

function toggleMobileSearch() {
  const search = document.getElementById("mobileSearch");

  if (search) {
    search.classList.toggle("hidden");
  }
}

// ============================================================
// LOGOUT
// ============================================================

function openLogoutModal() {
  const modal = document.getElementById("logoutModal");

  if (modal) {
    modal.classList.remove("hidden");
  }
}

function closeLogoutModal() {
  const modal = document.getElementById("logoutModal");

  if (modal) {
    modal.classList.add("hidden");
  }
}

function logout() {
  localStorage.setItem("reenLoggedOut", "true");

  window.location.href = "./index.html";
}

// ============================================================
// NOTIFICATION
// ============================================================

function showNotification(message) {
  const existing = document.getElementById("dashboardToast");

  if (existing) {
    existing.remove();
  }

  const toast = document.createElement("div");

  toast.id = "dashboardToast";

  toast.className = `
    fixed
    top-5
    right-5
    z-[100]
    bg-[#33B786]
    text-white
    px-5
    py-3
    rounded-xl
    shadow-xl
    font-semibold
    text-sm
  `;

  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// ============================================================
// DATE
// ============================================================

function getCurrentDate() {
  const date = new Date();

  return (
    date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }) +
    " - " +
    date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
}

// ============================================================
// SECURITY HELPER
// ============================================================

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// ============================================================
// UPDATE EVERYTHING
// ============================================================

function updateDashboard() {
  renderUser();

  renderBalances();

  renderAccounts();

  renderTransactions();

  renderStatistics();
}

// ============================================================
// INITIALIZATION
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  updateDashboard();

  setupSearch();
});
