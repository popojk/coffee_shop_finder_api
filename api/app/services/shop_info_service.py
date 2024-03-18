from app.services.fetch_service import FetchService
from app.database.database import db_session_decorator
from app.urls.urls import *
from app.models.models import *

class ShopInfoService:

  def __init__(self):
    pass

  def create_new_shop(self, shop: dict):
    new_shop_data = shop
    new_shop_data['limited_time'] = new_shop_data['limited_time'] == 'yes' or new_shop_data['limited_time'] == 'maybe'
    new_shop_data['socket'] = new_shop_data['socket'] == 'yes' or new_shop_data['socket'] == 'maybe'
    new_shop_data['standing_desk'] = new_shop_data['standing_desk'] == 'yes' or new_shop_data['standing_desk'] == 'maybe'
    return new_shop_data


  @db_session_decorator
  def update_Shop_info_to_db(self, db=None):
    data = FetchService.get(ALL_SHOP_URL)
    try:
      if data != []:
        for shop in data:
          # check if id exists first
          db_shop = db.query(Shop).filter(Shop.id == shop['id']).first()
          # insert into db if id does not exists
          if db_shop is None:
            new_shop_data = self.create_new_shop(shop)
            new_shop = Shop(**new_shop_data)
            db.add(new_shop)
            db.commit()
            db.refresh(new_shop)
          else:
            print('Shop already exists!')
    except Exception as e:
      print(e)


