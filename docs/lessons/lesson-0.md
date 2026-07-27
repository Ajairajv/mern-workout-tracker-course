# Lesson 0 — Environment setup and backend skeleton

**Branch:** `lesson-0`  
**Goal:** A running Express server connected to MongoDB, with a `Workout` model and stubbed API routes.

## What you'll build

By the end of this lesson you will have:

- A git repo with a branch-per-lesson strategy
- A `.gitignore` that keeps secrets and `node_modules` out of git
- `backend/.env.example` documenting required environment variables
- An Express app that connects to MongoDB
- A Mongoose `Workout` model
- `/api/workouts` routes that return placeholder JSON (real logic comes in Lesson 1)

## Before you start

- Complete [Prerequisites](../prerequisites.md)
- Follow [Getting Started](../getting-started.md) through step 5 (backend running)

## Step 1 — Initialize the project

If you're following along live, the instructor may do this for you. Otherwise:

```bash
mkdir mern-workout-tracker-course
cd mern-workout-tracker-course
git init
```

Create branches for each lesson (`lesson-0` through `lesson-5`) and keep `main` for the finished app.

## Step 2 — Add `.gitignore`

Create a root `.gitignore` that ignores at minimum:

- `node_modules/`
- `.env`
- log files
- OS/editor junk (`.DS_Store`, `.vscode/`)

**Checkpoint:** `git status` should not list `node_modules` or `.env`.

## Step 3 — Scaffold the backend

Inside `backend/`:

```bash
npm init -y
npm install express mongoose dotenv
npm install -D nodemon
```

Add scripts to `package.json`:

```json
"start": "node server.js",
"dev": "nodemon server.js"
```

## Step 4 — Create `server.js`

Your Express entry point should:

1. Load environment variables with `dotenv`
2. Create an Express app
3. Use `express.json()` middleware to parse JSON bodies
4. Log each request path and method (helpful while learning)
5. Mount workout routes at `/api/workouts`
6. Connect to MongoDB with `mongoose.connect(process.env.MONGO_URI)`
7. Start listening **only after** a successful DB connection

**Checkpoint:** `npm run dev` prints `Server is running on port 4000!!!` with no connection errors.

## Step 5 — Create the Workout model

File: `backend/models/workoutModel.js`

Fields:

| Field | Type | Required |
|-------|------|----------|
| `title` | String | yes |
| `reps` | Number | yes |
| `load` | Number | yes |

Enable Mongoose timestamps (`createdAt`, `updatedAt`) with `{ timestamps: true }`.

## Step 6 — Stub the routes

File: `backend/routes/workouts.js`

Create a router with these endpoints — each returns a simple JSON message for now:

| Method | Path | Stub response |
|--------|------|---------------|
| GET | `/` | `{ message: 'Get all workouts' }` |
| GET | `/:id` | `{ message: 'Get a single workout' }` |
| POST | `/` | `{ message: 'Post a new workout' }` |
| DELETE | `/:id` | `{ message: 'Delete a workout' }` |
| PATCH | `/:id` | `{ message: 'Update a workout' }` |

## Step 7 — Test with Thunder Client / Postman

With the server running, send requests to `http://localhost:4000/api/workouts`:

1. **GET** `/api/workouts` → stub message
2. **GET** `/api/workouts/abc123` → stub message
3. **POST** `/api/workouts` with body `{ "title": "Bench Press", "reps": 10, "load": 60 }` → stub message

You won't see data in the database yet — that's Lesson 1.

## Step 8 — Commit your work

```bash
git add .
git commit -m "Lesson 0: backend skeleton with stubbed routes"
```

## How to know you're done

- [ ] Backend starts without errors
- [ ] MongoDB connection succeeds
- [ ] All five workout endpoints return stub JSON
- [ ] `.env` is gitignored; `.env.example` is committed
- [ ] You understand the folder layout: `models/`, `routes/`, `server.js`

## Stuck?

- Connection issues → [Troubleshooting](../troubleshooting.md#mongodb--connection-errors)
- Compare your files with the `lesson-1` branch — it has the same skeleton plus real controller logic

## Next lesson

→ [Lesson 1 — Backend CRUD API](lesson-1.md)
