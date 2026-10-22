"use strict";

// Task 0: select elements and update text.
const nameInput = document.getElementById("fan-name");
const welcomeButton = document.querySelector("#welcome-button");
const welcomeMessage = document.getElementById("welcome-message");

welcomeButton.addEventListener("click", function () {
  const name = nameInput.value.trim();
  if (name === "") {
    welcomeMessage.textContent = "Please enter your name.";
  } else {
    welcomeMessage.textContent = "Welcome, " + name + "! Hala Madrid!";
  }
});

// Task 1: toggle a CSS class and describe the next action.
const themeButton = document.getElementById("theme-button");
themeButton.addEventListener("click", function () {
  const darkTheme = document.body.classList.toggle("dark-theme");
  if (darkTheme) {
    themeButton.textContent = "Switch to light theme";
  } else {
    themeButton.textContent = "Switch to dark theme";
  }
});

// Task 2: every button controls its own answer.
const questions = document.querySelectorAll(".faq-question");
for (const question of questions) {
  question.addEventListener("click", function () {
    const answer = document.getElementById(question.getAttribute("aria-controls"));
    answer.hidden = !answer.hidden;
    question.setAttribute("aria-expanded", String(!answer.hidden));
  });
}

// Task 3: filter titles after every input change.
const searchInput = document.getElementById("topic-search");
const cards = document.querySelectorAll(".search-card");
const searchCount = document.getElementById("search-count");
const noResults = document.getElementById("no-results");

searchInput.addEventListener("input", function () {
  const searchText = searchInput.value.trim().toLowerCase();
  let matches = 0;
  for (const card of cards) {
    const title = card.querySelector("h3").textContent.toLowerCase();
    const isMatch = title.includes(searchText);
    card.hidden = !isMatch;
    if (isMatch) {
      matches++;
    }
  }
  searchCount.textContent = "Matching topics: " + matches;
  noResults.hidden = matches !== 0;
});

// Task 4: add and remove items without reloading the page.
const favouritesForm = document.getElementById("favourites-form");
const favouriteInput = document.getElementById("favourite-input");
const favouritesList = document.getElementById("favourites-list");
const listMessage = document.getElementById("list-message");
const itemCount = document.getElementById("item-count");

function updateItemCount() {
  itemCount.textContent = "Items: " + favouritesList.children.length;
}

favouritesForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const text = favouriteInput.value.trim();
  if (text === "") {
    listMessage.textContent = "Please enter a player or football topic.";
    return;
  }

  const item = document.createElement("li");
  const itemText = document.createElement("span");
  itemText.textContent = text;
  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.textContent = "Remove";
  removeButton.addEventListener("click", function () {
    item.remove();
    updateItemCount();
  });

  item.append(itemText, removeButton);
  favouritesList.append(item);
  favouriteInput.value = "";
  listMessage.textContent = "";
  updateItemCount();
  favouriteInput.focus();
});
