document.addEventListener("DOMContentLoaded", () => {
  // Array containing all FAQ data matching your screenshots
  const faqData = [
    {
      id: 0,
      question: "How do I sign up for an account with Reen Bank?",
      answer:
        "You can sign up for an account with Reen Bank online by visiting our website and filling out the online application form. Once your application is approved, you will receive instructions for setting up your account and accessing our online banking platform.",
    },
    {
      id: 1,
      question: "What types of accounts does Reen Bank offer?",
      answer:
        "Reen Bank offers a variety of accounts to suit your financial needs, including savings accounts, checking accounts, and credit cards. We also offer loans, investment services, and other financial products.",
    },
    {
      id: 2,
      question: "Is Reen Bank FDIC insured?",
      answer:
        "Yes, Reen Bank is FDIC insured, which means that your deposits are insured up to $250,000 per depositor, per insured bank, for each account ownership category.",
    },
    {
      id: 3,
      question: "How can I access my Reen Bank account online?",
      answer:
        "You can access your Reen Bank account online by logging into our secure online banking platform using your username and password. From there, you can view your account balances, transfer funds, pay bills, and more.",
    },
    {
      id: 4,
      question:
        "What security measures does Reen Bank have in place to protect my financial information?",
      answer:
        "Reen Bank takes the security of your financial information seriously and has a number of measures in place to protect against unauthorized access and fraud. These measures include encryption, two-factor authentication, fraud detection, and regular security updates and monitoring.",
    },
  ];

  // Currently displayed FAQ (default index 0)
  let activeIndex = 0;

  const displayTitle = document.getElementById("faqDisplayTitle");
  const displayText = document.getElementById("faqDisplayText");
  const faqListContainer = document.getElementById("faqList");

  function renderFAQs() {
    // 1. Update Left Side Display Area
    const activeFAQ = faqData[activeIndex];
    displayTitle.textContent = activeFAQ.question;
    displayText.textContent = activeFAQ.answer;

    // 2. Clear Right Side List
    faqListContainer.innerHTML = "";

    // 3. Render all questions EXCEPT the active one
    faqData.forEach((item, index) => {
      if (index !== activeIndex) {
        const itemBtn = document.createElement("button");
        itemBtn.type = "button";
        itemBtn.className =
          "flex items-center justify-between text-left text-[#46237A] hover:text-[#33B786] text-sm md:text-base font-medium underline transition-all duration-200 cursor-pointer group py-2";

        itemBtn.innerHTML = `
          <span class="pr-4 leading-snug">${item.question}</span>
          <span class="text-2xl font-bold no-underline transform group-hover:translate-x-1 transition-transform">→</span>
        `;

        // Click handler to switch active FAQ
        itemBtn.addEventListener("click", () => {
          activeIndex = index;
          renderFAQs();
        });

        faqListContainer.appendChild(itemBtn);
      }
    });
  }

  // Initial render
  renderFAQs();
});
