# Aryan Kumar — Portfolio V2

A new, standalone, interactive portfolio concept built with HTML, CSS and vanilla JavaScript.

## What's included

- Responsive desktop sidebar and mobile navigation
- Project categories with functional filtering
- Four project cards, including live demo and source links
- Clickable case studies for all four projects
- Ctrl/Cmd + K navigation command menu with keyboard selection
- Dark/light theme toggle (saved locally)
- Reading progress indicator, scrolling navigation state, local India time
- Embedded resume at `assets/resume.pdf`

## Run locally

Open `index.html` in a browser, or serve the directory with a static server for a closer preview of deployment:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000.

## Deploy to Vercel

1. Visit https://vercel.com/new and create a *new project* (keep the original portfolio live).
2. Upload or import the contents of this directory as a GitHub repository, or use Vercel CLI.
3. Set **Framework Preset: Other** and **Root Directory** to the directory containing `index.html`.
4. Disable any build command and set **Output Directory** to `.`.
5. Deploy. No environment variables are needed.
6. Test `Resume`, case-study dialogs, project filters, all external links, and mobile navigation on the public site.

## Notes

- Contact is intentionally via GitHub and resume only. No placeholder email or LinkedIn links are included.
- All live project and repository URLs come from the existing portfolio.
- The project illustrations are original CSS artwork, not screenshots.
- No frontend/backend application data is collected by this portfolio.
- Google Fonts is loaded as an optional external resource; system font fallbacks are configured.