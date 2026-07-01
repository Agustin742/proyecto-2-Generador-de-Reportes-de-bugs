# BugNet — Bug Report Generator

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=000)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=fff)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=fff)
![pnpm](https://img.shields.io/badge/pnpm-Workspace-F69220?logo=pnpm&logoColor=fff)
![Deploy](https://img.shields.io/badge/Deploy-Vercel-000?logo=vercel&logoColor=fff)

**BugNet** is a web application developed as an integrative project for **IntegrarTEC**. Its goal is to make it easier to create clear, complete, and structured bug reports, allowing users to enter information about an error and generate a report ready to review, save, or copy in Markdown format.

The application aims to solve a common problem in development, support, and testing teams: turning informal or incomplete reports into technical documentation that is more useful, organized, and easy to interpret.

---

## Demo and Repository

- **Deploy:** [https://bugnet-report-generator.vercel.app/](https://bugnet-report-generator.vercel.app/)
- **Repository:** https://github.com/Agustin742/proyecto-2-Generador-de-Reportes-de-bugs

---

## Table of Contents

- [Project Goal](#project-goal)
- [Main Features](#main-features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Organization by Challenges](#organization-by-challenges)
- [Report Validation and Quality](#report-validation-and-quality)
- [Report Generation](#report-generation)
- [Local Persistence](#local-persistence)
- [User Experience and Accessibility](#user-experience-and-accessibility)
- [Visual Theme: Moth](#visual-theme-moth)
- [Installation and Local Setup](#installation-and-local-setup)
- [Available Scripts](#available-scripts)
- [Suggested Manual Tests](#suggested-manual-tests)
- [Technical Quality and Review](#technical-quality-and-review)
- [Final Project Status](#final-project-status)
- [Team](#team)
- [License](#license)

---

## Project Goal

BugNet's main goal is to allow a user to generate bug reports in a guided, clear, and reusable way.

A good bug report should answer key questions such as:

- What problem occurred?
- How can it be reproduced?
- What was expected to happen?
- What actually happened?
- In what environment did it occur?
- What severity and priority does it have?
- What tone or style should the report have?

Based on this information, the application generates a structured report in Markdown, improving communication between testers, developers, instructors, technical teams, or anyone who needs to document software errors.

---

## Main Features

BugNet includes the following features:

- Guided form for entering bug reports.
- Validation of required fields with clear rules.
- Selection of severity, priority, and tone for the report.
- Selection of heading variants to customize the output.
- Quick templates for visual, functional, or performance bugs.
- Automatic detection of the user's technical environment.
- Quality checklist to review whether the report is complete.
- Suggestions to improve report clarity.
- Character counters with minimums and maximums.
- Real-time preview of the generated report.
- Toggle between raw Markdown view and rendered view.
- Local saving of reports in the browser via `localStorage`.
- Management of saved reports.
- Copying of the generated report.
- Non-blocking visual feedback when saving.
- Custom UI confirmation for clearing the form.
- Dark visual design with an identity based on the moth theme.
- 100% client-side operation, with no backend.

---

## Technologies Used

| Technology | Main Use |
|---|---|
| React | Building the user interface |
| TypeScript | Static typing for the project |
| Vite | Development environment and build tool |
| React Router | Navigation between pages |
| React Hook Form | Form state management |
| Zod | Form validation |
| Zustand | Global state and local persistence |
| react-markdown | Markdown rendering |
| shadcn/ui | UI components |
| Radix UI | Accessible UI primitives |
| Tailwind CSS | Utility styles |
| Lucide Icons | Iconography |
| pnpm | Package manager |
| Vercel | Application deployment |
| Git and GitHub | Version control and collaborative work |

---

## Project Structure

The main structure follows a feature-oriented organization:

```txt
src/
├── app/
│   └── ...
├── features/
│   ├── bug-report/
│   │   ├── components/
│   │   │   ├── sections/
│   │   │   ├── BugReportForm.tsx
│   │   │   ├── BugReportPreview.tsx
│   │   │   ├── BugReportQualityChecklist.tsx
│   │   │   ├── BugReportQualitySuggestions.tsx
│   │   │   ├── CharacterCount.tsx
│   │   │   ├── RequiredMark.tsx
│   │   │   └── RequiredFieldsNote.tsx
│   │   ├── constants/
│   │   │   └── bugReportValidation.ts
│   │   ├── hooks/
│   │   │   └── useBugReportForm.ts
│   │   ├── utils/
│   │   │   ├── bugReportQuality.ts
│   │   │   ├── detectEnvironment.ts
│   │   │   └── generateBugReport.ts
│   │   ├── schema.ts
│   │   ├── store.ts
│   │   └── types.ts
│   ├── polillas/
│   └── about/
├── pages/
├── shared/
│   ├── components/
│   └── lib/
└── main.tsx
```

This organization separates concerns, improves code maintainability, and makes it easier to review by module.

---

## Organization by Challenges

Development was organized into challenges, assigning specific responsibilities within the team.

| Challenge | Main Responsibility |
|---|---|
| D1 | Form foundation, initial structure, and general layout |
| D2 | Markdown report generation |
| D3 | Validation, form feedback, checklist, and suggestions |
| D4 | Report preview and Markdown copying |
| D5 | Templates, tone, and report variants |

Some features require integration across challenges, especially since the form works as the central point of the application.

---

## Report Validation and Quality

Form validation is implemented using **React Hook Form** and **Zod**.

The main validation file is:

```txt
src/features/bug-report/schema.ts
```

Form types are derived from the schema using `z.infer`, avoiding manually duplicated contracts.

Validation limits are centralized in:

```txt
src/features/bug-report/constants/bugReportValidation.ts
```

This allows the schema, the quality checklist, and the character counters to share the same source of truth.

Main form fields:

- Title.
- Description.
- Steps to reproduce.
- Expected result.
- Actual result.
- Severity.
- Priority.
- Technical environment.
- Tone.
- Heading variant.

In addition to blocking validation, BugNet includes a quality checklist and suggestions to help improve the report before saving or copying it.

---

## Report Generation

Report generation is handled by a pure function located at:

```txt
src/features/bug-report/utils/generateBugReport.ts
```

This function takes the values entered in the form and generates a structured output in Markdown.

Using a pure function makes the following easier:

- code readability,
- maintenance,
- reusability,
- potential future unit testing.

---

## Local Persistence

Saved reports are stored in the browser using **Zustand** with persistence in `localStorage`.

This allows the user to save reports and revisit them later without needing a backend or authentication.

> Since this is a client-side application, data is stored locally in the user's browser.

---

## User Experience and Accessibility

During development, improvements were made to make the form clearer, more usable, and more accessible.

These include:

- Visible and clear validation messages.
- Required fields marked both visually and semantically.
- Use of attributes such as `aria-required`, `aria-hidden`, `aria-live`, and `sr-only` text.
- Character counters formatted as `current/max`.
- Non-blocking feedback when saving a report.
- Custom UI confirmation for clearing the form.
- Proper reset of fields and selects after saving.
- Reduced use of native browser dialogs such as `alert()` and `window.confirm()`.
- Use of native elements when they provide better semantics and accessibility.

These decisions aim to improve the overall experience without changing the form's core behavior.

---

## Visual Theme: Moth

The application uses a dark aesthetic with pink accents and a visual identity related to moths.

The concept references the first documented "bug" in computing history: a moth found in the relay of the Harvard Mark II.

The design includes:

- dark background,
- pink accents,
- custom typography,
- decorative moth animation,
- a distinct visual identity for BugNet.

The moth animation is decorative and can be enabled or disabled depending on the interface settings.

---

## Installation and Local Setup

### Prerequisites

To run the project locally you need:

- Node.js compatible with the version used by Vite.
- pnpm.
- Git.

### Clone the repository

```bash
git clone https://github.com/Agustin742/proyecto-2-Generador-de-Reportes-de-bugs.git
cd proyecto-2-Generador-de-Reportes-de-bugs
```

### Install dependencies

```bash
pnpm install
```

### Run in development mode

```bash
pnpm dev
```

The application will be available at the local URL indicated by Vite. Usually:

```txt
http://localhost:5173
```

### Generate a production build

```bash
pnpm build
```

### Preview the production build

```bash
pnpm preview
```

---

## Available Scripts

| Script | Description |
|---|---|
| `pnpm dev` | Runs the Vite development server |
| `pnpm build` | Runs type-checking and production build |
| `pnpm preview` | Previews the production build |
| `pnpm lint` | Runs ESLint on the project |

---

## Suggested Manual Tests

To verify the application's overall functionality, it is recommended to test:

1. Filling out a valid form.
2. Creating a bug report.
3. Verifying that save feedback appears.
4. Confirming that the form resets correctly.
5. Verifying that severity, priority, and tone return to placeholder.
6. Selecting the same values again and confirming they register.
7. Filling fields below the minimum and checking error messages.
8. Exceeding character maximums and checking the counter.
9. Applying a template and reviewing that fields are filled in.
10. Automatically detecting the technical environment.
11. Verifying the rendered preview.
12. Toggling between raw Markdown and rendered view.
13. Copying the generated report.
14. Saving and reviewing persisted reports.
15. Clearing the form and canceling the action.
16. Clearing the form and confirming the action.
17. Closing the modal with the `Escape` key.

---

## Technical Quality and Review

During development, reviews and technical adjustments were made to improve the overall quality of the project.

Improvements applied include:

- Splitting the form into sections.
- Extracting form logic into a dedicated hook.
- Centralizing validations and limits.
- Extracting quality logic into pure functions.
- Fixing findings from code review.
- Accessibility review.
- Cleaning up dead or unnecessary code.
- Review with tools such as React Doctor.
- Validation through build, lint, and type-check.

False positives from automated tools were also documented to avoid unnecessary changes that could affect correct behavior.

---

## Final Project Status

The project includes:

- a functional form,
- validations with Zod,
- integration with React Hook Form,
- Markdown report generation,
- real-time preview,
- quick templates,
- tones and heading variants,
- local persistence,
- quality checklist and suggestions,
- visual feedback,
- accessibility improvements,
- custom visual design,
- a successful build.

---

## Team

| Member | Role / Challenge |
|---|---|
| Matías | D1 — Form foundation and initial structure |
| Agustín | D2 — Markdown generation / technical review |
| Magalí | D3 — Validation, feedback, checklist, and form experience |
| Octavio | D4 — Report preview and copy |
| Ann | D5 — Templates, tone, and variants |

> Review this table before final delivery to confirm that names and roles match the team's final distribution.

---

## License

This project was developed for educational purposes as part of IntegrarTEC.

---

## Conclusion

BugNet transforms disorganized information about an error into a clearer, more complete, and reusable technical report.

In addition to fulfilling its core features, the project incorporates validation, Markdown generation, preview, templates, quality feedback, local persistence, and accessibility improvements.

The result is a functional, maintainable application that can be defended in a technical or academic review.
