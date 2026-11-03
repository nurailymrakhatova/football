# Real Madrid Fan Website

Assignment 6: jQuery and completed website. Group: MT-2501.

A student fan website about Real Madrid, its players, history and Santiago Bernabeu stadium. All seven pages share an editorial football design inspired by the supplied reference: full-width photography, navy and gold colours, square buttons, player portraits and fine grid dividers. The existing forms and all five jQuery tasks are preserved.

## Team

| Team member | Existing page responsibility | Repository evidence |
|---|---|---|
| Amantay Aiymzhan | Home, Fan Zone and shared integration | 2293e17, eb2e031, 815cb8e |
| Aruzhan Meirkhan | Team page and squad | fdece75 |
| Ayazhan Serikkazy | History, shared styles and form work | 6300b1e, b0e7753, 11c82a3 |
| Nurailym Rakhatova | Stadium, gallery and visit information | 178df9e, 3ac407e |

These references describe recorded work in the existing repository. The Assignment 6 update adds the jQuery integration and automated checks. Each member should review their page and explain the shared changes during defence; no unperformed individual review is claimed.

## Open the project

1. Extract the project ZIP.
2. Open the football folder in VS Code.
3. Open index.html in a browser, or use Live Server.

No installation or build is required. CSS, images, the club crest and jQuery are local files, so the project also works without an internet connection. Keep the HTML files, css, js and images folders together.

- Live website: https://nurailymrakhatova.github.io/football/
- Repository: https://github.com/nurailymrakhatova/football

## Files

- index.html: home and navigation
- team.html: player cards, squad and coach
- history.html: club history and timeline
- stadium.html: stadium, gallery, FAQ and enquiry demonstration
- register.html: fan registration demonstration
- interactive.html: Fan Zone and jQuery interactions
- demo-result.html: explanation of frontend form limitations
- css/style.css: common styles
- css/responsive.css: shared media queries
- css/interactive.css: Fan Zone styles and dark theme
- css/forms.css: plain CSS form layout and validation feedback
- js/site.js: keyboard-accessible mobile navigation
- js/interactive.js: welcome, theme, FAQ, filtering and favourites
- js/forms.js: jQuery validation for both forms
- js/jquery-3.7.1.min.js: local jQuery library
- images/: locally saved photos and crest.png, used as the favicon on every page
- images/SOURCES.md: original links for the downloaded photographs
- docs/screenshots/: retained Assignment 5 evidence

## jQuery feature map

| Task | Page and section | Main methods |
|---|---|---|
| 1. Events and DOM updates | Fan Zone: Welcome, Madridista; appearance | .ready(), .on(), .val(), .text(), .addClass(), .removeClass(), .toggleClass() |
| 2. Animation | Fan Zone: three FAQ items and favourites feedback | .stop(true, true), .slideDown(), .slideUp(), .fadeIn(), .delay(), .fadeOut(), .attr() |
| 3. Combined filtering | Fan Zone: Explore football topics | .on('input'), .on('change'), .each(), .find(), .toggle(), .text() |
| 4. Dynamic list | Fan Zone: My football favourites | .append(), .text(), delegated .on('click', '.remove-item', ...), .closest(), .remove() |
| 5. Form validation | Stadium enquiry and Fan Club registration | .on('submit'), .val(), .toggleClass(), .attr(), .text(), .fadeIn() |

jQuery loads before the external project scripts. Handlers are initialised after DOM ready. There are no inline event attributes, CSS frameworks, Bootstrap components, backend or build tools. jQuery is retained because Assignment 6 requires it. User input is inserted with .text(), never as raw HTML.

## Complete user journey

Open Home, then Fan Zone. Search for visit and choose the Stadium category. Open Plan a visit, read the visitor FAQ, then complete the enquiry with Sample Fan, fan@example.com and Can I visit the stadium museum? Submit the form to see its demo confirmation.

The same navigation appears on all seven pages. Topic cards link to real pages or sections. The historical timeline anchor and a missing image description have been fixed. Duplicate responsive CSS rules are now kept only in css/responsive.css.

## Testing

Tested on 3 November 2026 in Google Chrome 156.0.8078.80 and Microsoft Edge 156.0.4314.58. Seventeen functional and integration cases passed in each browser locally: 34 checks in total, including mobile menu keyboard controls and offline use. All seven pages were checked at 375, 768 and 1440 pixels. Cases cover empty names, theme state, FAQ mouse and keyboard controls, rapid clicks, combined filters, no results, reset filters, safe dynamic text, delegated deletion, empty favourites, invalid forms, valid forms, message length boundaries, registration passwords, navigation and assets.

The shared report contains the detailed steps, expected and actual results, screenshots and published-site verification. Retained Assignment 5 screenshots are historical evidence, not the Assignment 6 test results.

## Frontend limitations

This is a student fan website, not an official Real Madrid service. Forms validate entries only: no message, booking, payment or account is created. Valid form values remain until Reset or reload. Editing a value clears the previous success message. Favourites and the Fan Zone theme are kept only while the page is open; no database or local storage is used.

## Resources

- jQuery API: https://api.jquery.com/
- jQuery Learning Center: https://learn.jquery.com/
- jQuery 3.7.1: https://code.jquery.com/jquery-3.7.1.min.js
- MDN: https://developer.mozilla.org/
- Image credits: images/SOURCES.md
- Club facts and photos: https://www.realmadrid.com/en-US
