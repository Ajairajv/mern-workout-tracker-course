# Lesson 4 — Update, dates, validation, and styling

**Branch:** `lesson-4`  
**Goal:** Edit workouts inline, show relative timestamps, highlight validation errors, and polish the UI.

## What you'll build

- Edit mode on each workout card (toggle + save/cancel)
- PATCH request to update workouts
- `date-fns` for "3 days ago" style timestamps
- Backend validation errors reflected in the form
- CSS layout: two-column home page, styled cards and buttons

## Before you start

- Lesson 3 create/delete working with Context
- `npm install date-fns` in `frontend/`

## Step 1 — Add update to the reducer

In `WorkoutContext.jsx`, add an `UPDATE_WORKOUT` action that maps over workouts and replaces the matching `_id`.

## Step 2 — Edit mode in `WorkoutDetails`

1. `useState(false)` for `isEditing`
2. Local state for `title`, `load`, `reps` (initialized from `workout` props)
3. "Edit" button sets `isEditing` to true → show inputs + Save/Cancel
4. Save submits a **PATCH** to `/api/workouts/:id`
5. On success: dispatch `UPDATE_WORKOUT`, set `isEditing` false
6. Cancel resets local state and exits edit mode

## Step 3 — Relative dates with date-fns

```js
import { formatDistanceToNow } from 'date-fns'

formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })
// → "about 2 hours ago"
```

Display this under each workout's details.

## Step 4 — Backend validation in the form

Update `createWorkout` in the controller to check for empty fields and return:

```json
{
  "error": "Please fill in all the fields",
  "emptyFields": ["title", "load"]
}
```

In `WorkoutForm`:

1. Track `emptyFields` in state
2. On error response, save `json.emptyFields`
3. Add an `error` CSS class to inputs whose field name is in `emptyFields`

## Step 5 — Style the app

File: `frontend/src/index.css`

Suggested layout:

- Google Font import (e.g. Poppins)
- `.home` as a CSS grid: workouts on the left, form on the right
- Card style for `.workout-details` with shadow and spacing
- Green "Add Workout" button, red delete, distinct edit button
- `.error` class with red border on invalid inputs

Take your time here — good CSS makes the app feel finished.

## How to know you're done

- [ ] Edit → change values → Save updates the card without refresh
- [ ] Cancel discards changes
- [ ] Each workout shows a relative created date
- [ ] Submitting an empty form highlights the missing fields
- [ ] App has a clean two-column layout

## Common mistakes

- PATCH body missing `Content-Type: application/json`
- Not spreading `req.body` in `findOneAndUpdate` on the backend
- `formatDistanceToNow` called with a string instead of `new Date(...)`
- Edit state not reset when canceling

## Stuck?

Compare with `lesson-5` or `main` → `WorkoutDetails.jsx` and `index.css`.

## Next lesson

→ [Lesson 5 — Authentication and deployment](lesson-5.md)
