from typing import Optional
from sqlmodel import SQLModel, Field


class UserCreate(SQLModel):
    username: str
    password: str


class UserRead(SQLModel):
    id: int
    username: str


class Token(SQLModel):
    access_token: str
    token_type: str = "bearer"


class TokenData(SQLModel):
    username: Optional[str] = None


class TaskCreate(SQLModel):
    name: str
    current_count: int
    increment_step: int


class TaskRead(TaskCreate):
    id: int
    owner_id: int


class ItemRead(SQLModel):
    id: int
    name: str
    slot: str


class CharacterUpdate(SQLModel):
    skin_tone: str
    hair_style: str
    hair_color: str
    eye_color: str
    build: str
    outfit: str
    clothes_color: str