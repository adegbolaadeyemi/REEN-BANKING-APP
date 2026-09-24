const transactions = [
  {
    name: "Oluwaben Jamin",
    type: "Bank Transfer",
    date: "06.Mar.2023 - 09:39",
    amount: "- 10,000.00",
    isIncome: false,
    status: "Pending", // Options: "Completed", "Pending", "Canceled"
  },
  {
    name: "Oluwaben Jamin",
    type: "Direct Pay",
    date: "06.Mar.2023 - 09:39",
    amount: "+ 10,000.00",
    isIncome: true,
    status: "Completed",
  },
  {
    name: "Oluwaben Jamin",
    type: "Bank Transfer",
    date: "06.Mar.2023 - 09:39",
    amount: "- 10,000.00",
    isIncome: false,
    status: "Canceled",
  },
  {
    name: "Oluwaben Jamin",
    type: "Credit Card",
    date: "06.Mar.2023 - 09:39",
    amount: "+ 10,000.00",
    isIncome: true,
    status: "Completed",
  },
  {
    name: "Oluwaben Jamin",
    type: "Bank Transfer",
    date: "06.Mar.2023 - 09:39",
    amount: "- 10,000.00",
    isIncome: false,
    status: "Pending",
  },
  {
    name: "Oluwaben Jamin",
    type: "Direct Pay",
    date: "06.Mar.2023 - 09:39",
    amount: "+ 10,000.00",
    isIncome: true,
    status: "Completed",
  },
  {
    name: "Oluwaben Jamin",
    type: "Bank Transfer",
    date: "06.Mar.2023 - 09:39",
    amount: "- 10,000.00",
    isIncome: false,
    status: "Canceled",
  },
];

document.getElementById("transaction-table-body").innerHTML = transactions
  .map((tx) => {
    // Determine Status Badge styles based on status string
    let statusBg = "bg-emerald-500";
    if (tx.status === "Pending") statusBg = "bg-gray-400";
    if (tx.status === "Canceled") statusBg = "bg-[#E74F5B]";

    return `
      <tr class="border-b border-gray-100 hover:bg-gray-50/50 transition">
        <!-- Icon & Status -->
        <td class="py-3 px-4">
          <div class="w-9 h-9 rounded-full ${tx.isIncome ? "bg-[#33B786]" : "bg-[#E74F5B]"} text-white flex items-center justify-center font-bold text-3xl shadow-sm">
            ${tx.isIncome ? "+" : "-"}
          </div>
        </td>
        <!-- Name -->
        <td class="py-3 px-4 font-medium text-gray-400 text-sm">
          ${tx.name}
        </td>
        <!-- Transfer Method -->
        <td class="py-3 px-4 text-gray-500 text-sm">
          ${tx.type}
        </td>
        <!-- Date -->
        <td class="py-3 px-4 text-gray-400 text-sm">
          ${tx.date}
        </td>
        <!-- Amount -->
        <td class="py-5 px-4 font-bold text-xl ${tx.isIncome ? "text-[#33B786]" : "text-[#E74F5B]"} text-right">
          ${tx.amount}
        </td>
        <!-- Status Badge -->
        <td class="py-3 px-4 text-right">
          <span class="inline-block px-4 py-2.5 rounded text-white text-xs font-semibold ${statusBg} shadow-xs min-w-[150px] text-center">
            ${tx.status}
          </span>
        </td>
      </tr>
    `;
  })
  .join("");

const transaction = [
  {
    name: "Oluwaben Jamin",
    type: "Bank Transfer",
    date: "06.Mar.2023 - 09:39",
    amount: "- 10,000.00",
    isIncome: false,
    status: "Pending",
  },
  {
    name: "Oluwaben Jamin",
    type: "Direct Pay",
    date: "06.Mar.2023 - 09:39",
    amount: "+ 10,000.00",
    isIncome: true,
    status: "Completed",
  },
  {
    name: "Oluwaben Jamin",
    type: "Bank Transfer",
    date: "06.Mar.2023 - 09:39",
    amount: "- 10,000.00",
    isIncome: false,
    status: "Canceled",
  },
  {
    name: "Oluwaben Jamin",
    type: "Credit Card",
    date: "06.Mar.2023 - 09:39",
    amount: "+ 10,000.00",
    isIncome: true,
    status: "Completed",
  },
  {
    name: "Oluwaben Jamin",
    type: "Bank Transfer",
    date: "06.Mar.2023 - 09:39",
    amount: "- 10,000.00",
    isIncome: false,
    status: "Pending",
  },
  {
    name: "Oluwaben Jamin",
    type: "Direct Pay",
    date: "06.Mar.2023 - 09:39",
    amount: "+ 10,000.00",
    isIncome: true,
    status: "Completed",
  },
  {
    name: "Oluwaben Jamin",
    type: "Bank Transfer",
    date: "06.Mar.2023 - 09:39",
    amount: "- 10,000.00",
    isIncome: false,
    status: "Canceled",
  },
];

document.getElementById("transactions-table-body").innerHTML = transaction
  .map((tx) => {
    let statusBg = "bg-emerald-500";
    if (tx.status === "Pending") statusBg = "bg-gray-400";
    if (tx.status === "Canceled") statusBg = "bg-[#E74F5B]";

    return `
          <tr class="border-b border-gray-100 hover:bg-gray-50/50 transition">
            <!-- Icon -->
            <td class="py-3 px-2">
              <div class="w-8 h-8 rounded-full ${tx.isIncome ? "bg-[#33B786]" : "bg-[#E74F5B]"} text-white flex items-center justify-center font-bold text-lg shadow-sm">
                ${tx.isIncome ? "+" : "-"}
              </div>
            </td>
            <!-- Name & Type -->
            <td class="py-3 px-2">
              <p class="font-medium text-gray-700 text-xs">${tx.name}</p>
              <p class="text-gray-400 text-[10px]">${tx.type}</p>
            </td>
            <!-- Date -->
            <td class="py-3 px-2 text-gray-400 text-[10px] whitespace-nowrap">
              ${tx.date}
            </td>
            <!-- Amount -->
            <td class="py-3 px-2 font-bold text-xs ${tx.isIncome ? "text-[#33B786]" : "text-[#E74F5B]"} text-right whitespace-nowrap">
              ${tx.amount}
            </td>
            <!-- Status Badge -->
            <td class="py-3 px-2 text-right">
              <span class="block px-3 py-1 rounded text-white text-[10px] font-semibold ${statusBg} shadow-xs text-center">
                ${tx.status}
              </span>
            </td>
          </tr>
        `;
  })
  .join("");
