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


// border top condition
const borderTopCon = (bor) => {
  if (bor === "open") {
    return "border-t-4 border-t-green-500";
  } else if (bor === "closed") {
    return "border-t-4 border-t-purple-500";
  }
};

// get dateUpdate
const dateUpdate = (date) => {
  const createDate = new Date(date);
  const day = createDate.getDate();
  const month = createDate.getMonth() + 1;
  const year = createDate.getFullYear();
  return `${day} / ${month} / ${year}`;
};

// modal option start
// issuesModal.addEventListener("click", () => {});

// load modal
const loadModal = async (id) => {
  showModalSpinner();
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`,
  );
  const data = await res.json();
  displayModal(data.data);
  removeLoadingSpinner();
};

// displayModal
const displayModal = (card) => {
  const modalContainer = document.getElementById("modal-card");
  modalContainer.innerHTML = `
 
                  <h2 class="text-xl font-bold">${card.title}</h2>
                  <div class="flex flex-wrap items-center gap-2">
                    <span  class="badge ${card.status === "open" ? "badge-success" : "badge-warning"} rounded-2xl">${card.status.toUpperCase()}</span>
                    <p class="text-gray-500 flex items-center gap-2">
                      <img src="./assets/Ellipse 5.png" alt="" />Opened by ${card.assignee || "Unassigned"}
                    </p>
                    <p class="text-gray-500 flex items-center gap-2">
                      <img src="./assets/Ellipse 5.png" alt="" />${dateUpdate(card.createdAt)}
                    </p>
                  </div>
                </div>
                <div class="flex text-[12px] flex-wrap items-center gap-2">
                  ${labelFunc(card.labels)}
                </div>
                <p class="text-gray-500 line-clamp-2">
                  ${card.description}
                </p>

                <div class="grid grid-cols-2 px-4 py-2 bg-gray-100 rounded-xl">
                  <div class="space-y-2">
                    <p class="text-lg text-gray-500">Assignee:</p>
                    <p class="font-semibold">${card.assignee || "Unassigned"}</p>
                  </div>
                  <div class="space-y-2">
                    <p class="text-lg text-gray-500">Priority:</p>
                    <span
                      id="priority-unq"
                      class="rounded-4xl py-1 px-3 ${priorityFunc(card.priority)} bg-gray-100"
                    >
                      ${card.priority.toUpperCase()}
                    </span>
                  </div>
               
  `;
  document.getElementById("issues_modal").showModal();
};

//cards  dynamic loaded here
const loadCard = async () => {
  showLoadingSpinner();
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  const res = await fetch(url);
  const data = await res.json();
  displayCard(data.data);
  removeLoadingSpinner();
};
//display cards
const displayCard = (cards) => {
  // update Issues Cards Count
  updateIssuesCardsCount(cards);

  allCardsContainer.innerHTML = "";
  cards.forEach((card) => {
    // statusIcon
    const statusIcon =
      card.status === "closed"
        ? "./assets/closed- Status.png"
        : "./assets/open-Status.png";

    const div = document.createElement("div");
    div.className = `space-y-5 p-4 shadow-md rounded-lg ${borderTopCon(card.status)}`;
    div.addEventListener("click", () => loadModal(card.id));
    div.innerHTML = `
    
        <div class="space-y-5 pb-4 border-b-2 border-b-gray-200">
          <div class="flex gap-6 justify-between items-center">
            <img
              src="${statusIcon}"
              alt=""
            />
            <span id="priority-unq" class="rounded-4xl py-1 px-8 ${priorityFunc(card.priority)} bg-gray-100 text-md">
            ${card.priority.toUpperCase()}
            </span>
          </div>
          <div class="space-y-2">
            <h2 class="text-xl font-bold">${card.title}</h2>
            <p class="text-gray-500 line-clamp-2">${card.description}</p>
          </div>
          <div class="flex text-[12px] flex-wrap items-center gap-2">
           ${labelFunc(card.labels)}
          </div>
        </div>
        <div>
          <p class="text-gray-500 text-sm">#${card.id} by ${card.author}</p>
          <p class="text-gray-500 text-sm">${dateUpdate(card.createdAt)}</p>
        </div>
     
    `;

    allCardsContainer.appendChild(div);
  });
};

// specific btn click show cards
const specificBtnClick = (cards) => {};

// declare fn
loadCard();