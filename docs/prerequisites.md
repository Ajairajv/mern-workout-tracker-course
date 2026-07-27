# Prerequisites

Install these tools **before Lesson 0**. You only need to do this once.

## 1. Node.js and npm

Node.js includes **npm** (the package manager we use to install libraries).

1. Go to [https://nodejs.org](https://nodejs.org)
2. Download the **LTS** version (recommended for most users)
3. Run the installer with default options
4. Verify in a terminal:

```bash
node --version    # should print v20.x or newer
npm --version     # should print 10.x or newer
```

## 2. Git

Git tracks your code and lets you switch between lesson branches.

1. Go to [https://git-scm.com/downloads](https://git-scm.com/downloads)
2. Install with default options
3. Verify:

```bash
git --version
```

### GitHub account (optional but recommended)

Create a free account at [https://github.com](https://github.com) if you want to fork the repo or push your own copy.

## 3. VS Code (recommended editor)

1. Download from [https://code.visualstudio.com](https://code.visualstudio.com)
2. Useful extensions:
   - **ES7+ React/Redux/React-Native snippets**
   - **Thunder Client** or **REST Client** (for testing API endpoints in Lessons 0–1)
   - **MongoDB for VS Code** (optional)

## 4. MongoDB Atlas (free cloud database)

We store workouts and users in **MongoDB**. Atlas gives you a free hosted database — no local MongoDB install required.

### Create a cluster

1. Sign up at [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. Create a **free M0 cluster** (choose a cloud provider and region close to you)
3. When asked about network access, choose **"Allow access from anywhere"** (`0.0.0.0/0`) for development  
   *(tighten this before real production use)*
4. Create a **database user** with a username and password — save these somewhere safe

### Get your connection string

1. In Atlas, click **Connect** on your cluster
2. Choose **Drivers** → **Node.js**
3. Copy the connection string. It looks like:

```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

4. Replace `<username>` and `<password>` with your database user credentials
5. Add a database name before the `?`, e.g.:

```
mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/workout-tracker?retryWrites=true&w=majority
```

You will paste this into `backend/.env` as `MONGO_URI` — see [Getting Started](getting-started.md).

## 5. API testing tool (Lessons 0–1)

Before the React frontend exists, you test the backend with an HTTP client:

- **Thunder Client** — VS Code extension (easiest if you already use VS Code)
- **Postman** — [https://www.postman.com/downloads](https://www.postman.com/downloads)
- **Insomnia** — [https://insomnia.rest/download](https://insomnia.rest/download)

Any of these works. The lesson guides use generic terms ("send a GET request") that apply to all of them.

## What you should know (helpful but not required)

This course is beginner-friendly, but it helps if you have seen:

- Basic JavaScript (variables, functions, `async`/`await`)
- HTML and CSS basics (Lesson 4 adds styling)
- The idea of a client (browser) talking to a server (API)

If those are new, that's fine — follow along and ask questions. The lesson guides break each step down.

## Next step

→ [Getting Started](getting-started.md)
