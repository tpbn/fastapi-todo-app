import { useState, useEffect } from "react";
import "./App.css";

const API_URL = "https://fastapi-backend-khqb.onrender.com/todos/";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const addTask = async () => {
    if (task.trim() === "") return;
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: task,
          completed: false
        })
      });
      const newTask = await res.json();
      setTasks([...tasks, newTask]);
      setTask("");
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  const removeTask = async (id) => {
    try {
      await fetch(`${API_URL}${id}`, { method: "DELETE" });
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const toggleComplete = async (taskObj) => {
    try {
      const res = await fetch(`${API_URL}${taskObj.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: taskObj.title,
          completed: !taskObj.completed
        })
      });
      const updatedTask = await res.json();
      setTasks(tasks.map((t) => (t.id === taskObj.id ? updatedTask : t)));
    } catch (error) {
      console.error("Failed to toggle task:", error);
    }
  };

  const startEditing = (index) => {
    setEditIndex(index);
    setEditText(tasks[index].title);
  };

  const saveEdit = async (taskObj, index) => {
    try {
      const res = await fetch(`${API_URL}${taskObj.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: editText,
          completed: taskObj.completed
        })
      });
      const updatedTask = await res.json();
      const updatedTasks = [...tasks];
      updatedTasks[index] = updatedTask;
      setTasks(updatedTasks);
      setEditIndex(null);
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true;
  });

  return (
    <div className={`app-container ${darkMode ? "dark-mode" : ""}`}>
      <h2 className="title">To-Do List</h2>
      <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>

      <div className="task-input">
        <input
          type="text"
          placeholder="Add a new task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button className="add-btn" onClick={addTask}>Add</button>
      </div>

      <div className="filter-buttons">
        <button className={`filter-btn ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>All</button>
        <button className={`filter-btn ${filter === "completed" ? "active" : ""}`} onClick={() => setFilter("completed")}>Completed</button>
        <button className={`filter-btn ${filter === "pending" ? "active" : ""}`} onClick={() => setFilter("pending")}>Pending</button>
      </div>

      <ul className="task-list">
        {filteredTasks.map((t, index) => (
          <li key={t.id} className={`task-item ${t.completed ? "task-completed" : ""}`}>
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleComplete(t)}
              className="task-checkbox"
            />
            {editIndex === index ? (
              <div className="edit-container">
                <input
                  type="text"
                  className="edit-input"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button className="save-btn" onClick={() => saveEdit(t, index)}>Save</button>
              </div>
            ) : (
              <span className="task-text">{t.title}</span>
            )}
            <div className="task-actions">
              <button className="edit-btn" onClick={() => startEditing(index)}>Edit</button>
              <button className="delete-btn" onClick={() => removeTask(t.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
