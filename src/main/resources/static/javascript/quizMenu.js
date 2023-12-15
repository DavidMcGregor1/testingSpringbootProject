document.addEventListener("DOMContentLoaded", function () {
  // Main variables
  const countdownModeContainer = document.getElementById(
    "countdown-mode-container"
  );
  const practiceModeContainer = document.getElementById(
    "practice-mode-container"
  );
  const countdownButton = document.getElementById("countdown-mode-button");
  const practiceButton = document.getElementById("practice-mode-button");
  const startButton = document.getElementById("start-button");
  // CD variables
  const cdOptionButtons = document.querySelectorAll(".cd-option-button");
  const cdCategoriesButtons = document.querySelectorAll(
    ".cd-categories-button"
  );
  const cdLengthButtons = document.querySelectorAll(".cd-length-button");
  const cdAllButton = document.getElementById("c-all-button");
  // P variables
  const pOptionButtons = document.querySelectorAll(".p-option-button");
  const pCategoriesButtons = document.querySelectorAll(".p-categories-button");
  const pLengthButtons = document.querySelectorAll(".p-length-button");
  const pAllButton = document.getElementById("p-all-button");
  const backButton = document.getElementById("back-page-button");
  const minThirtyButton = document.getElementById("1m30s");
  const fifteenButton = document.getElementById("15");

  // Data variables
  var countdownSelectedOptions = {
    option: [],
    categories: [],
    length: [],
    all: false,
  };
  var practiceSelectedOptions = {
    option: [],
    categories: [],
    length: [],
    all: false,
  };

  backButton.addEventListener("click", () => {
    console.log("clicked back button");
    window.location.replace("homePage");
  });

  countdownModeContainer.classList.add("hidden");
  practiceModeContainer.classList.add("hidden");
  startButton.classList.add("hidden");

  countdownButton.addEventListener("click", () => {
    countdownModeContainer.classList.remove("hidden");
    practiceModeContainer.classList.add("hidden");
    countdownButton.classList.add("clicked");
    practiceButton.classList.remove("clicked");
    startButton.classList.remove("hidden");
    arrayToDisaply = countdownSelectedOptions;
  });

  practiceButton.addEventListener("click", () => {
    countdownModeContainer.classList.add("hidden");
    practiceModeContainer.classList.remove("hidden");
    countdownButton.classList.remove("clicked");
    practiceButton.classList.add("clicked");
    startButton.classList.remove("hidden");
  });

  function resetButtonGroup(buttons) {
    buttons.forEach((button) => button.classList.remove("clicked"));
  }

  function handleButtonClick(
    button,
    buttons,
    allButton,
    selectedOptions,
    section
  ) {
    if (allButton.classList.contains("clicked")) {
      allButton.classList.remove("clicked");
    }
    resetButtonGroup(buttons);
    button.classList.add("clicked");
    console.log("Selected:", button.innerText);
    selectedOptions[section] = [button.innerText];
  }

  // Countdown mode buttons
  cdOptionButtons.forEach((button) => {
    button.addEventListener("click", () =>
      handleButtonClick(
        button,
        cdOptionButtons,
        cdAllButton,
        countdownSelectedOptions,
        "option"
      )
    );
  });

  cdCategoriesButtons.forEach((button) => {
    button.addEventListener("click", () => {
      console.log("clicked categories button");
      handleButtonClick(
        button,
        cdCategoriesButtons,
        cdAllButton,
        countdownSelectedOptions,
        "categories"
      );
      countdownSelectedOptions.all = false;
    });
  });

  cdLengthButtons.forEach((button) => {
    button.addEventListener("click", () => {
      console.log("clicked length button");
      handleButtonClick(
        button,
        cdLengthButtons,
        cdAllButton,
        countdownSelectedOptions,
        "length"
      );
      countdownSelectedOptions.all = false;
    });
  });

  cdAllButton.addEventListener("click", () => {
    resetButtonGroup(cdCategoriesButtons);
    resetButtonGroup(cdLengthButtons);
    cdAllButton.classList.add("clicked");
    countdownSelectedOptions.all = true;
  });

  // Practice mode buttons
  pOptionButtons.forEach((button) => {
    button.addEventListener("click", () =>
      handleButtonClick(
        button,
        pOptionButtons,
        pAllButton,
        practiceSelectedOptions,
        "option"
      )
    );
  });

  pCategoriesButtons.forEach((button) => {
    button.addEventListener("click", () =>
      handleButtonClick(
        button,
        pCategoriesButtons,
        pAllButton,
        practiceSelectedOptions,
        "categories"
      )
    );
  });

  pLengthButtons.forEach((button) => {
    button.addEventListener("click", () =>
      handleButtonClick(
        button,
        pLengthButtons,
        pAllButton,
        practiceSelectedOptions,
        "length"
      )
    );
  });

  pAllButton.addEventListener("click", () => {
    resetButtonGroup(pCategoriesButtons);
    resetButtonGroup(pLengthButtons);
    pAllButton.classList.add("clicked");
    practiceSelectedOptions.all = true;
  });

  // Simulate a click on the default buttons for Countdown and Practice modes
  minThirtyButton.click();
  fifteenButton.click();
  cdAllButton.click();
  pAllButton.click();

  startButton.addEventListener("click", () => {
    console.log("clicked start button");
    if (countdownButton.classList.contains("clicked")) {
      console.log("clicked countdownbutton");
      console.log("Countdown selected options =>", countdownSelectedOptions);
    } else if (practiceButton.classList.contains("clicked")) {
      console.log("Practice selected options =>", practiceSelectedOptions);
    }
  });
});
