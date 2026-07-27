# Lesson 1 — Backend CRUD API

**Branch:** `lesson-1`  
**Goal:** Replace stub routes with real Create, Read, Update, Delete logic backed by MongoDB.

## What you'll build

- `backend/controllers/workoutController.js` with five handler functions
- Routes wired to the controller (thin route files)
- Correct HTTP status codes and ObjectId validation
- A fully testable REST API (no frontend yet)

## Before you start

- Finished [Lesson 0](lesson-0.md) OR checked out `lesson-1` (same skeleton, ready for controllers)
- Backend running on port 4000
- Thunder Client / Postman open

## Concepts (quick refresher)

| HTTP method | Purpose | Success status |
|-------------|---------|----------------|
| GET | Read data | `200` |
| POST | Create new resource | `201` |
| PATCH | Partial update | `200` |
| DELETE | Remove resource | `200` |

**REST** = Representational State Transfer. Each URL is a resource; HTTP methods define the action.

## Step 1 — Create the controller

File: `backend/controllers/workoutController.js`

Create five async functions and export them:

| Function | What it does |
|----------|--------------|
| `getWorkouts` | `Workout.find()` — return all, newest first (`sort({ createdAt: -1 })`) |
| `getWorkout` | `Workout.findById(id)` — return one or 404 |
| `createWorkout` | `Workout.create({ title, load, reps })` from `req.body` |
| `deleteWorkout` | `Workout.findOneAndDelete({ _id: id })` |
| `updateWorkout` | `Workout.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })` |

Use `async`/`await` and wrap `createWorkout` in try/catch — return `400` with `error.message` on validation failure.

## Step 2 — Validate ObjectIds

Before querying by `id`, check:

```js
mongoose.Types.ObjectId.isValid(id)
```

If invalid, return `404` with `{ error: 'No such workout' }`.

Apply this in `getWorkout`, `deleteWorkout`, and `updateWorkout`.

## Step 3 — Wire routes to the controller

File: `backend/routes/workouts.js`

Replace stub handlers with imports from the controller:

```js
router.get('/', getWorkouts)
router.get('/:id', getWorkout)
router.post('/', createWorkout)
router.delete('/:id', deleteWorkout)
router.patch('/:id', updateWorkout)
```

Keep the route file thin — no business logic here.

## Step 4 — Test every endpoint

Use `http://localhost:4000/api/workouts` as the base URL.

### CREATE

**POST** `/api/workouts`

```json
{
  "title": "Squat",
  "reps": 5,
  "load": 100
}
```

Expected: `201` with the created workout (includes `_id` and `createdAt`).

Save the `_id` for later tests.

### READ ALL

**GET** `/api/workouts`

Expected: `200` with an array containing your workout.

### READ ONE

**GET** `/api/workouts/:id`

Expected: `200` with the single workout object.

Try a fake id like `abc` → expect `404`.

### UPDATE

**PATCH** `/api/workouts/:id`

```json
{
  "load": 110
}
```

Expected: `200` with the updated workout (`load` is now 110).

### DELETE

**DELETE** `/api/workouts/:id`

Expected: `200` with the deleted workout.

**GET** the same id again → `404`.

## Step 5 — Verify in MongoDB Atlas

Atlas → **Browse Collections** → your database → `workouts` collection. You should see documents appear and disappear as you test.

## How to know you're done

- [ ] All five endpoints work with correct status codes
- [ ] Invalid IDs return `404`, not a server crash
- [ ] Creating a workout without required fields returns `400`
- [ ] Routes file only imports and maps — logic lives in the controller
- [ ] You tested the full CRUD cycle manually

## Common mistakes

- Returning `200` on POST instead of `201`
- Forgetting `{ new: true }` on `findOneAndUpdate` (returns the old document)
- Not using `await` — handlers return Promises and Express won't wait
- Putting DB logic directly in routes instead of the controller

## Stuck?

Compare with `lesson-2` or `main` → `backend/controllers/workoutController.js` (Lesson 1 version has no `user_id` or auth).

→ [Troubleshooting](../troubleshooting.md)

## Next lesson

→ [Lesson 2 — React frontend](lesson-2.md)
