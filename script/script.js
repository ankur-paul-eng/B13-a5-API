// get the element
const loginPage = document.getElementById("login-page");
const mainPage = document.getElementById("main-page");
const userInput = document.getElementById("user-input");
const passwordInput = document.getElementById("password-input");
const singInBtn = document.getElementById("singin-btn");
const btnsContainer = document.getElementById("btns-container");
const allCardsContainer = document.getElementById("all-cards-show");
const spinnerLoad = document.getElementById("spinner-load");
const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");
const issuesCount = document.getElementById("issues-count");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

// login btn here
singInBtn.addEventListener("click", () => {
  const userInputValue = userInput.value;
  const passwordInputValue = passwordInput.value;
  const isLogIn =
    userInputValue === "admin" && passwordInputValue === "admin123";

  if (!isLogIn) {
    alert("Your username or password is wrong! please try again.");
    userInput.value = "";
    passwordInput.value = "";
    return;
  } else {
    mainPage.classList.remove("hidden");
    loginPage.classList.add("hidden");
  }
});

//search automatic show when find specific card
searchInput.addEventListener("input", async () => {
  const searchValue = searchInput.value.toLowerCase();
  showLoadingSpinner();

  if (searchValue.trim() === "") {
    // search empty
    const res = await fetch(
      "https://phi-lab-server.vercel.app/api/v1/lab/issues",
    );
    const data = await res.json();
    displayCard(data.data);
  } else {
    // search with query
    const res = await fetch(
      `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`,
    );
    const data = await res.json();
    displayCard(data.data);
  }

  removeLoadingSpinner();
});
//

// issues count fnc
const updateIssuesCardsCount = (cardsArr) => {
  issuesCount.textContent = `${cardsArr.length} Issues`;
};

// all btn dynamic loaded here
allBtn.addEventListener("click", async () => {
  setActiveBtn(allBtn);
  showLoadingSpinner();
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();
  displayCard(data.data);

  removeLoadingSpinner();
});

//open btn dynamic loaded here
openBtn.addEventListener("click", async () => {
  setActiveBtn(openBtn);
  showLoadingSpinner();
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();
  const openCards = data.data.filter((card) => card.status === "open");
  displayCard(openCards);

  removeLoadingSpinner();
});

//closed btn dynamic loaded here
closedBtn.addEventListener("click", async () => {
  setActiveBtn(closedBtn);
  showLoadingSpinner();
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();
  const closedCards = data.data.filter((card) => card.status === "closed");
  displayCard(closedCards);

  removeLoadingSpinner();
});

// active btn when click

const setActiveBtn = (activeBtn) => {
  const allActiveBtns = document.querySelectorAll(".active-common-btn");
  allActiveBtns.forEach((btn) => btn.classList.remove("btn-primary"));

  activeBtn.classList.add("btn-primary");
};

//spinner loading
const showLoadingSpinner = () => {
  spinnerLoad.classList.remove("hidden");
  allCardsContainer.innerText = "";
};
const removeLoadingSpinner = () => {
  spinnerLoad.classList.add("hidden");
};

// show spinner for modal
const showModalSpinner = () => {
  spinnerLoad.classList.remove("hidden");
};

// labels arr output
const labelFunc = (arr) => {
  const specificElm = arr.map((elm) => {
    let color = "bg-gray-100 text-gray-500";
    let icon = `<i class="fa-solid fa-tag"></i>`;

    //
    if (elm === "bug") {
      color = "text-[#EF4444] bg-red-100";
      icon = `<i class="fa-solid fa-bug"></i>`;
    } else if (elm === "help wanted") {
      color = "text-[#F59E0B] bg-yellow-100";
      icon = `<i class="fa-regular fa-life-ring"></i>`;
    } else if (elm === "good first issue") {
      color = "bg-orange-100 text-orange-500";
      icon = `<i class="fa-solid fa-file-circle-exclamation"></i>`;
    } else if (elm === "documentation") {
      color = "bg-purple-100 text-purple-500";
      icon = `<i class="fa-regular fa-file-lines"></i>`;
    } else if (elm === "enhancement") {
      color = "bg-blue-100 text-blue-500";
      icon = `<i class="fa-solid fa-arrow-up-right-dots"></i>`;
    }
    ///
    return `<span class="px-3 py-1 rounded-3xl shadow bg-gray-100 ${color}">${icon} ${elm.toUpperCase()}</span>`;
  });
  return specificElm.join("");
};

// priority bg
const priorityFunc = (priority) => {
  if (priority === "high") {
    return "text-red-700 bg-red-200";
  } else if (priority === "medium") {
    return "text-yellow-700 bg-yellow-200";
  } else if (priority === "low") {
    return "text-gray-700 bg-gray-200";
  }
};

