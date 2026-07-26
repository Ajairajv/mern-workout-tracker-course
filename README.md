# MERN Workout Tracker Course

This repository hosts a beginner-friendly, live-coding MERN course built around a **Workout Tracker** app.
Students record workouts (title, reps, load/weight) and, by the end of the course, sign up, log in, and only
see their own workouts.

Branch strategy (each branch is the exact starting point for one class):

- `main`: completed, production-style application after Lesson 5
- `lesson-0`: environment setup, planning, and starter backend skeleton (routes stubbed, not yet wired to the DB)
- `lesson-1`: full backend CRUD API — routes wired to MongoDB via Mongoose, controllers, status codes
- `lesson-2`: React frontend — fetch and display workouts from the API
- `lesson-3`: create and delete workouts from the frontend (forms, Context API)
- `lesson-4`: update/edit workouts, date formatting, form validation, and styling
- `lesson-5`: user authentication (signup/login/JWT), per-user workouts, and deployment readiness

Root structure:

- `backend/`: Express + MongoDB server code
- `frontend/`: React client (created in Lesson 2)

Lesson 0 deliverables:

- Initialize git repository and branch strategy
- Add `.gitignore`
- Add `backend/.env.example`
- Backend skeleton: Express app, Mongoose connection, `Workout` model, stubbed `/api/workouts` routes

Lesson 1 deliverables:

- Implement real CRUD logic in `backend/controllers/workoutController.js`
- Wire routes to the controller, add mongoose ObjectId validation and correct HTTP status codes
- Manually test every endpoint with Thunder Client / Postman
