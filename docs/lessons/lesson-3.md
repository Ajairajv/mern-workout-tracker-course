# Lesson 3 — Create and delete workouts

**Branch:** `lesson-3`  
**Goal:** Add a form to create workouts and a delete button on each card — with global state via React Context.

## What you'll build

- `WorkoutContext` — global state for the workout list
- `WorkoutForm` — controlled inputs + POST to the API
- Delete button on `WorkoutDetails` — DELETE request
- UI updates instantly without a full page refresh

## Before you start

- Lesson 2 frontend displaying workouts
- Backend CRUD API working
- Both servers running

## Concepts

**Controlled inputs:** React state is the source of truth. `value={title}` + `onChange` keeps the input in sync.

**Context API:** Avoids passing props through many layers. `WorkoutContextProvider` wraps the app; any child can read/write workouts.

## Step 1 — Create WorkoutContext

File: `frontend/src/context/WorkoutContext.jsx`

1. `createContext()`
2. A reducer with actions:
   - `SET_WORKOUTS` — replace the whole list (used on initial fetch)
   - `CREATE_WORKOUT` — prepend new workout to the array
   - `DELETE_WORKOUT` — filter out the deleted workout by `_id`
3. Export `WorkoutContextProvider` that wraps children with `useReducer`

## Step 2 — Wrap the app

File: `frontend/src/main.jsx`

```jsx
<WorkoutContextProvider>
  <App />
</WorkoutContextProvider>
```

## Step 3 — Create `useWorkoutsContext` hook

File: `frontend/src/hooks/useWorkoutsContext.js`

A small hook that calls `useContext(WorkoutContext)` and throws a helpful error if used outside the provider.

## Step 4 — Update `Home.jsx`

- Remove local `useState` for workouts
- Use `useWorkoutsContext()` for `workouts` and `dispatch`
- On fetch success: `dispatch({ type: 'SET_WORKOUTS', payload: json })`

## Step 5 — Build `WorkoutForm`

File: `frontend/src/components/WorkoutForm.jsx`

1. State for `title`, `load`, `reps`
2. On submit, prevent default
3. **POST** to `http://localhost:4000/api/workouts` with JSON body
4. On success: clear the form and `dispatch({ type: 'CREATE_WORKOUT', payload: json })`
5. Render the form on `Home` below the workout list

## Step 6 — Add delete to `WorkoutDetails`

1. **DELETE** `http://localhost:4000/api/workouts/:id`
2. On success: `dispatch({ type: 'DELETE_WORKOUT', payload: json })`

## How to know you're done

- [ ] Creating a workout via the form adds it to the list immediately
- [ ] Deleting removes the card without refreshing
- [ ] Form clears after a successful create
- [ ] Context provider wraps the entire app

## Common mistakes

- Missing `Content-Type: application/json` header on POST
- Forgetting `e.preventDefault()` — form submits and reloads the page
- Dispatching before checking `response.ok`
- `CREATE_WORKOUT` appends to the end instead of the beginning (newest should appear first to match backend sort)

## Stuck?

Compare with `lesson-4` or `main` → `frontend/src/context/WorkoutContext.jsx` and `WorkoutForm.jsx`.

## Next lesson

→ [Lesson 4 — Update, dates, and styling](lesson-4.md)
