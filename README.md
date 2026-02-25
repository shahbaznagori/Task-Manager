


Projet overview:
Task Manager is a React + Vite app that lets authenticated users create, view, update, delete, and filter tasks by status and title.
It uses API-driven task fetching/status filtering with instant client-side title search, plus protected routes and a clean dashboard UI for task management.

Features implemented:
User authentication flow with protected routes (login, register, guarded dashboard access).
Full task CRUD: create, view, edit, and delete tasks.
Task status management (pending / completed) with status-based filtering (API-backed).
Live title search on already-loaded tasks (client-side filtering, no API call on typing).
Responsive dashboard UI with modal-based task form and reusable components.

Technologies used:
Front end:React Vite , Tailwindcss
Backend : Nodejs , expressjs.
Database:  mongodb mongoose ODM

Database Schema : You can see the models directory for user and tasks.

API endpoints :
These are the API endpoints used 
base url:localhost:5000/api

POST /auth/register
POST /auth/login
POST /tasks
GET /tasks
GET /tasks/filter (with optional query params: status, title)
PUT /tasks/:id
DELETE /tasks/:id

Setup and run instructions:
install dependencies npm install
ensure env file has the URL for backend VITE_API_BASE_URL=http://localhost:5000/api
start dev server npm run dev
open the url shown in the server http://localhost:5173

Your planning and execution approach:
Understand requirement precisely first (expected behavior, API vs client-side, UI wording).
Inspect only relevant files quickly (Pages, components, api) using targeted search.
Verify by re-reading changed files and searching for old logic.
Report exactly what changed, where, and what was not executed.

Any assumptions or design decisions you made:
Assumed title search should be client-side only (filter already-loaded tasks) based on your latest direction.
Preserved list order while filtering.