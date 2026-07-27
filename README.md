# MERN Workout Tracker Course

A beginner-friendly, live-coding MERN course built around a **Workout Tracker** app. Students record workouts (title, reps, load/weight) and, by the end, sign up, log in, and only see their own workouts.

## Quick start

1. Read [Prerequisites](docs/prerequisites.md) — install Node, Git, VS Code, and create a free MongoDB Atlas account.
2. Follow [Getting Started](docs/getting-started.md) — clone the repo, check out your lesson branch, install dependencies, and run the app.
3. Work through the lesson guide for your class (links below).

**Stuck?** See [Troubleshooting](docs/troubleshooting.md).

## Branch strategy

Each branch is the **starting point** for one class. Check out the branch that matches the lesson you are on:

| Branch | What you start with |
|--------|---------------------|
| [`lesson-0`](https://github.com/Ajairajv/mern-workout-tracker-course/tree/lesson-0) | Environment setup, planning, stubbed backend skeleton |
| [`lesson-1`](https://github.com/Ajairajv/mern-workout-tracker-course/tree/lesson-1) | Full backend CRUD API (MongoDB + Mongoose) |
| [`lesson-2`](https://github.com/Ajairajv/mern-workout-tracker-course/tree/lesson-2) | React frontend — fetch and display workouts |
| [`lesson-3`](https://github.com/Ajairajv/mern-workout-tracker-course/tree/lesson-3) | Create and delete workouts (forms, Context API) |
| [`lesson-4`](https://github.com/Ajairajv/mern-workout-tracker-course/tree/lesson-4) | Update/edit workouts, dates, validation, styling |
| [`lesson-5`](https://github.com/Ajairajv/mern-workout-tracker-course/tree/lesson-5) | User auth (JWT), per-user workouts, deployment prep |
| [`main`](https://github.com/Ajairajv/mern-workout-tracker-course/tree/main) | **Completed app** after Lesson 5 — use as reference |

```bash
git checkout lesson-0   # replace with your lesson branch
```

## Lesson guides

| Lesson | Guide | Topics |
|--------|-------|--------|
| 0 | [Lesson 0](docs/lessons/lesson-0.md) | Git, project structure, Express skeleton, Mongoose model |
| 1 | [Lesson 1](docs/lessons/lesson-1.md) | CRUD controllers, routes, HTTP status codes, API testing |
| 2 | [Lesson 2](docs/lessons/lesson-2.md) | Vite + React, fetching workouts, displaying a list |
| 3 | [Lesson 3](docs/lessons/lesson-3.md) | Forms, POST/DELETE, React Context |
| 4 | [Lesson 4](docs/lessons/lesson-4.md) | PATCH updates, date-fns, validation, CSS |
| 5 | [Lesson 5](docs/lessons/lesson-5.md) | Signup/login, JWT, protected routes, deployment |

## Project structure

```
mern-workout-tracker-course/
├── backend/          # Express + MongoDB API
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   └── server.js
├── frontend/         # React client (added in Lesson 2)
│   └── src/
└── docs/             # Setup guides and lesson walkthroughs
```

## Running the finished app (`main` branch)

You need **two terminals** — one for the API, one for the React dev server.

**Terminal 1 — backend**

```bash
cd backend
npm install
cp .env.example .env        # Windows: copy .env.example .env
# Edit .env — set MONGO_URI, PORT=4000, and SECRET
npm run dev
```

**Terminal 2 — frontend**

```bash
cd frontend
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`). Sign up, log in, and add workouts.

> **Port note:** The frontend is hard-coded to call `http://localhost:4000`. Set `PORT=4000` in `backend/.env`.

## How to use this repo

- **In class:** Follow along live on the lesson branch. Use the lesson guide for checkpoints, not full solutions.
- **Self-study:** Start at `lesson-0` and work through each lesson in order.
- **Stuck after class:** Compare your code with the **next** lesson branch or with `main` — but try to solve it yourself first.

## Documentation index

- [Prerequisites](docs/prerequisites.md)
- [Getting Started](docs/getting-started.md)
- [Troubleshooting](docs/troubleshooting.md)
- [Lesson guides](docs/lessons/)
