from sqlalchemy.orm import Session
from . import models, schemas

# Create a new task
def create_todo(db: Session, todo: schemas.ToDoCreate):
    db_todo = models.ToDo(**todo.dict())
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo

# Get all task
def get_todos(db: Session):
    return db.query(models.ToDo).all()

# Get a single task/todo by ID
def get_todo(db: Session, todo_id: int):
    return db.query(models.ToDo).filter(models.ToDo.id == todo_id).first()

# Update
def update_todo(db: Session, todo_id: int, updated_todo: schemas.ToDoCreate):
    db_todo = get_todo(db, todo_id)
    if db_todo:
        db_todo.title = updated_todo.title
        db_todo.completed = updated_todo.completed
        db.commit()
        db.refresh(db_todo)
    return db_todo

# Delete
def delete_todo(db: Session, todo_id: int):
    db_todo = get_todo(db, todo_id)
    if db_todo:
        db.delete(db_todo)
        db.commit()
    return db_todo
