$(document).ready(function () {
  $(".needs-validation").each(function () {
    const form = $(this);
    const fields = form.find("input[required], textarea[required], select[required]");
    const success = form.parent().find(".form-status");

    // Keep the rules from Assignment 5 and show feedback with jQuery.
    function validateField(field) {
      const type = field.attr("type");
      const value = type === "password" ? field.val() : field.val().trim();
      const minimum = Number(field.attr("minlength")) || 0;
      const maximum = Number(field.attr("maxlength")) || Infinity;
      let valid = value.trim() !== "" && value.length >= minimum && value.length <= maximum;
      if (type === "email") {
        valid = valid && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && !field[0].validity.typeMismatch;
      }
      if (field.attr("id") === "confirm-password") {
        valid = valid && value === $("#password").val();
      }
      field.toggleClass("is-invalid", !valid).toggleClass("is-valid", valid);
      field.attr("aria-invalid", String(!valid));
      return valid;
    }
    form.on("submit", function (event) {
      event.preventDefault();
      success.stop(true, true).hide().text("");
      form.addClass("was-checked");
      let valid = true;
      fields.each(function () {
        if (!validateField($(this))) {
          valid = false;
        }
      });
      if (valid) {
        const title = form.attr("id") === "registration-form" ? "Registration checked" : "Message checked";
        const message = "Demo successful! No information was sent or stored. Your entries stay in the form until you choose Reset or leave this page.";
        success.text(message).fadeIn(200);
        showFeedback(title, message, form.find("button[type=submit]")[0]);
      } else {
        form.find(".is-invalid").first().trigger("focus");
      }
    });
    form.on("input change", "input, textarea, select", function () {
      success.stop(true, true).hide().text("");
      if (form.hasClass("was-checked")) {
        fields.each(function () {
          validateField($(this));
        });
      }
    });
    form.on("reset", function () {
      form.removeClass("was-checked");
      fields.removeClass("is-invalid is-valid").removeAttr("aria-invalid");
      success.stop(true, true).hide().text("");
      fields.first().trigger("focus");
    });
  });
});
