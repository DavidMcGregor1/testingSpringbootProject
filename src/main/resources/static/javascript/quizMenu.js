document.addEventListener("DOMContentLoaded", function () {
  const countdownModeContainer = document.getElementById(
    "countdown-mode-container"
  );
  const practiceModeContainer = document.getElementById(
    "practice-mode-container"
  );
  const countdownButton = document.getElementById("countdown-mode-button");
  const practiceButton = document.getElementById("practice-mode-button");
  const startButton = document.getElementById("start-button");
  //cd variables
  const cdOptionButtons = document.querySelectorAll(".cd-option-button");
  const cdCategoriesButtons = document.querySelectorAll(
    ".cd-categories-button"
  );
  const cdLengthButtons = document.querySelectorAll(".cd-length-button");
  const cdAllButton = document.getElementById("c-all-button");
  //p variables
  const pOptionButtons = document.querySelectorAll(".p-option-button");
  const pCategoriesButtons = document.querySelectorAll(".p-categories-button");
  const pLengthButtons = document.querySelectorAll(".p-length-button");
  const pAllButton = document.getElementById("p-all-button");
  const backButton = document.getElementById("back-page-button");

  backButton.addEventListener("click", () => {
    console.log("clicked back button");
    window.location.replace("homePage");
  });

  countdownModeContainer.classList.add("hidden");
  practiceModeContainer.classList.add("hidden");
  startButton.classList.add("hidden");

  let cdAllSelected = false;
  let pAllSelected = false;

  countdownButton.addEventListener("click", () => {
    countdownModeContainer.classList.remove("hidden");
    practiceModeContainer.classList.add("hidden");
    countdownButton.classList.add("clicked");
    practiceButton.classList.remove("clicked");
    startButton.classList.remove("hidden");
    logSelection();
  });

  practiceButton.addEventListener("click", () => {
    countdownModeContainer.classList.add("hidden");
    practiceModeContainer.classList.remove("hidden");
    countdownButton.classList.remove("clicked");
    practiceButton.classList.add("clicked");
    startButton.classList.remove("hidden");
  });

  cdOptionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      console.log("clicked cdOptionButtons");
      cdOptionButtons.forEach((b) => b.classList.remove("clicked"));
      button.classList.add("clicked");
      logSelection();
    });
  });

  pOptionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      pOptionButtons.forEach((b) => b.classList.remove("clicked"));
      button.classList.add("clicked");
      pLogSelection();
    });
  });

  cdCategoriesButtons.forEach((button) => {
    button.addEventListener("click", () => {
      console.log("Clicked cdCategoriesButtons");
      const isButtonClicked = button.classList.contains("clicked");
      const group = button.getAttribute("data-group");

      if (button === cdAllButton) {
        cdCategoriesButtons.forEach((b) => b.classList.remove("clicked"));
      } else {
        cdCategoriesButtons.forEach((b) => {
          if (b.getAttribute("data-group") === group) {
            b.classList.remove("clicked");
          }
        });
      }
      button.classList.toggle("clicked", !isButtonClicked);
      logSelection();
    });
  });

  pCategoriesButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const isButtonClicked = button.classList.contains("clicked");
      const group = button.getAttribute("data-group");

      if (button === cdAllButton) {
        pCategoriesButtons.forEach((b) => b.classList.remove("clicked"));
      } else {
        pCategoriesButtons.forEach((b) => {
          if (b.getAttribute("data-group") === group) {
            b.classList.remove("clicked");
          }
        });
      }
      button.classList.toggle("clicked", !isButtonClicked);
      pLogSelection();
    });
  });

  cdLengthButtons.forEach((button) => {
    button.addEventListener("click", () => {
      cdLengthButtons.forEach((b) => b.classList.remove("clicked"));
      button.classList.add("clicked");
      logSelection();
    });
  });

  pLengthButtons.forEach((button) => {
    button.addEventListener("click", () => {
      pLengthButtons.forEach((b) => b.classList.remove("clicked"));
      button.classList.add("clicked");
      pLogSelection();
    });
  });

  cdAllButton.addEventListener("click", () => {
    cdCategoriesButtons.forEach((button) => button.classList.remove("clicked"));
    cdAllButton.classList.add("clicked");
    cdAllSelected = cdAllButton.classList.contains("clicked");
    logSelection();
  });

  pAllButton.addEventListener("click", () => {
    pCategoriesButtons.forEach((button) => button.classList.remove("clicked"));
    pAllButton.classList.add("clicked");
    pAllSelected = pAllButton.classList.contains("clicked");
    pLogSelection();
  });

  startButton.addEventListener("click", () => {
    console.log("Starting quiz...");
  });

  function logSelection() {
    console.log("Inside of countdown mode log section method");

    const selectedMode = countdownButton.classList.contains("clicked")
      ? "Countdown"
      : "Practice";
    const selectedTime = document.querySelector(".cd-option-button.clicked");
    const selectedCCategories = Array.from(
      document.querySelectorAll(".cd-categories-button.clicked")
    ).map((button) => button.textContent);
    const selectedCLength = cdAllSelected
      ? null
      : Array.from(document.querySelectorAll(".cd-length-button.clicked"))
          .map((button) => button.textContent)
          .pop();

    console.log("Selected mode: " + selectedMode);
    console.log(
      "Selected time: --> " + (selectedTime ? selectedTime.textContent : null)
    );
    console.log(
      "Selected category: " +
        (selectedCCategories.length > 0 ? selectedCCategories : null)
    );
    console.log(
      "Selected length: " + (selectedCLength ? selectedCLength : null)
    );
    console.log("Selected all: " + cdAllSelected);
    console.log("------------------------------");
  }

  function pLogSelection() {
    console.log("Inside of practice mode log section method");

    const selectedMode = countdownButton.classList.contains("clicked")
      ? "Countdown"
      : "Practice";
    const selectedTime = document.querySelector(".p-option-button.clicked");
    const selectedCCategories = Array.from(
      document.querySelectorAll(".p-categories-button.clicked")
    ).map((button) => button.textContent);
    const selectedCLength = pAllSelected
      ? null
      : Array.from(document.querySelectorAll(".p-length-button.clicked"))
          .map((button) => button.textContent)
          .pop();

    console.log("Selected mode: " + selectedMode);
    console.log(
      "Selected questions: --> " +
        (selectedTime ? selectedTime.textContent : null)
    );
    console.log(
      "Selected category: " +
        (selectedCCategories.length > 0 ? selectedCCategories : null)
    );
    console.log(
      "Selected length: " + (selectedCLength ? selectedCLength : null)
    );
    console.log("Selected all: " + pAllSelected);
    console.log("------------------------------");
  }
});
