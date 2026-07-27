# Getting Started

This guide gets you from a fresh clone to a running dev environment. Do this once at the start of the course (Lesson 0).

## 1. Clone the repository

```bash
git clone https://github.com/Ajairajv/mern-workout-tracker-course.git
cd mern-workout-tracker-course
```

Replace the URL with your instructor's fork or the official repo URL.

## 2. Check out your lesson branch

```bash
git branch -a                  # list all branches
git checkout lesson-0          # start here if you're new
```

| If you are on… | Run |
|----------------|-----|
| Lesson 0 (first class) | `git checkout lesson-0` |
| Lesson 1 | `git checkout lesson-1` |
| Lesson 2+ | `git checkout lesson-2` (etc.) |

Each lesson branch contains the code you should have **at the start** of that class. If you finished Lesson 1 on your own machine, stay on your working branch — you don't need to check out `lesson-2` unless you're joining mid-course.

## 3. Configure the backend environment

```bash
cd backend
```

Copy the example env file:

```bash
# macOS / Linux
cp .env.example .env

# Windows (Command Prompt)
copy .env.example .env

# Windows (PowerShell)
Copy-Item .env.example .env
```

Open `backend/.env` and fill in:

```env
MONGO_URI=mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/workout-tracker?retryWrites=true&w=majority
PORT=4000
SECRET=any_long_random_string_at_least_32_characters
```

| Variable | What it is |
|----------|------------|
| `MONGO_URI` | Your MongoDB Atlas connection string ([Prerequisites](prerequisites.md)) |
| `PORT` | Port the Express server listens on — **must be `4000`** to match the frontend |
| `SECRET` | Random string used to sign JWTs (Lesson 5+). Use any long random value in development |

> **Never commit `.env`** — it is already in `.gitignore`.

## 4. Install backend dependencies

Still inside `backend/`:

```bash
npm install
```

## 5. Start the backend

```bash
npm run dev
```

You should see:

```
Server is running on port 4000!!!
```

If MongoDB connection fails, see [Troubleshooting](troubleshooting.md).

Leave this terminal running.

## 6. Frontend (Lesson 2 onward only)

The `frontend/` folder does not exist on `lesson-0` or `lesson-1`. Starting in Lesson 2, open a **second terminal**:

```bash
cd frontend
npm install
npm run dev
```

Vite prints a local URL, usually `http://localhost:5173`. Open it in your browser.

## 7. Verify everything works

### Lessons 0–1 (backend only)

With the server running, test in Thunder Client / Postman:

- **GET** `http://localhost:4000/api/workouts`  
  On `lesson-0` you should get a JSON stub message. On `lesson-1` after implementing CRUD, you get an array of workouts.

### Lessons 2–4 (no auth yet on those branches)

- Backend on port 4000
- Frontend on port 5173
- Browser shows the workout list (and forms once you build them)

### Lesson 5 / `main` (full app with auth)

1. Backend + frontend both running
2. Visit `http://localhost:5173`
3. Sign up with an email and a **strong password** (uppercase, lowercase, number, symbol)
4. Log in and add a workout

## Daily workflow

Each time you sit down to code:

1. Open the project in VS Code
2. `git checkout` your working branch (or stay on it)
3. Terminal 1: `cd backend && npm run dev`
4. Terminal 2 (Lesson 2+): `cd frontend && npm run dev`
5. Save files — both servers auto-reload

## Project layout reminder

```
backend/
  server.js              # Express entry point
  models/                # Mongoose schemas
  routes/                # URL → handler mapping
  controllers/           # Business logic (Lesson 1+)
  middleware/            # Auth checks (Lesson 5+)

frontend/                # Lesson 2+
  src/
    pages/               # Route-level components
    components/          # Reusable UI pieces
    context/             # Global state (Lesson 3+)
    hooks/               # Custom hooks (Lesson 5+)
```

## Next step

Start [Lesson 0](lessons/lesson-0.md) or jump to your current lesson:

- [Lesson 0](lessons/lesson-0.md) · [Lesson 1](lessons/lesson-1.md) · [Lesson 2](lessons/lesson-2.md)
- [Lesson 3](lessons/lesson-3.md) · [Lesson 4](lessons/lesson-4.md) · [Lesson 5](lessons/lesson-5.md)
