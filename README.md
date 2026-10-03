# Real Madrid Fan Website

## Project topic

A student fan website about Real Madrid football club.

## Project goal

Introduce visitors to the club, its players, history and
Santiago Bernabéu stadium.

## Target audience

Football fans and people who want to learn basic information
about Real Madrid.

## Team members and page responsibilities

| Team member | Page | Responsibility |
|---|---|---|
| Amantay Aiymzhan | index.html | Home page and links to other sections |
| Aruzhan Meirkhan | team.html | Player cards, squad and coach |
| Ayazhan Serikkazy | history.html | Club history and timeline |
| Nurailym Rakhatova | stadium.html | Stadium, gallery, FAQ and demo form |

All members contribute to shared styles, integration,
responsive testing and Git.

demo-result.html is an additional form result page.
It does not replace any of the four main pages.

## Technologies

- HTML5
- CSS3
- Flexbox
- CSS Grid
- Media queries
- Native HTML form validation
- Details and summary for the FAQ

The project does not use JavaScript or a CSS framework.

## Files

- index.html — introduction to the club
- team.html — players and coach
- history.html — club history
- stadium.html — stadium information, gallery, FAQ and demo form
- demo-result.html — explanation of the form demonstration
- css/style.css — shared styles and mobile layout
- css/responsive.css — tablet and desktop media queries
- images/ — project images

## Responsive design

The website uses a mobile-first approach.

The base layout has one column.
Larger layouts are added with min-width media queries.

| Breakpoint | Changes | Reason |
|---|---|---|
| 768px | Two-column grids, horizontal home team section and timeline rows | Enough space for two readable content columns |
| 1024px | Three-column card grids, horizontal header and visit box | Enough space for three cards and a wider navigation layout |

The container uses a percentage width and a maximum width.
Images fit their containers, and navigation links can wrap.

## Flexbox and Grid

Flexbox is used for navigation, the home team section,
club facts, the timeline, the visit box and the footer.

Grid is used for topic cards, player cards, squad groups,
stadium photos and paired content sections.

The player grid and stadium gallery each contain six items.

## Form demonstration

The form is on stadium.html.

It has three labelled required fields:
name, email and a question.

The browser checks empty fields and the email format.
The fields intentionally have no name attributes, so their
values are not included in the result page URL.

After successful validation, the browser opens demo-result.html.

No information is sent or stored by the website.
The form does not send messages or book tickets.

The result page includes a link back to the form.

Real message delivery or booking would require
a backend or an external service.

## How to open the website

Keep the HTML files in the main project folder.
Keep css/ and images/ in the same folder.

Open index.html in a browser or use Live Server in VS Code.

## Links
- GitHub repository: https://github.com/nurailymrakhatova/football.git
- Published website: https://nurailymrakhatova.github.io/football/
