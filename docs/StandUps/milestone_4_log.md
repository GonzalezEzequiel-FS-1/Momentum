# 🗓️ Milestone 4 Summary – Week of July 21–27

## ✅ Progress Overview

This week, we focused on **back-end and front-end integration** to ensure seamless communication between the API and the user interface. We successfully connected the database to the UI, displaying dynamic user data and initializing key components of the application.

### Key achievements:

- **Form Drafts**: Created initial form structures to capture relevant user input such as strengths, struggles, motivation, and goals.
- **Mantine Integration**: Began incorporating Mantine components to improve scalability and long-term maintainability of the frontend.
- **Graphical Feedback**: Added basic graphs to visually represent user stats and feedback using `Recharts`, improving interactivity and engagement.
- **Task Scheduling Display**: Implemented a homepage feature that allows users to **schedule and view tasks** directly on their dashboard.

---

## 🚧 Work in Progress

### 🧠 XP System (in development)

We're still building the XP allocation and tracking system. This system will transform user input into RPG-style stat growth.

**Example of planned XP logic:**

```js
if (taskCompleted.onTime) {
  user.xp.constitution += 5;
  user.xp.timeManagement += 8;
}
```

This allows users to "level up" based on how consistently and efficiently they complete tasks.

### 📋 Tasks Page

We need to implement a dedicated screen where users can:

- View all scheduled tasks
- Edit task details
- Filter by date or category

### 🎨 Customization & Visual Design

- Need to finalize the **color palette**, **typography**, and **layout spacing**
- Users will eventually be able to customize their own theme

### ⏱️ Pomodoro Timer

The Pomodoro system is a critical tool for helping ADHD users manage focus. We’ve scoped out its architecture but haven’t yet implemented it.

### 🕹️ Gamification System

We aim to gamify momentum by turning habits into rewards.

**Example implementation strategy:**

- Each stat (Strength, Dexterity, Intelligence, etc.) gains XP from specific types of tasks
- Completing “chains” of tasks without breaking earns bonuses (combo multiplier)
- **Mathematical formula** idea for leveling up:

```js
level = Math.floor(0.25 * Math.sqrt(totalXP));
```

This nonlinear growth curve encourages consistent behavior over time.

---

## ⚠️ Challenges Encountered

### 📁 File Organization

As the project has grown, maintaining a clean and modular file structure has become more important. Some components have been refactored or rewritten, but the overall organization still needs improvement for scalability and readability.

### 📝 Rich Text Editor Integration

Integrating a rich text editor presented unexpected difficulties, especially with no prior experience. Storing and retrieving the data from the database in a consistent and usable format has required additional research and experimentation.

---

