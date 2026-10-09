# Job Tracker — MERN Stack Application

A full-stack job application tracking tool built with the MERN stack. Keep every application organized — from wishlist to offer — with search, filtering, and live status stats.

---

## Features

- **Add / Edit / Delete** job applications with full form validation
- **Status tracking** — Wishlist, Applied, Interview, Offer, Rejected
- **Inline status change** — update status directly from the card without opening a form
- **Stats bar** — live count per status, doubles as a one-click filter
- **Search** — debounced search across company name and role
- **Filter by status** — dropdown and clickable stat pills both control the filter
- **Delete confirmation** — modal dialog prevents accidental deletes
- **Loading & error states** — spinner while fetching, error message on failure
- **Responsive design** — works on desktop and mobile

---

## Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | React 18, Vite, plain CSS         |
| Backend   | Node.js, Express.js               |
| Database  | MongoDB Atlas, Mongoose           |
| Dev Tools | nodemon, Vite dev proxy           |
| AI Tool   | **Kiro** (https://kiro.dev)       |

---

## Project Structure

```
abhitej-startupmeu-task/
├── client/                   # React + Vite frontend
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js        # Centralized fetch layer
│   │   ├── components/
│   │   │   ├── StatsBar.jsx
│   │   │   ├── ApplicationList.jsx
│   │   │   ├── ApplicationCard.jsx
│   │   │   ├── ApplicationForm.jsx
│   │   │   └── ConfirmDialog.jsx
│   │   ├── hooks/
│   │   │   └── useDebounce.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── vite.config.js        # Proxy: /api → localhost:5000
│
└── server/                   # Express + Mongoose backend
    ├── controllers/
    │   └── applicationController.js
    ├── models/
    │   └── Application.js
    ├── routes/
    │   └── applications.js
    ├── middleware/
    │   └── errorHandler.js
    ├── .env.example
    └── server.js
```

---

## Setup & Installation

### Prerequisites
- Node.js v18+
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (free tier works)

### 1. Clone the repository

```bash
git clone https://github.com/AbhitejKantreddi/abhitej-startupmeu-task.git
cd abhitej-startupmeu-task
```

### 2. Set up the backend

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/job-tracker?retryWrites=true&w=majority
```

Replace `<username>`, `<password>`, and `<cluster>` with your MongoDB Atlas credentials.

### 3. Set up the frontend

```bash
cd ../client
npm install
```

---

## How to Run

Open **two terminals**:

**Terminal 1 — Backend:**
```bash
cd server
npm run dev
# Server running on http://localhost:5000
```

**Terminal 2 — Frontend:**
```bash
cd client
npm run dev
# App running on http://localhost:5173
```

Open **http://localhost:5173** in your browser.

---

## API Endpoints

| Method | Endpoint                      | Description                          |
|--------|-------------------------------|--------------------------------------|
| GET    | `/api/applications`           | Get all (supports `?search=&status=`)|
| POST   | `/api/applications`           | Create a new application             |
| GET    | `/api/applications/stats`     | Get counts per status                |
| GET    | `/api/applications/:id`       | Get a single application             |
| PUT    | `/api/applications/:id`       | Update an application                |
| DELETE | `/api/applications/:id`       | Delete an application                |

---

## AI Tool Used — Kiro

This project was built using **[Kiro](https://kiro.dev)**, an AI-powered development environment built on VS Code.

### How Kiro was used

Kiro acted as a collaborative engineering partner throughout the entire build — not just for code generation, but for requirements definition, architecture decisions, and iterative refinement.

**1. Requirements & API design**
Kiro helped formalize the backend requirements before writing any code — defining the data model, REST endpoints, query parameter behavior, validation rules, and response shape. Edge cases like `/stats` route ordering (must precede `/:id`), regex escaping on search input, and seeding all five statuses with 0 in stats were caught and addressed at the requirements stage, not during debugging.

**2. Backend scaffolding**
Kiro generated the full Express + Mongoose backend: `Application` model with timestamps, controller functions with `new: true` and `runValidators: true` on updates, a centralized error handler covering Mongoose validation and cast errors, and a 404 handler for unknown routes. The entire backend was tested against a live MongoDB Atlas cluster before moving to the frontend.

**3. Frontend architecture**
Kiro designed the component split (`StatsBar`, `ApplicationList`, `ApplicationCard`, `ApplicationForm`, `ConfirmDialog`), the `useDebounce` custom hook, and the `api.js` fetch layer — keeping all HTTP calls in one file and routing them through the Vite dev proxy so no URLs are hardcoded anywhere in the React code.

**4. Debugging & environment setup**
When the MongoDB Atlas connection failed due to IP access list restrictions and authentication errors, Kiro diagnosed each issue step by step — identifying the network access problem, the auth failure, and guiding the fix without restarting from scratch.

**5. CSS & UI polish**
Kiro authored the complete plain CSS design system: a dark theme with CSS custom properties, color-coded status borders and badges, a sticky glass-effect header, animated modals, a responsive card grid, and accessible form states — all without any CSS framework.

---

## License

MIT
