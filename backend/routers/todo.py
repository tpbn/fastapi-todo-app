from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas, crud
from ..database import SessionLocal

router = APIRouter(
    prefix="/todos",
    tags=["ToDos"]
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# create new task/todo
@router.post("/", response_model=schemas.ToDo)
def create_todo(todo: schemas.ToDoCreate, db: Session = Depends(get_db)):
    return crud.create_todo(db=db, todo=todo)

# Get all todos
@router.get("/", response_model=list[schemas.ToDo])
def read_todos(db: Session = Depends(get_db)):
    return crud.get_todos(db)

# Geet a single id
@router.get("/{todo_id}", response_model=schemas.ToDo)
def read_todo(todo_id: int, db: Session = Depends(get_db)):
    db_todo = crud.get_todo(db, todo_id)
    if db_todo is None:
        raise HTTPException(status_code=404, detail="ToDo not found")
    return db_todo

# Update
@router.put("/{todo_id}", response_model=schemas.ToDo)
def update(todo_id: int, todo: schemas.ToDoCreate, db: Session = Depends(get_db)):
    return crud.update_todo(db, todo_id, todo)

# Delete
@router.delete("/{todo_id}", response_model=schemas.ToDo)
def delete(todo_id: int, db: Session = Depends(get_db)):
    return crud.delete_todo(db, todo_id)

# filter
@router.get("/filter/", response_model=list[schemas.ToDo])
def filter_by_status(completed: bool, db: Session = Depends(get_db)):
    return db.query(models.ToDo).filter(models.ToDo.completed == completed).all()

