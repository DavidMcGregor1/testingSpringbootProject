function checkTextArea() {
  // Get the value of the text area
  var textValue = document.getElementById("newDescription").value;

  // Get the submit button
  var submitButton = document.getElementById("submit-description-button");

  // Show alert if the text area is empty when submitting
  submitButton.onclick = function () {
    console.log("Clicked submit button");
    if (textValue.trim() === "") {
      alert("Text area cannot be empty");
      return false; // Prevent form submission
    } else {
      submitDescription();
    }
  };
}

const newDescriptionInput = document.getElementById("newDescription");
document.getElementById("edit-description").classList.add("noneClass");
document.getElementById("add-acronym-container").classList.add("noneClass");

function addNewAcronym() {
  console.log("Called addNewAcronym method");
  document
    .getElementById("add-acronym-container")
    .classList.remove("noneClass");
  document.getElementById("edit-description").classList.add("noneClass");
  document.getElementById("description").classList.add("noneClass");
}

const addAcronymAcronymInput = document.getElementById("new-acronym-letters");

addAcronymAcronymInput.addEventListener("input", () => {
  if (
    addAcronymAcronymInput.value.length >
    parseInt(addAcronymAcronymInput.maxLength)
  ) {
    addAcronymAcronymInput.value = addAcronymAcronymInput.value.slice(
      0,
      addAcronymAcronymInput.maxLength
    );
  }

  addAcronymAcronymInput.value = addAcronymAcronymInput.value.toUpperCase();
  console.log(addAcronymAcronymInput.value.length);
  console.log(addAcronymAcronymInput.value);
});

function editDescription() {
  console.log("Called edit description method");
  const descriptionSection = document.getElementById("description");
  const editDescriptionSection = document.getElementById("edit-description");
  const highlightedRow = document.querySelector(
    "#acronym-table tbody tr.highlighted"
  );
  const meaningOfChosenAcronym = highlightedRow.querySelector(
    ".acronym-cell:last-child"
  ).innerText;

  const textArea = document.getElementById("newDescription");
  textArea.setAttribute(
    "placeholder",
    "Enter a short description for " + meaningOfChosenAcronym + "..."
  );
  textArea.style.fontSize = "1.5rem";

  document.getElementById("edit-meaning-of-chosen-acronym").innerText =
    meaningOfChosenAcronym;
  descriptionSection.classList.add("noneClass");
  editDescriptionSection.classList.remove("noneClass");
}

function cancelEdit() {
  document.getElementById("description").classList.remove("noneClass");
  document.getElementById("edit-description").classList.add("noneClass");
}

function cancelNewAcronym() {
  console.log("Clicked cancel button");
  document.getElementById("description").classList.remove("noneClass");
  document.getElementById("add-acronym-container").classList.add("noneClass");
}

function submitDescription() {
  const newDescription = document.getElementById("newDescription").value;
  const highlightedRow = document.querySelector(
    "#acronym-table tbody tr.highlighted"
  );
  const acronymId = highlightedRow.getAttribute("data-acronym-id");

  if (newDescription.length < 30 || newDescription.length > 350) {
    alert("Description must be between 30 and 350 characters");
    return;
  }

  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log("Description updated successfully");
      } else {
        console.error("Error updating description: ", xhr.status);
      }
    }
  };

  xhr.open("PUT", "updateAcronymDescription", true);
  xhr.setRequestHeader("Content-Type", "application/json");

  document.getElementById("description").classList.remove("noneClass");
  document.getElementById("edit-description").classList.add("noneClass");

  const requestBody = JSON.stringify({
    id: acronymId,
    newDescription: newDescription,
  });

  xhr.send(requestBody);
  window.location.reload();
}

var originalAcronyms;
var searchInput = document.getElementById("search-input-id");

