# Real Madrid Fan Website

A student website about Real Madrid, its players, history and stadium.

## Team and existing page responsibilities

| Team member | Page |
|---|---|
| Amantay Aiymzhan | Home (index.html) |
| Aruzhan Meirkhan | Team (team.html) |
| Ayazhan Serikkazy | History (history.html) |
| Nurailym Rakhatova | Stadium (stadium.html) |

Each member must make their own identifiable commits for Assignment 5 and explain their contribution during defence.

## How to open

Open index.html in a browser, or open the project folder in VS Code and use Live Server. Keep the css, js and images folders together with the HTML files. No installation or build is needed.

- Contact form: Stadium page, "Ask about a stadium visit" section.
- Registration form: Fan Club in the navigation.
- [Published website](https://nurailymrakhatova.github.io/football/)

## Assignment 5 - Teamwork

### Tasks 0 and 1: Contact form

The contact form has Name, Email, Message and Submit controls. Every control has a name, a unique id and a connected label.

- `required` makes all three fields mandatory.
- `type="email"` checks the email format.
- `minlength="2"` sets the minimum name length.
- `minlength="10"` and `maxlength="500"` set the message length limits.

### Task 2: Bootstrap styling and feedback

The forms use Bootstrap `form-label`, `form-control`, `form-select`, `row`, `g-3`, `col-12` and `col-md-6` classes. Paired fields are next to each other on larger screens and stack on mobile screens. Helper text explains the input rules.

Bootstrap CSS is stored in css/bootstrap.min.css. The colours and page layout use the existing website styles and css/forms.css. No Bootstrap JavaScript is needed.

The submit handler in js/forms.js follows the Bootstrap validation example. It adds `was-validated` and uses `checkValidity()`. The `valid-feedback` and `invalid-feedback` messages follow the actual HTML validity of each field. `preventDefault()` keeps this demonstration on the same page.

### Task 3: Registration form

The form includes required first and last names (minimum 2 characters), email, password and confirmation (minimum 8 characters), and a required country dropdown with an empty default option.

Gender is optional, includes "Prefer not to say", and uses a fieldset and legend. Football interests are optional checkboxes.

`checkPasswords()` compares the two passwords. `setCustomValidity()` sets a mismatch error or clears it when the values match. Both password fields trigger the check when edited.

Valid forms show a demonstration success message. Reset clears the values, Bootstrap feedback, success message and custom password error. No account is created and no information is sent or stored.

### Task 4: Test results

Tested in Microsoft Edge on 18 October 2026. Sample contact data: Name `Sample Fan`, Email `fan@example.com`, Message `Can I visit the stadium museum?`. Sample registration: First Name `Sample`, Last Name `Fan`, Email `fan@example.com`, both passwords `Madrid123!`, Country `Kazakhstan`.

| Test input or action | Expected result | Actual result |
|---|---|---|
| Submit empty contact form | Required fields show errors; no success | Passed: 3 errors, no success |
| Name `A`, email `wrong`, message `Too short` (9 characters) | Reject short name, invalid email and short message | Passed: all 3 fields invalid |
| Otherwise valid contact with messages of 10 and 500 characters | Accept both boundary lengths | Passed: success for both lengths |
| Type a 501st character into Message | Prevent input longer than 500 characters | Passed: message remains 500 characters |
| Valid contact data | Show success | Passed: valid feedback and demo success |
| Submit empty registration | Required fields show errors; optional choices stay optional | Passed: 6 errors, no success |
| Names `A` and `B`, email `bad`, both passwords `1234567`, country Kazakhstan | Reject short names, invalid email and short passwords | Passed: 5 invalid fields |
| Password `Madrid123!`, confirmation `Different123!` | Reject mismatched passwords | Passed: confirmation error, no success |
| Correct confirmation, then change the original password | Clear the mismatch, then detect the new mismatch | Passed: feedback updates after each edit |
| Otherwise valid registration with no country selected | Reject missing country | Passed: country error, no success |
| All required registration values valid; optional choices empty | Show success | Passed: demo success |
| Select optional choices, cause a password error, then Reset | Clear all values, choices and feedback | Passed: form cleared; valid submission works afterwards |
| Reset contact after success | Clear values and feedback | Passed: empty form with no success message |
| Pages at 375, 768 and 1440 pixels | No horizontal scrolling; paired fields stack on mobile | Passed: layouts fit at all three widths |

### Screenshots

Contact form, invalid and valid states:

![Invalid contact form](docs/screenshots/contact-invalid-desktop.png)
![Valid contact form](docs/screenshots/contact-valid-desktop.png)

Registration form, invalid and valid states:

![Invalid registration form](docs/screenshots/registration-invalid-desktop.png)
![Valid registration form](docs/screenshots/registration-valid-desktop.png)

Mobile layouts at 375 pixels:

![Mobile contact form](docs/screenshots/contact-mobile.png)
![Mobile registration form](docs/screenshots/registration-mobile.png)

## Learning resources

- Frontend Week 4: Bootstrap and Media Queries.
- [Bootstrap forms](https://getbootstrap.com/docs/5.3/forms/overview/)
- [Bootstrap validation example](https://getbootstrap.com/docs/5.3/forms/validation/)
- [MDN web forms](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms)
- [W3Schools HTML input attributes](https://www.w3schools.com/html/html_form_attributes.asp)
