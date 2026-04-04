# ✅ To do List — Frontend

A clean and modern task management app built with React. Organize your tasks, track their progress, and stay productive.

🔗 **Live demo:** [to-do-list-frontend-gules.vercel.app](https://to-do-list-frontend-gules.vercel.app)  
🔗 **Backend repository:** [todolist-api](https://github.com/MikaDevv/ToDoListApi)

---

## 🚀 Features

- **Authentication** — Register and log in securely with JWT
- **Create tasks** — Add tasks with a title and description via modal
- **View tasks** — Tasks displayed as cards in a responsive grid
- **Edit tasks** — Inline editing directly inside the task modal
- **Delete tasks** — Remove tasks with a single click
- **Toggle status** — Mark tasks as completed or pending via checkbox
- **Filter tasks** — Sidebar filters for All, Completed, and Pending tasks
- **User info** — Logged-in user's name and email displayed in the sidebar
- **Logout** — Clears session and redirects to login

---

## 🛠️ Tech Stack

- **React** with Vite
- **React Router v6** for client-side routing
- **Axios** for HTTP requests
- **Tailwind CSS** for styling

---

## 📁 Project Structure

```
src/
├── pages/
│   ├── Login.jsx       # Login page
│   ├── Register.jsx    # Registration page
│   └── Tasks.jsx       # Main task management page
├── services/
│   └── api.js          # Axios instance with base URL
└── App.jsx             # Route configuration
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js 18+
- Backend API running (see [backend repo](https://github.com/your-username/todolist-api))

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/todolist-frontend.git
cd todolist-frontend

# Install dependencies
npm install

# Create environment file
echo "VITE_API_URL=http://localhost:8080" > .env

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 🔐 Authentication

The app uses JWT authentication. After login, the token is stored in `localStorage` and sent in the `Authorization` header on every protected request:

```
Authorization: Bearer <token>
```

---

## 🌐 Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Base URL of the backend API |

---

## 📦 Deployment

This frontend is deployed on **Vercel**. Every push to the main branch triggers an automatic deploy.
