# Momentum ⚡🧠  
*A productivity app designed for neurodivergent users to build lasting habits and positive routines.*

---

## 📌 Overview

**Momentum** is a goal-setting and productivity web app tailored to support individuals with ADHD and other executive functioning challenges. It combines structured task breakdowns, visual progress tracking, and gamified reinforcement to help users stay motivated, organized, and in control of their routines.

This project is developed as part of **Project & Portfolio IV: Web Development** at Full Sail University.

---

## 🎯 Key Features

- ✍️ **Task & Goal Management** – Break tasks into actionable steps.
- 📅 **Streak Tracking & Habit Momentum** – Build lasting routines.
- 🧩 **Gamification Elements** – Earn rewards and track progress.
- 📊 **Progress Visualization** – Levels, percentages, and achievement charts.
- 👥 **Optional Collaboration** – Shared boards or team accountability.
- 🔒 **Secure Authentication** – Firebase Auth for privacy and safety.

---

## 🛠️ Tech Stack

- **Frontend**: React + Vite  
- **Styling**: TailwindCSS  
- **Backend & Auth**: Firebase (Auth, Firestore)  
- **Routing**: React Router  
- **Version Control**: Git & GitHub  
- **Build Tools**: PostCSS, ESLint  

---

## 📁 Project Structure

```bash
.
├── public/                      # Static files
│   └── vite.svg
├── src/                         # Source code
│   ├── assets/                  # Images & media
│   ├── components/              # Reusable UI components
│   │   ├── DataContainers/      # Profile & quest data displays
│   │   ├── buttons/             # Reusable button components
│   │   ├── cards/               # Task & date picker cards
│   │   ├── fields/              # Input fields and editors
│   │   └── percentage/          # Circular progress components
│   ├── context/                 # Context providers (Auth, Level, Task, UI)
│   ├── outlet/                  # Private route logic
│   ├── pages/                   # Main page components
│   ├── utils/                   # Helper functions
│   ├── App.jsx / App.css        # Main application entry
│   └── main.jsx / index.css     # Root rendering
├── firebaseConfig.js            # Firebase configuration
├── firebaseUserCreation.js      # Firebase user registration logic
├── index.html
├── vite.config.js               # Vite configuration
├── tailwind.config.js           # TailwindCSS config
├── eslint.config.js             # ESLint config
├── package.json
└── README.md
```

---

## 🚀 Installation

Follow detailed installation instructions in [`INSTALL.md`](./INSTALL.md).

---

## 🛡️ Maintenance

Guidelines and procedures for maintaining the app are available in [`MaintenancePlan.md`](./MaintenancePlan.md).

---

## 👥 Contributing

Contributions are welcome! Please follow best practices, use branches, and open pull requests for any updates. A full development and contribution guide will be added in future updates.

---

## 📜 License

This project is licensed under the **MIT License**.  
You are free to use, modify, and distribute this code with proper attribution.

See [`LICENSE`](./LICENSE) for full terms.

---

## 🙌 Author

Ezequiel Gonzalez  
GitHub: [@GonzalezEzequiel-FS-1](https://github.com/GonzalezEzequiel-FS-1)  
Full Sail University – Web Development, Class of 2025
