from fastapi import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from .schemas import LinkCreate, LinkUpdate
from .models import Link

class LinkRepository:
    """
    Repository for performing database operations related to `Link` entity.
    """

    def __init__(self, db: Session) -> None:
        """
        Initializes the LinkRepository with the given database session.

        Parameters
        ----------
        db : Session
            The SQLAlchemy session to use for database operations.
        """
        self.db = db

    def get_link(self, link_id: int):
        """
        Fetches a link by its ID.

        Parameters
        ----------
        link_id : int
            The ID of the link to fetch.

        Returns
        -------
        Link
            The fetched link object, or None if not found.
        """
        return self.db.query(Link).filter(Link.id == link_id).first()

    def get_links(self, skip: int = 0, limit: int = 100):
        """
        Fetches a list of links, implementing pagination.

        Parameters
        ----------
        skip : int, optional
            The number of links to skip (default is 0).
        limit : int, optional
            The maximum number of links to return (default is 100).

        Returns
        -------
        list[Link]
            A list of link objects.
        """
        return self.db.query(Link).offset(skip).limit(limit).all()

    def create_link(self, link: LinkCreate):
        """
        Creates a new link in the database.

        Parameters
        ----------
        link : Link
            The link object to create.

        Returns
        -------
        Link
            The created link object.
        """
        try:
            db_link = Link(url=link.url, name=link.name)
            self.db.add(db_link)
            self.db.commit()
            self.db.refresh(db_link)
            return db_link
        except SQLAlchemyError as e:
            self.db.rollback()
            raise HTTPException(status_code=500, detail=str(e)) from e

    def update_link(self, link_id: int, link_update: LinkUpdate):
        """
        Updates an existing link in the database.

        Parameters
        ----------
        link_id : int
            The ID of the link to update.
        link : LinkUpdate
            The updated link object.

        Returns
        -------
        Link
            The updated link object.
        """
        db_link = self.get_link(link_id)
        if not db_link:
            raise HTTPException(status_code=404, detail="link not found")

        update_data = link_update.dict(exclude_unset=True)

        for key, value in update_data.items():
            setattr(db_link, key, value)

        self.db.commit()
        self.db.refresh(db_link)
        return db_link

    def delete_link(self, link_id: int):
        """
        Deletes a link from the database.

        Parameters
        ----------
        link_id : int
            The ID of the link to delete.
        """
        db_link = self.get_link(link_id)
        if not db_link:
            raise HTTPException(status_code=404, detail="Link not found")

        self.db.delete(db_link)
        self.db.commit()
        return db_link

    def get_link_by_name(self, name: str):
        """
        Fetches a link by its name.

        Parameters
        ----------
        name : str
            The name of the link to fetch.

        Returns
        -------
        Link
            The fetched link object, or None if not found.
        """
        return self.db.query(Link).filter(Link.name == name).first()

    def delete_all(self):
        """
        Deletes all links from the database.

        Returns
        -------
        None
        """
        self.db.query(Link).delete()
        self.db.commit()
