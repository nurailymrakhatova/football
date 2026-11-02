$(document).ready(function () {
  // 1. Welcome message and theme.
  function showWelcome() {
    const name = $("#fan-name").val().trim();
    if (name === "") {
      $("#welcome-message").text("Please enter your name.");
      $("#fan-name").addClass("input-error").attr("aria-invalid", "true");
    } else {
      $("#welcome-message").text("Welcome, " + name + "! Hala Madrid!");
      $("#fan-name").removeClass("input-error").attr("aria-invalid", "false");
    }
  }
  $("#welcome-button").on("click", showWelcome);
  $("#fan-name").on("input", showWelcome);
  $("#theme-button").on("click", function () {
    $("body").toggleClass("dark-theme");
    const dark = $("body").hasClass("dark-theme");
    $(this).text(dark ? "Switch to light theme" : "Switch to dark theme");
    $(this).attr("aria-pressed", String(dark));
  });

  // 2. Stop the previous animation before starting the next one.
  $(".faq-question").on("click", function () {
    const answer = $("#" + $(this).attr("aria-controls"));
    const open = $(this).attr("aria-expanded") === "true";
    $(this).attr("aria-expanded", String(!open));
    if (open) {
      answer.stop(true, true).slideUp(200);
    } else {
      answer.stop(true, true).slideDown(200);
    }
  });

  // 3. Search and category must both match.
  function filterTopics() {
    const search = $("#topic-search").val().trim().toLowerCase();
    const category = $("#topic-category").val();
    let matches = 0;
    $(".search-card").each(function () {
      const title = $(this).find("h3").text().toLowerCase();
      const sameCategory = category === "all" || $(this).attr("data-category") === category;
      const match = title.includes(search) && sameCategory;
      $(this).toggle(match);
      if (match) {
        matches++;
      }
    });
    $("#search-count").text("Matching topics: " + matches);
    $("#no-results").toggle(matches === 0);
  }
  $("#topic-search").on("input", filterTopics);
  $("#topic-category").on("change", filterTopics);
  $("#clear-filters").on("click", function () {
    $("#topic-search").val("");
    $("#topic-category").val("all");
    filterTopics();
    $("#topic-search").trigger("focus");
  });
  filterTopics();

  // 4. Safely create items and delegate Remove clicks to the list.
  function updateItemCount() {
    const count = $("#favourites-list li").length;
    $("#item-count").text("Items: " + count);
    $("#empty-list").toggle(count === 0);
  }
  function showListStatus(message) {
    $("#list-status").stop(true, true).text(message).hide().fadeIn(200).delay(1400).fadeOut(200);
  }
  $("#favourites-form").on("submit", function (event) {
    event.preventDefault();
    const text = $("#favourite-input").val().trim();
    if (text === "") {
      $("#list-message").text("Please enter a player or football topic.");
      $("#favourite-input").addClass("input-error").attr("aria-invalid", "true").trigger("focus");
      return;
    }
    const item = $("<li>");
    const itemText = $("<span>").text(text);
    const removeButton = $("<button>").attr("type", "button").addClass("remove-item").text("Remove");
    removeButton.attr("aria-label", "Remove " + text);
    item.append(itemText, removeButton);
    $("#favourites-list").append(item);
    $("#favourite-input").val("").removeClass("input-error").attr("aria-invalid", "false").trigger("focus");
    $("#list-message").text("");
    updateItemCount();
    showListStatus("Added to your favourites.");
  });
  $("#favourite-input").on("input", function () {
    $(this).removeClass("input-error").removeAttr("aria-invalid");
    $("#list-message").text("");
  });
  $("#favourites-list").on("click", ".remove-item", function () {
    $(this).closest("li").remove();
    updateItemCount();
    showListStatus("Removed from your favourites.");
    $("#favourite-input").trigger("focus");
  });
  updateItemCount();
});
