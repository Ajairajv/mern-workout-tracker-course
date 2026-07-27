# Troubleshooting

Common problems and how to fix them. If you're still stuck, compare your code with the next lesson branch or `main`.

## MongoDB / connection errors

### `querySrv ECONNREFUSED` or DNS errors

The project already sets public DNS servers in `server.js` to work around this on some networks. If you still see DNS errors:

1. Confirm your `MONGO_URI` is correct (username, password, cluster hostname)
2. In Atlas → **Network Access**, ensure `0.0.0.0/0` is allowed (for development)
3. Try replacing `mongodb+srv://` with the standard connection string from Atlas (non-SRV format)

### `Authentication failed`

- Double-check username and password in the connection string
- If your password contains special characters (`@`, `#`, `/`, etc.), [URL-encode](https://www.urlencoder.org/) them
- Verify the database user exists in Atlas → **Database Access**

### Server starts but no `Server is running on port...` message

MongoDB connection failed before `app.listen` ran. Check the error printed above it — usually a bad `MONGO_URI`.

## Port problems

### `EADDRINUSE: address already in use`

Another process is using the port.

```bash
# Find what's using port 4000 (macOS/Linux)
lsof -i :4000

# Windows
netstat -ano | findstr :4000
```

Kill that process or change `PORT` in `.env` — but if you change it, you must also update every `http://localhost:4000` URL in the frontend.

### Frontend can't reach the API / `Failed to fetch`

1. Is the backend running? Check Terminal 1 for `Server is running on port 4000!!!`
2. Is `PORT=4000` in `backend/.env`? The frontend hard-codes port `4000`.
3. CORS is enabled on the backend (`app.use(cors())` on `main`). If you removed it, add it back before Lesson 2.

## npm / install issues

### `npm install` fails

- Make sure Node.js LTS is installed: `node --version`
- Delete `node_modules` and `package-lock.json`, then run `npm install` again
- On Windows, run the terminal as Administrator if you get permission errors

### `nodemon: command not found`

Run `npm install` inside `backend/` — nodemon is a dev dependency.

## Git / branches

### `error: pathspec 'lesson-2' did not match`

Fetch remote branches first:

```bash
git fetch origin
git checkout lesson-2
```

### I made changes on the wrong branch

```bash
git stash
git checkout correct-branch
git stash pop
```

Or commit on your branch and continue — lesson branches are starting points, not strict rules.

## API testing (Lessons 0–1)

### POST returns stub JSON on `lesson-0`

Expected — routes are stubbed until you implement controllers in Lesson 1.

### `404 No such workout`

- Check the ID in the URL is a valid MongoDB ObjectId (24 hex characters)
- The workout may have been deleted
- On `main` (with auth), you can only access **your own** workouts — use a token from login

### Wrong HTTP status code

| Situation | Expected status |
|-----------|-----------------|
| GET all / GET one success | `200` |
| CREATE success | `201` |
| DELETE / UPDATE success | `200` |
| Validation error | `400` |
| Invalid or missing ID | `404` |
| Missing auth token (Lesson 5+) | `401` |

## Frontend (Lesson 2+)

### Blank page / white screen

1. Open browser DevTools (F12) → **Console** tab for errors
2. Common causes: typo in import path, missing `export default`

### Workouts don't appear

1. Network tab: is the GET request to `/api/workouts` returning `200`?
2. Lesson 5+: are you logged in? Workout routes require a `Bearer` token.
3. Check `useEffect` dependency array and that `dispatch` is called on success

### `useWorkoutsContext must be used inside WorkoutContextProvider`

Wrap your app (or the component tree) in `<WorkoutContextProvider>` in `main.jsx`.

## Authentication (Lesson 5+)

### `Password not strong enough`

The backend uses `validator.isStrongPassword`. Use a password with uppercase, lowercase, a number, and a symbol.

### `Request is not authorized`

- Include header: `Authorization: Bearer YOUR_TOKEN_HERE`
- Token expires after 3 days — log in again
- Make sure `SECRET` in `.env` hasn't changed since the token was issued

### Logged out after refresh (before implementing localStorage)

Persist the user object to `localStorage` on login/signup and restore it in `AuthContext` on mount — see `main` branch for reference.

## Still stuck?

1. Read the error message carefully — it usually names the file or field
2. Compare the file you're editing with the same file on the **next lesson branch** or `main`
3. Check [Getting Started](getting-started.md) — especially `.env` and ports
4. Ask your instructor or open an issue with: your branch, the command you ran, and the full error text
