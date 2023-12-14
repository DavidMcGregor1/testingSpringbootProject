document.addEventListener("DOMContentLoaded", function () {
  console.log("working");

  const backButton = document.getElementById("back-page-button");

  backButton.addEventListener("click", () => {
    console.log("clicked back button");
    window.location.replace("homePage");
  });
});
