# Momentum ⚡🧠  
*A productivity app designed for neurodivergent users to build lasting habits and positive routines.*

---

## 📌 Overview

**Momentum** is a goal-setting and productivity web app built to support individuals with ADHD and other executive functioning challenges. It uses structured task breakdowns, visual progress tracking, and gamified reinforcement to help users stay motivated and in control of their routines.

This project is being developed as part of **Project & Portfolio IV: Web Development** at Full Sail University.

---

## 🎯 Key Features

- ✍️ Task & Goal Management with clear breakdowns
- 📅 Streak tracking & habit momentum features
- 🧩 Gamified elements to encourage consistency
- 📊 Progress visualization (percentages, levels, rewards)
- 👥 Optional accountability through shared boards or teams
- 🔒 Private routing & Firebase Auth

---

## 🛠️ Tech Stack

- **Frontend**: React + Vite
- **Styling**: TailwindCSS
- **Auth & Backend**: Firebase (Auth, Firestore)
- **Routing**: React Router
- **Version Control**: Git & GitHub
- **Build Tooling**: PostCSS, ESLint

---

## 📁 Project Structure

```bash
.
├── public/                      # Static files
│   └── vite.svg
├── src/                         # Source code
│   ├── assets/                  # Image & media assets
│   ├── components/             # Reusable UI components
│   │   ├── DataContainers/      # Profile and quest containers
│   │   ├── buttons/             # Reusable buttons
│   │   ├── cards/               # Date pickers and task cards
│   │   ├── fields/              # Input components
│   │   └── percentage/          # Circular progress components
│   ├── context/                # Auth context provider
│   ├── outlet/                 # Private route logic
│   ├── pages/                  # Main page components
│   ├── utils/                  # Helper functions
│   ├── App.jsx / App.css       # Main entry point
│   └── main.jsx / index.css    # Root rendering
├── firebaseConfig.js           # Firebase app configuration
├── firebaseUserCreation.js     # Firebase user registration logic
├── index.html
├── vite.config.js              # Vite configuration
├── tailwind.config.js
├── eslint.config.js
├── package.json
└── README.md


```

## 👥 How to contribute:

Development setup and contribution guidelines will be added in future updates.

## 📜 License

This project is licensed under the **MIT License**.  
You are free to use, modify, and distribute this code with attribution.

See [`LICENSE`](./LICENSE) for full terms.

## 🙌 Author

Ezequiel Gonzalez
@GonzalezEzequiel-FS-1
Full Sail Web Development – Class of 2025