# Real Madrid Fan Website

Final project · MT-2501 · 13 November 2026

A responsive student website for Real Madrid fans who want to explore the players, club history and stadium, filter football topics and create a practice fan profile. It uses HTML, plain CSS, JavaScript and local jQuery from Assignment 6. No build step or backend is needed.

- Live website: https://nurailymrakhatova.github.io/football/
- Repository: https://github.com/nurailymrakhatova/football

## Team and work division

| Team member | Existing responsibility | Repository examples |
|---|---|---|
| Amantay Aiymzhan | Home, Fan Zone and shared integration | 2293e17, eb2e031, 815cb8e |
| Aruzhan Meirkhan | Team page and squad | fdece75 |
| Ayazhan Serikkazy | History, shared styles and forms | 6300b1e, b0e7753, 11c82a3 |
| Nurailym Rakhatova | Stadium, gallery and visit information | 178df9e, 3ac407e |

These responsibilities come from the existing repository. Final integration, authentication, validation and browser checks are shared project work; no unperformed individual testing or rehearsal is claimed.

## Open locally

Extract the ZIP and open the football folder in VS Code. Start Live Server and open index.html. Use the same browser address and port throughout the demo so pages share storage. Direct file URLs can have separate storage depending on the browser. All photos, CSS, scripts, jQuery and the crest favicon are local files.

## Pages

| File | Purpose |
|---|---|
| index.html | Home, archive matches, player spotlight and section links |
| team.html | Player cards, squad groups and coach |
| history.html | Club story, timeline and trophies |
| stadium.html | Gallery, visitor FAQ and validated demo enquiry |
| register.html | Fan Club Sign Up and locally stored practice accounts |
| login.html | Credential check and redirect to Profile |
| profile.html | Saved details and Log out; guests go to Log In |
| interactive.html | Welcome, theme, animated FAQ, combined search and favourites |
| demo-result.html | Explanation of what the practice forms do and store |

The same seven navigation links and theme switch appear on every page. Account opens Profile when logged in and Log In otherwise.

## Final requirements

| Requirement | Implementation |
|---|---|
| At least three pages | Nine connected HTML pages |
| Responsive layout | Grid, Flexbox and media queries; checked at 375, 700, 768 and 1440 pixels |
| Hosting | GitHub Pages, with separate live and repository links |
| Light and dark modes | Shared theme applied before paint and saved in localStorage |
| Sign Up simulation | Saves name, email, sample password, phone and selected profile details |
| Log In and Profile | Checks saved credentials, displays details and supports logout |
| Validation | Required fields, email, password complexity and matching, phone and message length; inline errors |
| Search and filtering | Title search plus category, result count, empty state and Clear filters |
| UI effects | Hover transitions, image zoom, animated FAQ and favourites feedback |
| Accessibility | Labels, alt text, logical headings, keyboard controls, focus indicators and dialogs |
| Organization | HTML pages plus css, js and images folders |
| External API | Optional bonus; not included |

Validation applies to fields relevant to each form. Login checks email and password; Sign Up also checks phone and password confirmation; Stadium checks name, email, phone and message. Welcome and favourites reject empty input.

## Scripts

- js/theme.js: saved preference, shared switches and synchronization across tabs and browser history.
- js/site.js: mobile navigation and Escape.
- js/account.js: users, credentials, session, profile and logout.
- js/forms.js: jQuery validation, duplicate-email feedback, Sign Up and Log In.
- js/feedback.js: native confirmation dialog, closing and keyboard focus.
- js/interactive.js: welcome, FAQ, filters and delegated favourites removal.

Styles are separated into shared layout, responsive rules, forms, Fan Zone, theme and dialog files. Image credits are in images/SOURCES.md. User values are displayed with textContent or jQuery .text(), never as HTML.

## Sample demonstration

1. Sign Up in Fan Club with Sample Fan, fan@example.com, +7 700 123 45 67, Kazakhstan and the disposable password Madrid2026! in both password fields.
2. Close the confirmation, choose Log in and enter the same email and password.
3. Profile shows saved details; reload to demonstrate persistence.
4. Switch to dark mode, visit Team or History, then switch back to light.
5. Log out; Account now opens Log In. Duplicate emails are rejected, so use the existing login or another sample email on later runs.

## Testing

On 13 November 2026, 32 checks passed across Chrome and Edge: guest redirects, required fields, password complexity and matching, invalid email and phone, registration, duplicate accounts, incorrect login, profile reload, logout, local links and anchors, shared navigation, image descriptions, headings, themes, responsive layouts, enquiry dialogs, filters, FAQ, favourites, blocked storage and malformed saved data. No browser script or local asset errors were found. All seven distinct external link destinations were opened separately.

Screenshots used for browser checks are not added to this repository.

## Classroom simulation limits

Only use sample details and a password you do not use elsewhere. To demonstrate the required localStorage logic, accounts include the sample password as plain local data. Anyone with access to this browser can inspect or change it. This is not secure authentication, an official membership or a server account. Profile never displays the password.

madrid-users stores practice accounts, madrid-session identifies the logged-in account and madrid-theme stores appearance. Log out clears only the session; clearing this site's browser data removes accounts and preferences. Stadium sends and saves nothing. Favourites last until reload. Storage failures show an inline error rather than claiming success.
