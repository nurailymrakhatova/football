$(document).ready(function () {
  $(".needs-validation").each(function () {
    const form = $(this);
    const fields = form.find("input[required], textarea[required], select[required]");
    const success = form.parent().find(".form-status");
    const formError = form.find(".form-error");

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
      if (type === "tel") {
        const digits = value.replace(/\D/g, "");
        valid = valid && /^\+?[0-9 ()-]+$/.test(value) && digits.length >= 10 && digits.length <= 15;
      }
      if (type === "password") {
        valid = valid && value.length >= 8 && value.length <= 64 && /[a-z]/.test(value) &&
          /[A-Z]/.test(value) && /[0-9]/.test(value) && /[^A-Za-z0-9\s]/.test(value) && !/\s/.test(value);
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
      formError.text("");
      form.addClass("was-checked");
      let valid = true;
      fields.each(function () {
        if (!validateField($(this))) {
          valid = false;
        }
      });
      if (valid) {
        let title = "Message checked";
        let message = "Demo successful! No information was sent or stored. Your entries stay in the form until you choose Reset or leave this page.";
        try {
          if (form.attr("id") === "registration-form") {
            const user = {
              firstName: $("#first-name").val().trim(),
              lastName: $("#last-name").val().trim(),
              email: $("#registration-email").val().trim().toLowerCase(),
              password: $("#password").val(),
              phone: $("#registration-phone").val().trim(),
              country: $("#country").val(),
              gender: form.find("input[name=gender]:checked").val() || "Not selected",
              interests: form.find("input[name=interests]:checked").map(function () { return this.value; }).get()
            };
            if (!fanAccount.register(user)) {
              formError.text("This email already has a practice account. Choose Log in below, or use another sample email.").trigger("focus");
              return;
            }
            title = "Practice account created";
            message = "Your sample profile is saved in this browser. Close this window and choose Log in to open your profile.";
            form.find("input[type=password]").val("").removeClass("is-valid").removeAttr("aria-invalid");
          } else if (form.attr("id") === "login-form") {
            if (!fanAccount.login($("#login-email").val().trim().toLowerCase(), $("#login-password").val())) {
              formError.text("The email or password does not match a practice account in this browser. Check your details or sign up first.").trigger("focus");
              return;
            }
            window.location.assign("profile.html");
            return;
          }
        } catch (error) {
          formError.text("Your practice account could not be saved or read. Allow site storage in this browser and try again. Use the hosted website or Live Server.").trigger("focus");
          return;
        }
        success.text(message).fadeIn(200);
        showFeedback(title, message, form.find("button[type=submit]")[0]);
      } else {
        form.find(".is-invalid").first().trigger("focus");
      }
    });
    form.on("input change", "input, textarea, select", function () {
      success.stop(true, true).hide().text("");
      formError.text("");
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
      formError.text("");
      fields.first().trigger("focus");
    });
  });
});
