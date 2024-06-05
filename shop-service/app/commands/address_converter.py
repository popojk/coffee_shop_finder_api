import re
from app.database.database import db_session_decorator
from app.models.models import *

city_district_pattern = re.compile(r'(.{2}[市縣])(.*?[區鄉鎮市])')


def extract_city_district(address):
    match = city_district_pattern.match(address)
    if match:
        return match.groups()
    else:
        return None, None


@db_session_decorator
def clean_address_in_db(db=None):
    shops = db.query(Shop).all()
    for shop in shops:
        city, district = extract_city_district(shop.address)
        print(f"城市: {city}, 區: {district}\n")
        shop.city = city
        shop.district = district
        db.commit()
