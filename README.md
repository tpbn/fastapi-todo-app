##  Setup Instructions

###  Backend (FastAPI)

- **Clone the repository:**
   ```bash
   git clone https://github.com/tpbn/fastapi-todo-app.git
   cd fastapi-todo-app/backend

Great catch! You're right — GitHub renders Markdown with a clean, stylized layout like that when formatted properly. Here's your **Setup Instructions** in **GitHub-flavored Markdown** so it looks exactly like your screenshot:

---

###  Setup Instructions

###  Backend (FastAPI)

- **Clone the repository**  
  ```bash
  git clone https://github.com/tpbn/fastapi-todo-app.git
  cd fastapi-todo-app/backend
  ```

- **Create a virtual environment**  
  ```bash
  python -m venv venv
  source venv/bin/activate  # or venv\Scripts\activate on Windows
  ```

- **Install dependencies**  
  ```bash
  pip install -r requirements.txt
  ```

- **Create a `.env` file with your Neon DB URL**  
  ```
  DATABASE_URL=your_neon_connection_string_here
  ```

- **Run the backend server**  
  ```bash
  uvicorn main:app --reload
  ```

---

### Frontend (React)

- **Navigate to the frontend folder**  
  ```bash
  cd ../frontend
  ```

- **Install dependencies**  
  ```bash
  npm install
  ```

- **Set your backend API URL**  
  Open your component (e.g., `TodoList.js`) and update:
  ```js
  const API_URL = "https://your-backend.onrender.com/todos/";
  ```

- **Run the frontend app**  
  ```bash
  npm start
  ```

- **Optional: Build for production**  
  ```bash
  npm run build
  ```

---

##  Live Deployed Links

- **Frontend:** https://fastapi-frontend-ffks.onrender.com/  
- **Backend:** https://fastapi-backend-khqb.onrender.com/docs

---

## API Endpoints

RESTful API endpoints for managing the to-do list backend:

| Method  | Endpoint                  | Description             |
|---------|---------------------------|-------------------------|
| GET     | `/todos/`                 | Fetch all tasks         |
| POST    | `/todos/`                 | Create a new task       |
| PUT     | `/todos/{id}`            | Update a task by ID     |
| DELETE  | `/todos/{id}`            | Delete a task by ID     |

---

- **Base URL:** `https://fastapi-backend-khqb.onrender.com`
- **Request Payload:** For POST and PUT, send:  
  ```json
  {
    "title": "Task Name",
    "completed": false
  }
