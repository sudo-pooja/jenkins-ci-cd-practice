
# CICD Project

![Status](https://img.shields.io/badge/status-experimental-yellow)
![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

Clean, minimal example that demonstrates a small frontend served by a lightweight Express backend, containerized with Docker and runnable from a Jenkins pipeline. This workspace is intended for CI/CD practice and experimentation.

Why this repo
- Compact template for building, containerizing, and running a Node app with Jenkins.
- Includes a simple two-tier "Notes" app (frontend + backend) that persists data to disk.

What's included
- `app.js` — application entry that boots the backend.
- `backend/` — Express server and file-backed storage (`storage.js`) with endpoints in `backend/server.js`.
- `frontend/` — static UI: `index.html`, `styles.css`, `app.js` (create/list/delete notes).
- `data/notes.json` — runtime data file (created at runtime). This is ignored by git; Docker runs with a named volume by default.
- `Dockerfile` — builds the Node image and runs `npm start` as a non-root `node` user.
- `Jenkinsfile` — sample pipeline that builds the image and runs it, mounting a named Docker volume for persistence.

Notes feature (two-tier)
- Endpoints:
	- `GET /api/notes` — list notes
	- `POST /api/notes` — create a note (JSON: `{ title, body }`)
	- `DELETE /api/notes/:id` — remove a note
- Notes are stored in `data/notes.json` inside the container. The Jenkins pipeline and the Docker run examples below mount a named volume `cicd-data` into `/usr/src/app/data` so notes persist across container restarts.

Quick Start — Local (Node)

Prerequisites: Node.js >= 18

```bash
# from project root
npm install
npm start
# open http://localhost:3000
```

Quick Start — Docker (with persistent volume)

```bash
# build image
docker build -t cicd-project:local .

# create a named volume for data and run the container
docker volume create cicd-data
docker run -d -p 9090:3000 --name cicd-project -v cicd-data:/usr/src/app/data cicd-project:local

# open http://localhost:9090
```

Jenkins notes
- The included `Jenkinsfile` builds the Docker image and runs it, creating/using a named volume `cicd-data` to persist application data. Ensure the Jenkins agent has Docker installed and permission to run containers.

Dockerfile & security notes
- The `Dockerfile` installs dependencies and runs the app as the non-root `node` user for better container security.
- The container exposes port `3000`; the Jenkins pipeline maps it to host `9090`.

Development tips
- `.dockerignore` excludes local artifacts (including `data/`) so build context stays small.
- For production-grade persistence, replace the file-backed storage with a proper DB (SQLite, Postgres, etc.), or mount a host directory as the `data` volume for easier inspection.

Contributing
- Small changes welcome. Open a PR with a short description. Keep styles simple and accessible.

License
- MIT
