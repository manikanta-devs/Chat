# DecisionOS – Smart Student Decision Assistant

> A fully offline-capable Progressive Web App (PWA) that helps students make better decisions, stay focused, and track their progress.

🔗 **Live demo:** https://manikanta-devs.github.io/Chat/

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 **Decision Chat** | Guided flows for career, study, focus, money, stress & coding |
| 📋 **Smart Planner** | Task manager with time scheduling and priority levels |
| ⏱️ **Pomodoro Timer** | 25/5-minute focus sessions with desktop notifications |
| 📝 **Notes** | Quick note-taking with card layout |
| 📊 **Progress Dashboard** | Weekly focus chart, productivity score & achievements |
| 🎯 **Goal Tracker** | Set goals with deadlines and track percentage progress |
| 📄 **Resume Builder** | Fill-and-preview resume with printable PDF export |
| 🌙 **Dark Mode** | Light/dark theme toggle, persisted across sessions |
| 🔥 **Daily Streak** | Gamified daily visit streaks |
| 📱 **PWA / Offline** | Works offline after first visit, installable on mobile |

---

## 🚀 Getting Started

### Run locally

No build step required — it's pure HTML/CSS/JS.

```bash
git clone https://github.com/manikanta-devs/Chat.git
cd Chat
# Open index.html in your browser, or serve with any static server:
npx serve .
```

### Deploy to GitHub Pages

The repository includes a GitHub Actions workflow that automatically deploys the `main` branch to GitHub Pages.

**One-time setup:**
1. Go to your repository → **Settings** → **Pages**
2. Under *Build and deployment*, set **Source** to **GitHub Actions**
3. Push or merge to `main` — the live site updates automatically

The live URL will be: `https://<your-username>.github.io/Chat/`

---

## 🗂️ Project Structure

```
Chat/
├── index.html          # Main HTML — all views are sections in one file
├── style.css           # All styles (CSS variables, dark mode, responsive)
├── script.js           # App shell — navigation, theme, keyboard shortcuts
├── knowledge.js        # Knowledge base for all decision-chat flows
├── storage.js          # LocalStorage abstraction layer
├── chat.js             # Decision chat engine
├── planner.js          # Task & schedule manager
├── timer.js            # Pomodoro focus timer
├── notes.js            # Notes CRUD
├── progress.js         # Progress dashboard & charts
├── goals.js            # Goal tracker
├── resume.js           # Resume builder & PDF print
├── sw.js               # Service Worker for offline caching
├── manifest.json       # PWA manifest
├── icon.svg            # App icon
└── .github/
    └── workflows/
        └── deploy.yml  # GitHub Pages CI/CD workflow
```

---

## 🛠️ Tech Stack

- **Vanilla JS** — no frameworks, no build tools
- **CSS Custom Properties** — theming and dark mode
- **LocalStorage** — all data stored locally in the browser
- **Canvas API** — weekly focus bar chart
- **Service Worker** — offline-first caching
- **Web Notifications API** — timer completion alerts
- **PWA** — installable on Android/iOS/Desktop

---

## 🧩 Decision Flows

The chat engine walks users through guided question trees and returns personalised advice:

| Flow | Topics covered |
|---|---|
| 💼 Career | Interests × skills → suggested careers, salary range, roadmap, resources |
| 📚 Study | Subject × available time × difficulty → schedule, tips, resources |
| 😴 Focus | Problem type → routine, tools, habits |
| 💰 Money | Skills × time → earning ideas, action plan, platforms |
| 🧠 Stress | Immediate relief, short-term & long-term coping strategies |
| 🧑‍💻 Coding | Goal × experience → language, first project, learning roadmap |

---

## 📋 Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl/⌘ + K` | Open Planner → Add Task |
| `Ctrl/⌘ + N` | Open Notes → New Note |
| `Ctrl/⌘ + T` | Open Focus Timer |
| `Escape` | Close any open modal |

---

## 🔒 Security

- All user data stays **in your browser** (LocalStorage) — nothing is sent to any server
- User-provided text is HTML-escaped before rendering to prevent XSS
- No external dependencies or CDN scripts (except Google Fonts)

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

MIT © [manikanta-devs](https://github.com/manikanta-devs)
