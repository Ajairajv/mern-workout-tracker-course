# Lesson 5 — Authentication, per-user workouts, and deployment

**Branch:** `lesson-5`  
**Goal:** Users sign up and log in with JWT. Each user only sees their own workouts. App is ready to deploy.

## What you'll build

**Backend:**

- `User` model with hashed passwords (`bcrypt`)
- `/api/user/signup` and `/api/user/login` routes
- JWT tokens signed with `SECRET` from `.env`
- `requireAuth` middleware protecting all workout routes
- `user_id` on every workout document

**Frontend:**

- `AuthContext` with login/logout state
- Login and Signup pages
- Protected routes (redirect to `/login` if not authenticated)
- `Authorization: Bearer <token>` header on all workout requests
- User persisted in `localStorage` so refresh keeps you logged in

## Before you start

- Lesson 4 complete
- `SECRET` set in `backend/.env` (any long random string)
- Install backend packages: `bcrypt`, `jsonwebtoken`, `validator`, `cors`

## Part A — Backend auth

### Step 1 — User model

File: `backend/models/userModel.js`

- Fields: `email` (unique), `password`
- Static method `signup(email, password)`:
  - Validate email format and password strength (`validator`)
  - Check email not already registered
  - Hash password with `bcrypt.genSalt(10)` + `bcrypt.hash`
  - Create and return user
- Static method `login(email, password)`:
  - Find user by email
  - `bcrypt.compare` password
  - Return user or throw descriptive errors

### Step 2 — User controller and routes

Files: `backend/controllers/userController.js`, `backend/routes/user.js`

| Route | Handler | Status |
|-------|---------|--------|
| POST `/api/user/signup` | Create user, return `{ email, token }` | `201` |
| POST `/api/user/login` | Verify credentials, return `{ email, token }` | `200` |

Token creation:

```js
jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
```

Mount user routes in `server.js`: `app.use('/api/user', userRoutes)`

### Step 3 — Auth middleware

File: `backend/middleware/requireAuth.js`

1. Read `Authorization` header
2. Extract token after `Bearer `
3. `jwt.verify(token, process.env.SECRET)` → get `_id`
4. Attach `req.user` and call `next()`
5. Return `401` if missing or invalid

### Step 4 — Protect workout routes

In `backend/routes/workouts.js`:

```js
router.use(requireAuth)
```

Update the workout controller:

- **Create:** save `user_id: req.user._id`
- **Read / Update / Delete:** filter by `{ user_id: req.user._id }` so users can't touch others' data

Update `workoutModel.js` — add required `user_id` field (String).

### Step 5 — Enable CORS

In `server.js`: `app.use(cors())` so the React dev server can call the API.

### Step 6 — Test auth in Thunder Client

1. **POST** `/api/user/signup` with `{ "email": "test@example.com", "password": "Test1234!" }`
2. Copy the `token` from the response
3. **GET** `/api/workouts` with header `Authorization: Bearer YOUR_TOKEN`
4. **POST** a workout with the same header → should include `user_id`
5. Log in as a second user → should see an empty workout list

## Part B — Frontend auth

### Step 7 — AuthContext

Mirror the WorkoutContext pattern:

- State: `{ user: null }` where user is `{ email, token }`
- Actions: `LOGIN`, `LOGOUT`
- On mount: read `localStorage.getItem('user')` and restore session

Wrap the app in `AuthContextProvider` (outside or inside WorkoutContext — either works).

### Step 8 — Custom hooks

| Hook | Does |
|------|------|
| `useLogin` | POST to `/api/user/login`, save to localStorage, dispatch LOGIN |
| `useSignup` | POST to `/api/user/signup`, same flow |
| `useLogout` | Remove localStorage, dispatch LOGOUT |

### Step 9 — Login and Signup pages

Controlled forms with email + password fields. Show loading state and error messages from the API.

Password must be **strong** (the backend enforces this).

### Step 10 — Protected routes

Use `react-router-dom`:

- `/` → Home (only if logged in, else redirect to `/login`)
- `/login` → Login (redirect to `/` if already logged in)
- `/signup` → Signup (same redirect logic)

Add a `Navbar` with email display and logout button.

### Step 11 — Attach token to workout requests

Every fetch to `/api/workouts` needs:

```js
headers: {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${user.token}`
}
```

Update `Home.jsx`, `WorkoutForm.jsx`, and `WorkoutDetails.jsx`.

## Part C — Deployment readiness

Before deploying:

- [ ] Never commit `.env` — use host environment variables
- [ ] Set `MONGO_URI`, `PORT`, and `SECRET` on your hosting platform
- [ ] Build frontend: `cd frontend && npm run build`
- [ ] Serve the `dist/` folder (or deploy frontend and backend separately)
- [ ] Update hard-coded `localhost:4000` URLs to your production API URL (or use an env variable like `import.meta.env.VITE_API_URL`)

Popular hosting options:

| Service | Good for |
|---------|----------|
| [Render](https://render.com) | Backend + static frontend |
| [Railway](https://railway.app) | Full-stack with easy env vars |
| [Vercel](https://vercel.com) | Frontend (connect API separately) |
| [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) | Database (already using this) |

## How to know you're done

- [ ] Signup creates a user; password is hashed in the database (not plain text)
- [ ] Login returns a JWT; invalid credentials return `400`
- [ ] Workout routes return `401` without a token
- [ ] User A cannot see or delete User B's workouts
- [ ] Refreshing the page keeps you logged in
- [ ] Logout clears session and redirects to login

## Common mistakes

- Forgetting `router.use(requireAuth)` — workouts are publicly accessible
- Storing plain-text passwords
- Token sent without `Bearer ` prefix
- `user_id` not saved on create — all users see all workouts
- `SECRET` missing from `.env` → server crashes on signup

## Stuck?

The `main` branch is the complete reference implementation. Diff one file at a time rather than copying the whole project.

→ [Troubleshooting](../troubleshooting.md)

## You finished the course

The `main` branch is the production-style result. Consider:

- Adding input validation on the frontend
- Using environment variables for the API base URL
- Deploying and sharing your live app
