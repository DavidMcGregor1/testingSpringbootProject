console.log("loginScript.js is working");

// ---------- SIGN IN SECTION AND RANDOM NAME GENERATION ----------

const signUpContainer = document.getElementById("sign-up-container");
const signInContainer = document.getElementById("sign-in-container");
const signUpButton = document.getElementById("sign-up-btn");
const signInButton = document.getElementById("sign-in-btn");
const regenerateButton = document.getElementById("regenerate-button");
signUpContainer.classList.add("noneClass");

signUpButton.addEventListener("click", () => {
  console.log("Clicked signUpButton");
  signInContainer.classList.add("noneClass");
  signUpContainer.classList.remove("noneClass");
  generateUsername();
});

signInButton.addEventListener("click", () => {
  console.log("Clicked signInButton");
  signUpContainer.classList.add("noneClass");
  signInContainer.classList.remove("noneClass");
});

regenerateButton.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("Clicked regen button");
});

function generateUsername() {
  console.log("Called generateUsername method");
  const adjectives = ["Happy", "Sunny", "Smelly"];
  const nouns = ["Orange", "Elephant", "Penguin"];

  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const generatedUsername = randomAdjective + randomNoun;
  document.getElementById("username-input").value = generatedUsername;
}

// ---------- POST LOGIN TO API ----------
const loginError = document.getElementById("login-error");
loginError.classList.add("hide");

const loginButton = document.getElementById("login-button");
loginButton.addEventListener("click", () => {
  const username = document.getElementById("username-login-input").value;
  const password = document.getElementById("password-login-input").value;
  console.log("USERNAME: " + username + " PASSWORD: " + password);

  const usernameCredentials = {
    username: username,
    password: password,
  };

  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log("status 200");
        window.location.href = "learnPage";
      } else {
        console.log("Incorrect credentials");
        loginError.classList.remove("hide");
      }
    }
  };

  xhr.open("POST", "/validateLogin", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  const requestBody = JSON.stringify(usernameCredentials);
  console.log("Request body:" + requestBody);
  xhr.send(requestBody);
});
