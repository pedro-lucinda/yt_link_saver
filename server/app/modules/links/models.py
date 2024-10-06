from sqlalchemy import Column, Integer, String

from app.infra.db.shared.models import TimeStampModel


class LinkBase(TimeStampModel):
    __abstract__ = True

    id = Column(Integer, primary_key=True)


class Link(LinkBase):
    __tablename__ = "link"

    name = Column(String, index=True, nullable=False)
    url = Column(String, nullable=False)
