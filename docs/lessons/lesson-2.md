# Lesson 2 — React frontend (fetch and display)

**Branch:** `lesson-2`  
**Goal:** A Vite + React app that fetches workouts from your API and displays them in a list.

## What you'll build

- `frontend/` created with Vite
- `Home` page that fetches workouts on load
- `WorkoutDetails` component showing title, load, reps
- Basic layout and global styles

## Before you start

- Lesson 1 API working (test with Thunder Client first)
- Backend running on port **4000**
- Node.js installed

## Step 1 — Create the React app

From the project root:

```bash
npm create vite@latest frontend -- --template react
cd frontend
npm install
```

This gives you Vite + React with fast hot reload.

## Step 2 — Clean up the Vite boilerplate

- Simplify `App.jsx` — remove the counter demo
- Replace default styles in `index.css` with a minimal starting point (or your own)
- Keep `main.jsx` as the entry point

## Step 3 — Create `WorkoutDetails` component

File: `frontend/src/components/WorkoutDetails.jsx`

Props: receives a `workout` object.

Display:

- `workout.title`
- `workout.load` (label it "Load (kg)")
- `workout.reps`

No buttons yet — read-only for this lesson.

## Step 4 — Create the `Home` page

File: `frontend/src/pages/Home.jsx`

1. Add `useState` for workouts (start as `null`)
2. Add `useEffect` that runs once on mount
3. Inside `useEffect`, `fetch('http://localhost:4000/api/workouts')`
4. Parse JSON and save to state if `response.ok`
5. Map over workouts and render `<WorkoutDetails />` for each

**Checkpoint:** With backend running and at least one workout in the DB, the browser shows your workout list.

## Step 5 — Wire up `App.jsx`

Render `<Home />` inside a simple layout (header/title optional).

## Step 6 — Run both servers

Terminal 1: `cd backend && npm run dev`  
Terminal 2: `cd frontend && npm run dev`

Open the Vite URL (usually `http://localhost:5173`).

## How to know you're done

- [ ] Frontend dev server starts without errors
- [ ] Workouts from the API appear in the browser
- [ ] Adding a workout via Thunder Client and refreshing the page shows the new one
- [ ] Empty database shows an empty list (not a crash)

## Common mistakes

- Backend not running → browser shows `Failed to fetch`
- Wrong port in fetch URL (must match `PORT` in `.env`, default **4000**)
- Forgetting `response.json()` is async — you need `await`
- Mapping before data loads — guard with `workouts && workouts.map(...)`

## Stuck?

- Check the browser **Network** tab — is the GET request red or returning an error?
- Compare with `lesson-3` or `main` → `frontend/src/pages/Home.jsx`

→ [Troubleshooting](../troubleshooting.md)

## Next lesson

→ [Lesson 3 — Create and delete workouts](lesson-3.md)
