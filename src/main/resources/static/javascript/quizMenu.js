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
  var cButton = document.getElementById("countdown-mode-button");
  var pButton = document.getElementById("practice-mode-button");
  cButton.classList.add("selected");
  pButton.classList.remove("selected");
}

function selectPracticeMode() {
  var pButton = document.getElementById("practice-mode-button");
  var cButton = document.getElementById("countdown-mode-button");
  pButton.classList.add("selected");
  cButton.classList.remove("selected");
}
