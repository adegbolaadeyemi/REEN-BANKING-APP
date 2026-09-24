const transactions = [
  {
    name: "Oluwaben Jamin",
    date: "06.Mar.2023 - 09:39",
    amount: "- 10,000.00",
    isIncome: false,
  },
  {
    name: "Oluwaben Jamin",
    date: "06.Mar.2023 - 09:39",
    amount: "+ 10,000.00",
    isIncome: true,
  },
  {
    name: "Oluwaben Jamin",
    date: "06.Mar.2023 - 09:39",
    amount: "- 10,000.00",
    isIncome: false,
  },
  {
    name: "Oluwaben Jamin",
    date: "06.Mar.2023 - 09:39",
    amount: "+ 10,000.00",
    isIncome: true,
  },
  {
    name: "Oluwaben Jamin",
    date: "06.Mar.2023 - 09:39",
    amount: "- 10,000.00",
    isIncome: false,
  },
  {
    name: "Oluwaben Jamin",
    date: "06.Mar.2023 - 09:39",
    amount: "+ 10,000.00",
    isIncome: true,
  },
  {
    name: "Oluwaben Jamin",
    date: "06.Mar.2023 - 09:39",
    amount: "- 10,000.00",
    isIncome: false,
  },
  {
    name: "Oluwaben Jamin",
    date: "06.Mar.2023 - 09:39",
    amount: "+ 10,000.00",
    isIncome: true,
  },
];

// Targeting the id="transaction-list" and applying the map function
document.getElementById("transaction-list").innerHTML = transactions
  .map(
    (tx) => `
        <div class="flex gap-5 items-center border-b border-gray-100 pb-3">
          
            <p class="font-semibold text-gray-400 text-xl">${tx.name}</p>
            <p class="text-[13px] text-gray-400 ">${tx.date}</p>
            <span class="font-bold text-xl ${tx.isIncome ? "text-[#33B786]" : "text-[#E74F5B]"}">
            ${tx.amount}
          </span>
          
          
        </div>
      `,
  )
  .join("");

//   MOBILE
const transaction = [
  {
    name: "Oluwaben Jamin",
    date: "06.Mar.2023 - 09:39",
    amount: "- 10,000.00",
    isIncome: false,
  },
  {
    name: "Oluwaben Jamin",
    date: "06.Mar.2023 - 09:39",
    amount: "+ 10,000.00",
    isIncome: true,
  },
  {
    name: "Oluwaben Jamin",
    date: "06.Mar.2023 - 09:39",
    amount: "- 10,000.00",
    isIncome: false,
  },
  {
    name: "Oluwaben Jamin",
    date: "06.Mar.2023 - 09:39",
    amount: "+ 10,000.00",
    isIncome: true,
  },
  {
    name: "Oluwaben Jamin",
    date: "06.Mar.2023 - 09:39",
    amount: "- 10,000.00",
    isIncome: false,
  },
  {
    name: "Oluwaben Jamin",
    date: "06.Mar.2023 - 09:39",
    amount: "+ 10,000.00",
    isIncome: true,
  },
  {
    name: "Oluwaben Jamin",
    date: "06.Mar.2023 - 09:39",
    amount: "- 10,000.00",
    isIncome: false,
  },
  {
    name: "Oluwaben Jamin",
    date: "06.Mar.2023 - 09:39",
    amount: "+ 10,000.00",
    isIncome: true,
  },
];

document.getElementById("mobile-transaction-list").innerHTML = transaction
  .map(
    (tx) => `
        <div class="flex justify-between items-center border-b border-gray-100 pb-3">
          <div>
            <p class="font-semibold text-gray-700 text-sm">${tx.name}</p>
            <p class="text-[11px] text-gray-400">${tx.date}</p>
          </div>
          <span class="font-bold text-sm ${tx.isIncome ? "text-[#33B786]" : "text-[#E74F5B]"}">
            ${tx.amount}
          </span>
        </div>
      `,
  )
  .join("");
