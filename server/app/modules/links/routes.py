from fastapi import APIRouter, HTTPException, Depends

from app.infra.logger.config import logger
from . import schemas
from .dependencies import get_link_repository
from .repository import LinkRepository

link_router = APIRouter(prefix="/links", tags=["Link"])


@link_router.get("/", response_model=list[schemas.Link])
def list_all(
    link_repository: LinkRepository = Depends(get_link_repository),
    skip: int = 0,
    limit: int = 100,
):
    """
    Retrieve a list of links, with pagination.
    """

    try:
        links = link_repository.get_links(skip=skip, limit=limit)
        logger.info("Links fetched successfully")
        return links
    except Exception as e:
        logger.error("Error fetching links")
        raise HTTPException(status_code=500, detail=str(e)) from e


@link_router.get("/{link_id}", response_model=schemas.Link)
def get_link_by_id(
    link_id: int,
    link_repository: LinkRepository = Depends(get_link_repository),
):
    """
    Retrieve a link by its ID.
    """

    try:
        link = link_repository.get_link(link_id)
        if link is None:
            raise HTTPException(status_code=404, detail="Link not found")
        return link
    except Exception as e:
        logger.error("Error fetching link")
        raise HTTPException(status_code=500, detail=str(e)) from e


@link_router.post("/", response_model=schemas.Link)
def create_link(
    link: schemas.LinkCreate,
    link_repository: LinkRepository = Depends(get_link_repository),
):
    """
    Create a new link.
    """

    try:
        return link_repository.create_link(link)
    except Exception as e:
        logger.error("Error creating link")
        raise HTTPException(status_code=500, detail=str(e)) from e


@link_router.delete("/{link_id}")
def delete_link(
    link_id: int,
    link_repository: LinkRepository = Depends(get_link_repository),
):
    """
    Delete a link by its ID.
    """

    try:
        link_repository.delete_link(link_id)
        return {"message": "Link deleted successfully"}
    except Exception as e:
        logger.error("Error deleting link")
        raise HTTPException(status_code=500, detail=str(e)) from e
