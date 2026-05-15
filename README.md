# CICD Practice Project

![Status](https://img.shields.io/badge/status-experimental-yellow)
![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

Clean, minimal example that demonstrates a small frontend served by a lightweight Express backend, containerized with Docker and runnable from a Jenkins pipeline.

**Why this repo exists**
- Provides a compact template for CI/CD practice: build a Node app, create a Docker image, and run it from Jenkins.
- Focuses on clean UI (Poppins font), an accessible button interaction, and a tiny API endpoint.

**What you'll find**
- `app.js` — application entry that boots the backend (keeps compatibility with prior workflows).
- `backend/server.js` — Express server serving `/api/hello` and static frontend files.
- `frontend/` — static site: `index.html`, `styles.css`, `app.js` (button + fetch).
- `Dockerfile` — builds the Node image and runs `npm start`.
- `Jenkinsfile` — builds the Docker image and runs it (cross-platform steps).

**Quick Start — Local (Node)**

Prerequisites: Node.js >= 18

```bash
# from project root
npm install
npm start
# open http://localhost:3000
```

**Quick Start — Docker**

```bash
# build
docker build -t cicd-project:local .

# run (Jenkins maps 9090 -> 3000; here we show both typical mappings)
docker run -d -p 3000:3000 --name cicd-local cicd-project:local
# or to match the Jenkins run command
docker run -d -p 9090:3000 --name cicd-local cicd-project:local

# open http://localhost:3000  (or http://localhost:9090)
```

**Endpoints**
- `GET /api/hello` — returns JSON `{ message: 'Hello from the backend!' }`
- Static frontend served from `/` (root)

**Jenkins notes**
- The included `Jenkinsfile` builds the Docker image and runs it using `docker build` and `docker run`.
- Ensure the Jenkins agent has the Docker CLI and permission to run containers.
- To push images to a registry, add `docker login` and `docker push` steps and supply credentials via Jenkins credentials store.

**Development tips**
- Use the `.dockerignore` to keep build context small (node_modules and local editor files are excluded).
- If you add a frontend build step (React/Vite), update the `Dockerfile` to run the build and serve the compiled `dist/` directory.

**Contributing**
- Small changes welcome. Open a PR with a short description. Keep styles simple and accessible.

**License**
- MIT
