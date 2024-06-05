from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Double
from sqlalchemy.orm import relationship, class_mapper

from app.database.database import Base


class Shop(Base):
    __tablename__ = "shops"

    id = Column(String, primary_key=True)
    name = Column(String, index=True)
    city = Column(String)
    district = Column(String)
    wifi = Column(Integer)
    seat = Column(Integer)
    quiet = Column(Integer)
    tasty = Column(Integer)
    cheap = Column(Integer)
    music = Column(Integer)
    url = Column(String)
    address = Column(String)
    latitude = Column(Double)
    longitude = Column(Double)
    limited_time = Column(Boolean)
    socket = Column(Boolean)
    standing_desk = Column(Boolean)
    mrt = Column(String, index=True)
    open_time = Column(String)

    def to_dict(self):
        return {column.name: getattr(self, column.name) for column in class_mapper(self.__class__).mapped_table.c}
