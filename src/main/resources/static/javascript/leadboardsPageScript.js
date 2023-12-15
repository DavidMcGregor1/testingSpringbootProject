document.addEventListener("DOMContentLoaded", function () {
  console.log("working");

  const backButton = document.getElementById("back-button");
  backButton.addEventListener("click", () => {
    console.log("clicked back button");
    window.location.replace("homePage");
  });
});
