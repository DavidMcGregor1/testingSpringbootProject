console.log("QuizMenu.js Called");

const practiceModeDiv = document.getElementById("practice-mode-container");
const countdownModeDiv = document.getElementById("countdown-mode-container");
const practiceModeButton = document.getElementById("practice-mode-button");
const countdownModeButton = document.getElementById("countdown-mode-button");
const theAllButton = document.getElementById("theAllButton");
theAllButton.click();
countdownModeButton.click();

practiceModeDiv.classList.add("noneClass");
practiceModeButton.addEventListener("click", () => {
  console.log("clicked practice mode button");
  countdownModeDiv.classList.add("noneClass");
  practiceModeDiv.classList.remove("noneClass");
});

countdownModeButton.addEventListener("click", () => {
  console.log("clicked coutndown mode button");
  practiceModeDiv.classList.add("noneClass");
  countdownModeDiv.classList.remove("noneClass");
});

function selectButton() {
  var button = document.getElementById("theAllButton");
  button.classList.add("selected");
}

function selectCountdownMode() {
  var button = document.getElementById("countdown-mode-button");
  button.classList.add("selected");
}

function selectPracticeMode() {
  var button = document.getElementById("practice-mode-button");
  button.classList.add("selected");
}
