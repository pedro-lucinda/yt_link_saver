from fastapi import APIRouter, HTTPException, Depends

from app.infra.logger.config import logger
from .dependencies import get_user_repository
from . import schemas
from .repository import UserRepository

user_router = APIRouter(prefix="/user", tags=["User"])


@user_router.get("/", response_model=list[schemas.User])
def list_users(
    user_repository: UserRepository = Depends(get_user_repository),
    skip: int = 0,
    limit: int = 100,
):
    """
    Retrieve a list of users, with pagination.

    Parameters
    ----------
    skip : int, optional
        The number of items to skip (default is 0).
    limit : int, optional
        The maximum number of items to return (default is 100).
    user_repository : UserRepository
        The user repository dependency.

    Returns
    -------
    list[schemas.User]
        A list of user objects.
    """
    try:
        users = user_repository.get_users(skip=skip, limit=limit)
        logger.info("Users fetched successfully")
        return users
    except Exception as e:
        logger.error("Error fetching users")
        raise HTTPException(status_code=500, detail=str(e)) from e


@user_router.get("/{user_id}", response_model=schemas.User)
def read_user(
    user_id: int,
    user_repository: UserRepository = Depends(get_user_repository),
):
    """
    Retrieve a user by their user ID.

    Parameters
    ----------
    user_id : int
        The ID of the user to retrieve.
    user_repository : UserRepository
        The user repository dependency.

    Returns
    -------
    schemas.User
        The requested user object.

    Raises
    ------
    HTTPException
        If no user with the given ID was found.
    """
    try:
        user = user_repository.get_user_by_id(user_id=user_id)
        if not user:
            logger.error("User not found")
            raise HTTPException(status_code=404, detail="User not found")
        return user
    except Exception as e:
        logger.error("Error fetching user %s", e)
        raise HTTPException(status_code=500, detail=str(e)) from e


@user_router.post("/", response_model=schemas.User)
def create_user(
    user: schemas.UserCreate, user_repository: UserRepository = Depends(get_user_repository)
):
    """
    Create a new user.

    Parameters
    ----------
    user : schemas.UserCreate
        The user data to create.
    user_repository : UserRepository
        The user repository dependency.

    Returns
    -------
    schemas.User
        The created user object.
    """
    try:
        user = user_repository.create_user(user=user)
        logger.info("User created successfully")
        return user
    except Exception as e:
        logger.error("Error creating user")
        raise HTTPException(status_code=500, detail=str(e)) from e
