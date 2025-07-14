from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(index=True, unique=True)
    hashed_password: str
    tasks: List["Task"] = Relationship(back_populates="owner")
    items: List["Item"] = Relationship(back_populates="owner")
    character: Optional["Character"] = Relationship(back_populates="owner")


class Task(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    current_count: int
    increment_step: int
    owner_id: Optional[int] = Field(default=None, foreign_key="user.id")
    owner: User = Relationship(back_populates="tasks")


class Item(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    slot: str
    owner_id: Optional[int] = Field(default=None, foreign_key="user.id")
    owner: User = Relationship(back_populates="items")


class Character(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    skin_tone: str
    hair_style: str
    hair_color: str
    eye_color: str
    build: str
    outfit: str
    clothes_color: str
    owner_id: Optional[int] = Field(default=None, foreign_key="user.id")
    owner: User = Relationship(back_populates="character")