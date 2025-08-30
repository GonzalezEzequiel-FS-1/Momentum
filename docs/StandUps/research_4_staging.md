# 📚 Research 4 – Staging

## 🧼 Clean Code Principles
After reviewing Chapter 1 of *Clean Code*, it’s clear that writing clean code is not just about making code readable, but about making it **understandable, reusable, and maintainable**. Some takeaways that directly apply to our Momentum project:

- Use **meaningful naming** conventions for variables and functions
- Keep functions **short and focused** on a single task
- Avoid duplications by refactoring common logic into reusable functions
- Treat your code as a form of communication with future developers (including yourself)

I’ve started applying these ideas while cleaning up the `TaskCard` component and the XP system logic.

---

## 🛠️ Prettier & Linters Integration
This week, I reviewed how to integrate **Prettier** with **ESLint**. Prettier formats the code, while ESLint ensures code quality.

Steps taken:
- Installed Prettier and ESLint using the recommended config (`eslint-config-prettier` to disable conflicting rules)
- Added `.prettierrc` for consistent formatting (tabs, semi, single quotes)
- Ran both tools in VSCode using the ESLint + Prettier extension combo

Outcome: I now get real-time code quality and formatting feedback, which keeps the project clean as it scales.

---

## 🎨 CSS & Style Organization
I explored different ways to organize CSS. Since we're using **Mantine**, most of our styling is modular and component-scoped. However, we still need to:
- Isolate any global styles (e.g. typography, colors)
- Refactor duplicated or inline style logic

For Beta, I plan to:
- Create a global styles config for Mantine (inside `/styles/theme.ts`)
- Move recurring values (e.g. border-radius, shadow, spacing) to variables

---

## 🧠 80/20 Rule
The 80/20 principle reminded me that **the last 20% of polish can drastically affect usability and perception**.

Examples:
- Adding animation to task cards and feedback graphs
- Tooltips and hover effects on key buttons
- Responsive tweaks for mobile views
- Subtle success/failure feedback on forms

I’m reserving time post-Milestone 5 for this polish pass.

---

## 📝 Writing Good Comments
Good comments **explain why**, not just what. In this project, I’ve added inline comments to explain:
- The purpose of the XP algorithm logic
- How stats are derived from user actions
- Temporary workarounds or TODOs that will be resolved post MVP

I’m keeping comments short, meaningful, and easy to scan.

---

## 📄 README Planning
I’ve started outlining the README file for the Momentum app. It will include:

- Project overview: What Momentum is and who it's for
- Setup: How to run it locally (frontend + backend)
- Tech stack: MERN + Mantine + Firebase Auth
- Contribution guide (for future development)
- License and contact info

This will be written and added in Milestone 5.

---

## ✅ Summary
This week’s research has been focused on improving project quality and preparing for the upcoming release. The key areas included:

- Clean code and refactoring
- Prettier/ESLint integration
- CSS organization with Mantine
- Attention to the final polish (80/20 rule)
- Commenting standards
- Planning the README

These practices are already improving the structure and maintainability of the Momentum codebase.


