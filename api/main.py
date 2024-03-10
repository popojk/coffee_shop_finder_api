from app.services.fetch_service import FetchService

def update_coffee_shop_info_to_db():
  pass

if __name__ == '__main__':
  FetchService.get('https://cafenomad.tw/api/v1.2/cafes')