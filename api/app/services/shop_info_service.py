from app.services.fetch_service import FetchService
from app.database.database import db_session_decorator
from app.urls.urls import *

class ShopInfoService:

  def __init__(self):
    pass

  @db_session_decorator
  def update_Shop_info_to_db(self, db=None):
    data = FetchService.get(ALL_SHOP_URL)

    if data != []:
      for shop in data:
        # check if id exists first


        # insert into db if id does not exists

