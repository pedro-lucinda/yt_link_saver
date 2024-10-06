from typing import Optional

from pydantic import BaseModel


class LinkBase(BaseModel):
    url: str
    name: str

    class Config:
        from_attributes = True


class LinkCreate(BaseModel):
    url: str
    name: str


class Link(LinkBase):
    id: int

    class Config:
        from_attributes = True


class LinkUpdate(BaseModel):
    name: Optional[str] = None
    url: Optional[str] = None

    class Config:
        from_attributes = True
