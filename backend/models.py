from sqlalchemy import Column, Integer, String, Boolean
from .database import Base  # make sure this points to your database.py

class ToDo(Base):
    __tablename__ = "todos"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    completed = Column(Boolean, default=False)
