from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session

from database import get_session
from models import Character, User
from schemas import CharacterUpdate
from .auth import get_current_username

router = APIRouter(prefix="/api/character", tags=["character"])

@router.post("/", response_model=CharacterUpdate)
async def update_character(data: CharacterUpdate, user: User = Depends(get_current_username), session: Session = Depends(get_session)):
    existing = session.exec(select(Character).where(Character.owner_id == user.id)).first()
    if existing:
        for key, val in data.dict().items(): setattr(existing, key, val)
        session.add(existing)
        session.commit()
        return existing
    new_char = Character(**data.dict(), owner_id=user.id)
    session.add(new_char)
    session.commit()
    session.refresh(new_char)
    return new_char