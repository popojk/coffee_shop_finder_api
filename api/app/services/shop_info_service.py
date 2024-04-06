from app.services.fetch_service import FetchService
from app.database.database import db_session_decorator
from app.urls.urls import *
from app.errors.errors import *
from app.models.models import *

from sqlalchemy import and_

from fastapi import HTTPException, status
import json


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
    def get_all_shops(self, page_number: int, page_size: int, search_criteria: dict, db=None):
        try:
            # get page info first
            start_index = (page_number - 1) * page_size
            # query shops data by page info
            query = db.query(Shop)

            # make filter
            filters = []
            for key, value in search_criteria.items():
                filters.append(getattr(Shop, key) == value)
            if filters:
                query = query.filter(and_(*filters))

            shops = query.offset(start_index).limit(
                page_size).all()
            shops_dict = [shop.__dict__ for shop in shops]
            return shops_dict
        except Exception as e:
            print(e)

    @db_session_decorator
    def get_shop_by_id(self, shop_id: int, db=None):
        try:
            shop = db.query(Shop).filter(Shop.id == shop_id).first()
            if shop:
                return shop.__dict__
            else:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="shop_id does not exist"
                )
        except Exception as e:
            print(e)

    @db_session_decorator
    def update_Shop_info_to_db(self, db=None):
        data = FetchService.get(ALL_SHOP_URL)
        try:
            if data != []:
                for shop in data:
                    # check if id exists first
                    db_shop = db.query(Shop).filter(
                        Shop.id == shop['id']).first()
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
            raise HTTPException(e)

    def fuzzy_get_shops(self, fuzzy_string: str) -> list:
        # get the results from elasticsearch
        url = ELASTIC_SEARCH_URL + '/_search'
        query = {
            "query": {
                "multi_match": {
                    "query": fuzzy_string,
                    "fields": ["name", "address"]
                }
            },
            "_source": ["id", "name", "address"]
        }
        # turn query into JSON format
        query_json = json.dumps(query)
        headers = {'Content-Type': 'application/json'}
        # get data from elasticsearch
        response = FetchService.get(url, data=query_json, headers=headers)
        shops_data = []
        if response['hits']['hits'] != []:
            shops_data = [
                {
                    "id": hit["_source"]["id"],
                    "name": hit["_source"]["name"],
                    "address": hit["_source"]["address"]
                }
                for hit in response.get('hits', {}).get('hits', [])
            ]
            return shops_data
        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                detail=SHOP_NOT_FOUND)
