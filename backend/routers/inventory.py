from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import List

from database import get_session
from models import Item, User
from schemas import ItemRead
from .auth import get_current_username

router = APIRouter(prefix="/api/inventory", tags=["inventory"])

router.get("/", response_model=List[ItemRead])
async def read_equipped(user: User = Depends(get_current_username), session: Session = Depends(get_session)):
    stmt = select(Item).where(Item.owner_id == user.id)
    return session.exec(stmt).all()

router.get("/items", response_model=List[ItemRead])
async def read_items(slot: str, user: User = Depends(get_current_username), session: Session = Depends(get_session)):
    stmt = select(Item).where(Item.slot == slot)
    return session.exec(stmt).all()

router.post("/equip")
async def equip(itemId: int, slot: str, user: User = Depends(get_current_username), session: Session = Depends(get_session)):
    item = session.get(Item, itemId)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    item.owner_id = user.id
    session.add(item)
    session.commit()
    return {"ok": True}