from pydantic import BaseModel

class ToDoBase(BaseModel):
    title: str
    completed: bool = False

class ToDoCreate(ToDoBase):
    pass

class ToDo(ToDoBase):
    id: int

    class Config:
        from_attributes = True
