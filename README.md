##  Setup Instructions

###  Backend (FastAPI)

1. Clone the repository:
   ```bash
   git clone https://github.com/tpbn/fastapi-todo-app.git
   cd fastapi-todo-app/backend


## 🔗 Live Deployed Links

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
