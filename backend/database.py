from sqlmodel import SQLModel, create_engine, Session

engine = create_engine(
    "sqlite:///./database.db", echo=True, connect_args={"check_same_thread": False}
)


def init_db():
    """Create database tables."""
    SQLModel.metadata.create_all(engine)


def get_session():
    """Provide a database session."""
    with Session(engine) as session:
        yield session