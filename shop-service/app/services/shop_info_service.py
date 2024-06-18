from app.services.fetch_service import FetchService
from app.database.database import db_session_decorator
from app.errors.errors import *
from app.models.models import *

from sqlalchemy import and_

from fastapi import HTTPException, status
import json
import redis
import os
import requests


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
    def get_shop_by_id(self, shop_id: str, db=None):
        try:
            # get shop info first
            shop = db.query(Shop).filter(Shop.id == shop_id).first()

            if not shop:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="shop_id does not exist"
                )

            # get shop reviews from reviewservice
            review_service_domain = os.environ.get('REVIEW_SERVICE_DOMAIN')
            auth_service_domain = os.environ.get('AUTH_SERVICE_DOMAIN')

            review_service_url = f'http://{review_service_domain}/api/reviews?shopId={shop.id}&page=1&pageSize=10'
            response = FetchService.get(url=review_service_url)
            reviews = response.json()['data']
            shop_dict = shop.__dict__
            if response.status_code == 202 and reviews is not None:
                # loop over reviews and get user info
                for review in reviews:
                    userId = review['userId']
                    auth_service_url = f'http://{auth_service_domain}/api/users/detail?id={userId}'
                    response = FetchService.get(url=auth_service_url)
                    review['username'] = response.json(
                    )['username'] if response.status_code == 200 else ''
                    review['avatar'] = response.json(
                    )['avatar'] if response.status_code == 200 else ''
                # overwrite shop_dict
                shop_dict['reviews'] = reviews
            else:
                shop_dict['reviews'] = []
            return shop_dict
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

    def fuzzy_get_shops(self,
                        keyWord: str,
                        city: str,
                        district: list,
                        hasSocket: bool,
                        hasWifi: bool,
                        hasNoLimitedTime: bool,
                        page: int = 1,
                        page_size: int = 10
                        ) -> list:
        # calculate index
        start_index = (page - 1) * page_size
        # get the results from elasticsearch
        ELASTICSEARCH_URL = os.environ.get('ELASTICSEARCH_URL', None)
        if ELASTICSEARCH_URL is None:
            raise HTTPException('ELASTICSEARCH_URL was not set in env file')
        url = ELASTICSEARCH_URL + '/_search'
        query = {
            "query": {
                "bool": {
                    "must": [],
                    "filter": []
                }
            },
            "_source": ["id", "name", "address", "rating", "wifi", "socket", "limited_time"],
            "sort": [
                {"_score": {"order": "desc"}},
                {"rating": {"order": "desc"}},
            ],
            "from": start_index,
            "size": page_size
        }

        if keyWord == '':
            query["query"]["bool"]["must"].append(
                {
                    "match_all": {}
                })
        else:
            query["query"]["bool"]["must"].append(
                {
                    "multi_match": {
                        "query": keyWord,
                        "fields": ["name^2", "address^1"]
                    }
                })
        if city != '':
            query["query"]["bool"]["filter"].append(
                {"term": {"city": city}})
        if district != ['']:
            query["query"]["bool"]["filter"].append(
                {"terms": {"district": district}})
        if hasSocket:
            query["query"]["bool"]["filter"].append(
                {"match": {"socket": True}})

        if hasWifi:
            query["query"]["bool"]["filter"].append(
                {"range": {"wifi": {"gt": 0}}})

        if hasNoLimitedTime:
            query["query"]["bool"]["filter"].append(
                {"match": {"limited_time": False}})

        # turn query into JSON format
        query_json = json.dumps(query)
        headers = {'Content-Type': 'application/json'}
        # get data from elasticsearch
        response = FetchService.get(
            url, data=query_json, headers=headers).json()

        shops_data = []
        if response['hits']['hits'] != []:
            shops_data = [
                {
                    "id": hit["_source"]["id"],
                    "name": hit["_source"]["name"],
                    "address": hit["_source"]["address"],
                    "rating": hit["_source"]["rating"],
                    "hasWifi": True if hit["_source"]["wifi"] != 0 else False,
                    "hasSocket": hit["_source"]["socket"],
                    "hasNolimitedTime": not hit["_source"]["limited_time"],
                }
                for hit in response.get('hits', {}).get('hits', [])
            ]
            return shops_data
        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                detail=SHOP_NOT_FOUND)
