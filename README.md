🎨 Portfolio Maker
A simple, no-backend web app that lets anyone build a professional online portfolio in minutes. 
Sign up, answer a short questionnaire about yourself, pick a template, and get a ready-to-share portfolio page — all running entirely in the browser.

✨ Features
- **Account system** — Sign up and log in (session handled via browser `localStorage`, no server required).
- **Guided questionnaire** — Capture your personal info, bio, photo, skills, languages, work experience, projects, and career goals through a simple multi-step form.
- **5 ready-made templates** — Choose the design that fits you best:
  - **Modern** — Clean and professional
  - **Creative** — Bold and artistic
  - **Corporate** — Traditional and elegant
  - **Tech** — Technical, IT-focused look
  - **Academic** — Formal design for researchers and educators
- **Live preview** — Instantly preview your generated portfolio before sharing it.
- **Dashboard** — Track your progress (questionnaire completed, template selected) and jump back in anytime to edit your details.
- **Light/Dark theme toggle** for a comfortable viewing experience.
- **Fully client-side** — No database or server setup needed; all data is saved locally in your browser.

🖥️ Tech Stack
- **HTML5** — Page structure (`index`, `login`, `signup`, `dashboard`, `questionnaire`, `templates`, `preview`)
- **CSS3** — Styling and responsive layout (`css/styles.css`, `css/templates.css`)
- **Vanilla JavaScript** — All app logic, no frameworks:
  - `auth.js` — Sign up, log in, log out, session/auth checks
  - `questionnaire.js` — Form handling and saving portfolio data
  - `templates.js` — Template selection logic
  - `template-modern.js`, `template-creative.js`, `template-corporate.js`, `template-tech.js`, `template-academic.js` — Template-specific rendering
  - `dashboard.js` — Progress/status tracking
  - `preview.js` — Assembles and displays the final portfolio
  - `theme.js` — Light/dark mode toggle
- **Font Awesome** — Icons (loaded via CDN)
- **Browser `localStorage`** — Acts as the "database" for users and portfolio data

📁 Project Structure
```
Portfolio-Maker/
├── index.html              # Landing page
├── login.html               # Login page
├── signup.html               # Signup page
├── dashboard.html            # User dashboard
├── questionnaire.html        # Portfolio data entry form
├── templates.html            # Template selection gallery
├── preview.html               # Final portfolio preview
├── css/
│   ├── styles.css            # Global styles
│   └── templates.css          # Template gallery styles
├── js/
│   ├── auth.js
│   ├── dashboard.js
│   ├── questionnaire.js
│   ├── templates.js
│   ├── template-modern.js
│   ├── template-creative.js
│   ├── template-corporate.js
│   ├── template-tech.js
│   ├── template-academic.js
│   ├── preview.js
│   └── theme.js
├── portfolio.webp             # Hero image
├── morden.jpeg, creative.jpeg, corporate.jpeg, tech.jpeg, acedmecic.jpeg   # Template thumbnails
└── .vscode/                   # Editor settings
```

🧭 How It Works
1. **Sign up / Log in** — Create an account on `signup.html`; credentials are stored in your browser's `localStorage`.
2. **Fill the questionnaire** — Head to `questionnaire.html` and enter your personal details, skills, languages, experience, and projects.
3. **Pick a template** — Browse the template gallery on `templates.html` and select your favorite design.
4. **Preview & share** — View your generated portfolio on `preview.html`.
5. **Track progress** — The `dashboard.html` page shows what steps you've completed and lets you pick up where you left off.

⚠️ Notes & Limitations
- All data (accounts, portfolio content, selected template) is stored in the browser's `localStorage`, so it's tied to a single browser/device and isn't persisted to a real database or server.
- This project is intended as a demo/learning project and is not production-hardened (e.g., passwords are not encrypted).

🛣️ Possible Future Improvements
- Backend + database integration for persistent, multi-device accounts
- Password hashing and proper authentication (e.g., JWT)
- Exporting the finished portfolio as a static site or PDF
- Additional templates and customization options (colors, fonts, layout)
- Deployment guide (e.g., GitHub Pages, Netlify, Vercel)
