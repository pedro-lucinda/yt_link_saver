from fastapi import Depends
from sqlalchemy.orm import Session

from app.infra.db.database import get_db

from .repository import LinkRepository


def get_link_repository(db: Session = Depends(get_db)) -> LinkRepository:
    """
    Dependency that provides a LinkRepository instance.

    This function is used with FastAPI's dependency injection system to get a LinkRepository instance initialized with a database session.

    Parameters
    ----------
    db : Session
        The SQLAlchemy session dependency injected by FastAPI, used to perform
        database operations.

    Returns
    -------
    LinkRepository:
        An instance of LinkRepository: initialized with the given database session.
    """
    return LinkRepository(db)
