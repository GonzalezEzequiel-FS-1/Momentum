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
- **Auth**: Firebase 
- **BackEnd Storage**: MongoDB  
- **Routing**: React Router  
- **Version Control**: Git & GitHub  
- **Build Tools**: PostCSS, ESLint  

---

## 📁 Project Structure

```bash
.
├── cspell.json
├── dev
│   ├── FrontEnd
│   │   ├── debug.js
│   │   ├── dist
│   │   │   ├── assets
│   │   │   │   ├── index-BkkML9Ca.css
│   │   │   │   ├── index-BlrjWPrZ.js
│   │   │   │   ├── Momentum-DWKX_KiS.png
│   │   │   │   ├── userAvatar-DFA9O-Hz.jpg
│   │   │   │   └── UserBG01-HP_jrltd.jpg
│   │   │   ├── index.html
│   │   │   ├── M.ico
│   │   │   └── vite.svg
│   │   ├── eslint.config.js
│   │   ├── firebaseConfig.js
│   │   ├── firebaseUserCreation.js
│   │   ├── index.html
│   │   ├── package.json
│   │   ├── package-lock.json
│   │   ├── postcss.config.js
│   │   ├── public
│   │   │   ├── M.ico
│   │   │   └── vite.svg
│   │   ├── README.md
│   │   ├── src
│   │   │   ├── App.css
│   │   │   ├── App.jsx
│   │   │   ├── AppRoutes.jsx
│   │   │   ├── assets
│   │   │   │   ├── BGCity.png
│   │   │   │   ├── BGUserOne.png
│   │   │   │   ├── faceBookIcon.png
│   │   │   │   ├── GoogleIcon.svg
│   │   │   │   ├── Home.png
│   │   │   │   ├── MomentumMask.png
│   │   │   │   ├── Momentum.png
│   │   │   │   ├── Profile.png
│   │   │   │   ├── userAvatar.jpg
│   │   │   │   └── UserBG01.jpg
│   │   │   ├── components
│   │   │   │   ├── buttons
│   │   │   │   │   ├── Button.jsx
│   │   │   │   │   └── NavIcons.jsx
│   │   │   │   ├── Calendar
│   │   │   │   │   ├── DatePicker.jsx
│   │   │   │   │   └── DateTimePickerComponent.jsx
│   │   │   │   ├── cards
│   │   │   │   │   ├── DatePickers.jsx
│   │   │   │   │   ├── MainTasks.jsx
│   │   │   │   │   └── NewTask.jsx
│   │   │   │   ├── DataContainers
│   │   │   │   │   ├── ProfileData.jsx
│   │   │   │   │   ├── QuestData.jsx
│   │   │   │   │   └── XPChart.jsx
│   │   │   │   ├── Divider.jsx
│   │   │   │   ├── ErrorText.jsx
│   │   │   │   ├── fields
│   │   │   │   │   ├── InputField.jsx
│   │   │   │   │   ├── MantineInput.jsx
│   │   │   │   │   ├── PasswordField.jsx
│   │   │   │   │   ├── TextAreaComponent.jsx
│   │   │   │   │   ├── TextEditor.jsx
│   │   │   │   │   └── TextField.jsx
│   │   │   │   ├── FirstUserGuard.jsx
│   │   │   │   ├── interactiveComponents
│   │   │   │   │   ├── PillsInputComponent.jsx
│   │   │   │   │   ├── SegmentedControlInput.jsx
│   │   │   │   │   ├── SegmentedControlNew.jsx
│   │   │   │   │   ├── SliderForUserCreation.jsx
│   │   │   │   │   └── SliderInput.jsx
│   │   │   │   ├── MantineDemo.jsx
│   │   │   │   ├── NavigationBar.jsx
│   │   │   │   ├── Navigation.jsx
│   │   │   │   ├── percentage
│   │   │   │   │   └── CircularContainer.jsx
│   │   │   │   ├── Screens
│   │   │   │   │   ├── SignIn.jsx
│   │   │   │   │   └── SignUp.jsx
│   │   │   │   ├── Tester.jsx
│   │   │   │   ├── TimePicker.jsx
│   │   │   │   ├── TipTapRenderer.jsx
│   │   │   │   ├── Toolbar.jsx
│   │   │   │   └── UserIcon.jsx
│   │   │   ├── context
│   │   │   │   ├── AuthContext.jsx
│   │   │   │   ├── LevelContext.jsx
│   │   │   │   ├── TaskContext.jsx
│   │   │   │   └── UIContext.jsx
│   │   │   ├── index.css
│   │   │   ├── main.jsx
│   │   │   ├── outlet
│   │   │   │   ├── PrivateRoutes.jsx
│   │   │   │   └── RouteProvider.jsx
│   │   │   ├── pages
│   │   │   │   ├── CharacterCreation2.jsx
│   │   │   │   ├── CharacterCreation.jsx
│   │   │   │   ├── Home.jsx
│   │   │   │   ├── NewTaskRefactor.jsx
│   │   │   │   ├── Profile.jsx
│   │   │   │   ├── SignScreen.jsx
│   │   │   │   ├── StatPage.jsx
│   │   │   │   ├── TaskList.jsx
│   │   │   │   └── ToS.jsx
│   │   │   ├── UseAnalytics.jsx
│   │   │   └── utils
│   │   │       ├── AuthLogic.js
│   │   │       ├── CheckMobileOrientation.jsx
│   │   │       ├── dbConnection.js
│   │   │       ├── environment.js
│   │   │       ├── isLoggedIn.js
│   │   │       ├── personalityTest.json
│   │   │       ├── ToggleTutorial.jsx
│   │   │       └── traitList.json
│   │   ├── tailwind.config.js
│   │   ├── themes
│   │   │   ├── mantineTheme.js
│   │   │   └── tailwindThemes.js
│   │   ├── useAnalytics.jsx
│   │   └── vite.config.js
│   └── Server
│       ├── eslint.config.mjs
│       ├── logger.js
│       ├── logs
│       │   └── server.log
│       ├── package.json
│       ├── package-lock.json
│       ├── server.js
│       └── src
│           ├── controllers
│           │   ├── newTraitController.js
│           │   ├── newUserControllers.js
│           │   ├── progressionController.js
│           │   ├── taskController.js
│           │   └── userControllers.js
│           ├── db
│           │   └── db.js
│           ├── middlewares
│           │   ├── checkAuth.js
│           │   └── checkReq.js
│           ├── models
│           │   ├── NewTraits.js
│           │   ├── newUser.js
│           │   ├── Task.js
│           │   ├── traits.js.disabled
│           │   ├── user.js
│           │   └── UserProgression.js
│           ├── routes
│           │   └── index.js
│           ├── utils
│           │   ├── calculateLevel.js
│           │   └── taskFormatter.js
│           └── xpCalculation
│               └── calculateXP.js
├── docs
│   ├── ChangeOrder.md
│   ├── design
│   │   ├── Media
│   │   │   └── Color Palette
│   │   │       ├── Active White.png
│   │   │       ├── BG.png
│   │   │       ├── Inactive White.png
│   │   │       ├── Purple Active.png
│   │   │       ├── Purple Inactive.png
│   │   │       └── Purple Light.png
│   │   ├── Styles 2.md
│   │   ├── Styles.md
│   │   ├── Style Tile 2.png
│   │   └── Style Tile.png
│   ├── INSTALL.md
│   ├── log.md
│   ├── MaintenancePlan.md
│   ├── Metrics_Validation_Plan.md
│   ├── projectProposal.md
│   ├── StandUps
│   │   ├── milestone_4_log.md
│   │   ├── research_4_staging.md
│   │   ├── research_Business_Case.md
│   │   ├── research_Week_3_Innovation_and_Security.md
│   │   └── Standup.md
│   ├── techStack.md
│   └── Use_Cases.md
├── LICENSE
└── README.md

37 directories, 148 files
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
