from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import List

from database import get_session
from models import Task, User
from schemas import TaskCreate, TaskRead
from .auth import get_current_username

router = APIRouter(prefix="/api/tasks", tags=["tasks"])


def get_current_user(username: str = Depends(get_current_username), session: Session = Depends(get_session)):
    stmt = select(User).where(User.username == username)
    user = session.exec(stmt).first()
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    return user


@router.get("/", response_model=List[TaskRead])
async def read_tasks(user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    stmt = select(Task).where(Task.owner_id == user.id)
    return session.exec(stmt).all()


@router.post("/", response_model=TaskRead)
async def create_task(task: TaskCreate, user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    db_task = Task(**task.dict(), owner_id=user.id)
    session.add(db_task)
    session.commit()
    session.refresh(db_task)
    return db_task


@router.put("/{task_id}", response_model=TaskRead)
async def update_task(task_id: int, task: TaskCreate, user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    db_task = session.get(Task, task_id)
    if not db_task or db_task.owner_id != user.id:
        raise HTTPException(status_code=404, detail="Task not found")
    for key, val in task.dict().items(): setattr(db_task, key, val)
    session.add(db_task)
    session.commit()
    session.refresh(db_task)
    return db_task


@router.delete("/{task_id}")
async def delete_task(task_id: int, user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    db_task = session.get(Task, task_id)
    if not db_task or db_task.owner_id != user.id:
        raise HTTPException(status_code=404, detail="Task not found")
    session.delete(db_task)
    session.commit()
    return {"ok": True}