function filterTableBySearch() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("search-input-id");
  filter = input.value.toUpperCase();
  table = document.getElementById("acronym-table");
  tr = table.getElementsByTagName("tr");

  if (filter === "") {
    // If the search input is empty, reset the table
    resetTable();
    return;
  }

  for (i = 0; i < tr.length; i++) {
    var matchFound = false;
    var tdAcronym = tr[i].getElementsByTagName("td")[0];
    var tdMeaning = tr[i].getElementsByTagName("td")[1];

    if (tdAcronym && tdMeaning) {
      var txtValueAcronym = tdAcronym.textContent || tdAcronym.innerText;
      var txtValueMeaning = tdMeaning.textContent || tdMeaning.innerText;

      if (
        txtValueAcronym.toUpperCase().indexOf(filter) > -1 ||
        txtValueMeaning.toUpperCase().indexOf(filter) > -1
      ) {
        matchFound = true;
      }
    }

    if (matchFound) {
      tr[i].style.display = "";
    } else {
      tr[i].style.display = "none";
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Add event listener for the "search" event
  searchInput.addEventListener("search", function () {
    if (searchInput.value === "") {
      // If the search input is cleared using 'x', reset the table
      resetTable();
    }
  });

  // First row logic
  const firstRow = document.querySelector(
    "#acronym-table tbody tr:first-child"
  );
  firstRow.classList.add("highlighted");

  const firstRowAcronymId = firstRow.getAttribute("data-acronym-id");
  updatedDescription(firstRowAcronymId);
  attachRowEventListeners();

  // Update description box with clicked acronym
  const cells = document.getElementsByClassName("acronym-cell");
  Array.from(cells).forEach(function (cell) {
    cell.addEventListener("click", function () {
      var clickedAcronymId = cell.parentElement.getAttribute("data-acronym-id");
      updatedDescription(clickedAcronymId);
    });
  });

  // Next button logic

  let currentIndex = 0;
  const nextButton = document.getElementById("next-button");
  nextButton.addEventListener("click", () => {
    console.log("Clicked next button");
    currentIndex++;
    const rows = document.querySelectorAll("#acronym-table tbody tr");

    if (currentIndex >= rows.length) {
      currentIndex = 0;
    }

    rows.forEach((row) => {
      row.classList.remove("highlighted");
    });

    rows[currentIndex].classList.add("highlighted");

    const highlightedAcronymId =
      rows[currentIndex].getAttribute("data-acronym-id");
    updatedDescription(highlightedAcronymId);
  });

  // Category dropdown logic

  const categoryDropdown = document.getElementById("categoryDropdown");
  categoryDropdown.addEventListener("change", function () {
    const selectedCategory = categoryDropdown.value;
    const selectedLength = lengthDropdown.value;
    // updateTableWithCategory(selectedCategory)
    updateTableWithCategoryAndLength(selectedCategory, selectedLength);
  });

  // Length dropdown logic
  const lengthDropdown = document.getElementById("lengthDropdown");
  lengthDropdown.addEventListener("change", function () {
    const selectedLength = lengthDropdown.value;
    const selectedCategory = categoryDropdown.value;
    console.log("Selected: " + selectedLength);
    // updateTableWithLength(selectedLength)
    updateTableWithCategoryAndLength(selectedCategory, selectedLength);
  });

  // All button logic
  const allButton = document.getElementById("all-button");
  allButton.addEventListener("click", () => {
    console.log("clicked on all button");
    resetTable();
    highlightFirstAcronym();
  });

  // Original Acronym list logic
  originalAcronyms = Array.from(
    document.querySelectorAll("#acronym-table tbody tr")
  ).map((row) => {
    return {
      id: row.getAttribute("data-acronym-id"),
      acronym: row.querySelector(".acronym-cell:first-child").textContent,
      meaning: row.querySelector(".acronym-cell:last-child").textContent,
    };
  });
});

attachRowEventListeners();

// Update table content logic
function updateTableContent(acronyms) {
  console.log("called updateTableContent");
  var tbody = document.querySelector("#acronym-table tbody");
  tbody.innerHTML = "";

  acronyms = acronyms || originalAcronyms;

  acronyms.forEach(function (acronym) {
    var row = document.createElement("tr");

    row.setAttribute("data-acronym-id", acronym.id);

    var acronymCell = document.createElement("td");
    acronymCell.textContent = acronym.acronym;

    var meaningCell = document.createElement("td");
    meaningCell.textContent = acronym.meaning;

    row.appendChild(acronymCell);
    row.appendChild(meaningCell);
    tbody.appendChild(row);
  });

  highlightFirstAcronym();
}

// Reset table logic
function resetTable() {
  // Reset the category dropdown to its placeholder value
  var categoryDropdown = document.getElementById("categoryDropdown");
  if (categoryDropdown) {
    categoryDropdown.selectedIndex = 0;
  }

  // Reset the length dropdown to its placeholder value
  var lengthDropdown = document.getElementById("lengthDropdown");
  if (lengthDropdown) {
    lengthDropdown.selectedIndex = 0;
  }

  updateTableContent(originalAcronyms);
  attachRowEventListeners();
}

// Attach event listeners to the rows logic
function attachRowEventListeners() {
  const rows = document.querySelectorAll("#acronym-table tbody tr");
  rows.forEach((row) => {
    row.addEventListener("click", function () {
      rows.forEach((row) => {
        row.classList.remove("highlighted");
      });
      row.classList.add("highlighted");
      const clickedAcronymId = row.getAttribute("data-acronym-id");
      updatedDescription(clickedAcronymId);
    });
  });
}

// update table with chosen category and length
function updateTableWithCategoryAndLength(category, length) {
  console.log("called updateTableWithCategoryAndLength method");
  var xhr = new XMLHttpRequest();
  console.log("xhr: " + xhr);
  console.log("xhr.response" + xhr.responseText);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      console.log("xhr.readyState = 4");
      if (xhr.status === 200) {
        console.log("xhr.status = 200");
        var acronyms = JSON.parse(xhr.responseText);
        console.log("xhr.response" + xhr.responseText);

        // Update the table with the new data
        updateTableContent(acronyms);

        attachRowEventListeners();
      } else {
        console.error("Error:", xhr.status);
      }
    }
  };

  console.log(
    "URL:",
    "/acronymsByCategoryAndLength?category=" + category + "&length=" + length
  );
  xhr.open(
    "GET",
    "/acronymsByCategoryAndLength?category=" + category + "&length=" + length,
    true
  );
  xhr.send();
}

// highlight the first acronym in the table logic
function highlightFirstAcronym() {
  const firstRow = document.querySelector(
    "#acronym-table tbody tr:first-child"
  );

  if (firstRow) {
    firstRow.classList.add("highlighted");

    const firstRowAcronymId = firstRow.getAttribute("data-acronym-id");

    updatedDescription(firstRowAcronymId);
  }
}

function updateEditAcronym(aronymid) {
  console.log("Called updateEditAcronym method");
}

// update the description box with the clicked acornym id
function updatedDescription(acronymId) {
  console.log("called updatedDescription method");
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);

        document.getElementById("description-text").innerText =
          response.description;
        document.getElementById("meaning-of-chosen-acronym").innerText =
          response.meaning;
      } else {
        console.error("Error:", xhr.status);
      }
    }
  };

  xhr.open("POST", "/getAcronymMeaningAndDescriptionById", true);
  xhr.setRequestHeader("Content-Type", "application/json");

  var requestBody = JSON.stringify({ id: acronymId });
  xhr.send(requestBody);
}
