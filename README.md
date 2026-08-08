# Diagnostic Training Tool

A web-based training platform that lets medical students, trainees, and healthcare professionals practice clinical diagnostic reasoning through simulated patient encounters. Users interview an AI-driven virtual patient, gather symptoms and history through natural conversation, take notes, and submit a diagnosis under a timer — then review their performance history afterward.

This repository contains the **frontend** (React + Vite). It talks to a separate backend API that handles authentication, session management, and AI-generated patient responses. The backend **frontend** repository can be found [here](https://github.com/mgmg23/patient_simulator_backend)

## Features

- **Simulated patient interviews** — chat with an AI patient that responds with symptoms, history, and behavioral cues based on a structured case
- **Patient chart** — view age, sex, and chief complaint at a glance during a session
- **Clinical notes** — track symptoms, history/medications, observations, and a working diagnosis while you interview
- **Timed diagnosis** — a session timer runs until you submit, either by typing a free-text diagnosis or selecting from a list of options
- **Session history** — review past sessions, including correctness, time to diagnosis, notes, and the full conversation transcript
- **Authentication** — username/password login and Google sign-in
- **User dashboard** — sessions completed, correct/incorrect counts, and success rate

## Tech Stack

- [React 19](https://react.dev/) with [React Router](https://reactrouter.com/)
- [Vite](https://vite.dev/) for tooling and dev server
- [Bootstrap 5](https://getbootstrap.com/) + Sass/CSS Modules for styling
- REST API backend (external, not included in this repo)

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```
VITE_GOOGLE_CLIENT_ID=your-google-oauth-client-id
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
npm run preview   # preview the production build locally
```

### Lint

```bash
npm run lint
```

## Project Structure

```
src/
├── components/       # Feature components (Login, Menu, PracticeSession, Diagnosis, Notes, History, Timer, ...)
├── pages/            # Route-level page wrappers
├── assets/           # Images and static assets
├── App.jsx           # Route definitions
└── main.jsx          # App entry point
```

## Routes

| Path             | Description                          |
| ---------------- | ------------------------------------- |
| `/`               | Landing page                         |
| `/login`          | Login                                |
| `/menu`           | Main menu and stats dashboard        |
| `/practice`       | Live patient interview session       |
| `/history`        | List of past sessions                |
| `/details/:id`    | Notes and transcript for a session   |
| `/calculator`     | Utility calculator                   |
