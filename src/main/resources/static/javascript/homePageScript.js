document.addEventListener("DOMContentLoaded", function () {
  console.log("working");

  const learnOption = document.getElementById("learn-option");
  const leaderboardsOption = document.getElementById("leaderboards-option");
  const statsOption = document.getElementById("stats-option");
  const settingsOption = document.getElementById("settings-option");
  const takeQuizOption = document.getElementById("take-quiz-option");

  learnOption.addEventListener("click", () => {
    console.log("clicked learn option");
    window.location.replace("learnPage");
  });

  //   leaderboardsOption.addEventListener("click", () => {
  //     console.log("clicked leaderboards option");
  //     window.location.replace("leaderboardsPage");
  //   });

  //   statsOption.addEventListener("click", () => {
  //     console.log("clicked stats option");
  //     window.location.replace("statisticsPage");
  //   });

  settingsOption.addEventListener("click", () => {
    console.log("clicked settings option");
    window.location.replace("settingsPage");
  });

  takeQuizOption.addEventListener("click", () => {
    console.log("clicked quiz option");
    window.location.replace("quizMenu");
  });

  leaderboardsOption.addEventListener("click", () => {
    console.log("clicked leaderboards option");
    window.location.replace("leaderboardsPage");
  });
});
