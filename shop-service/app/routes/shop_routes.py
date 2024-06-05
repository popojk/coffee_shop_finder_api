from app.routes.abstracts.abstract_routes import AbstractRoutes
from app.services.shop_info_service import ShopInfoService
from fastapi import Query


class ShopRoutes(AbstractRoutes):

    def __init__(self):
        self.shop_info_service = ShopInfoService()
        # register methods to fast api route here
        self.routes.add_api_route(
            '/api/shops', self.get_shops, methods=['GET']
        )
        self.routes.add_api_route(
            '/api/shops/detail', self.get_shop, methods=['GET']
        )
        self.routes.add_api_route(
            '/api/shops/fuzzy', self.fuzzy_get_shops, methods=['GET']
        )

    def get_shops(self,
                  page_number: int = Query(1, ge=1),
                  page_size: int = Query(50, ge=1, le=100),
                  city: str = Query(None, title="The city to search shops in"),
                  limited_time: bool = Query(
                      None, title="Whether shops have limited time offers"),
                  socket: bool = Query(None, title="Whether shops have socket")
                  ):
        search_criteria = {}
        if city is not None:
            search_criteria["city"] = city
        if limited_time is not None:
            search_criteria["limited_time"] = limited_time
        if socket is not None:
            search_criteria["socket"] = socket

        shops = self.shop_info_service.get_all_shops(
            page_number, page_size, search_criteria)
        return self.handle_response(shops)

    def get_shop(self, shop_id: str = Query(..., title="The ID of the shop to get")):
        shop = self.shop_info_service.get_shop_by_id(shop_id)
        return self.handle_response(shop)

    def fuzzy_get_shops(self,
                        keyWord: str = Query('',
                                             title="The key word of the shops to get"),
                        city: str = Query('', title="The city name"),
                        district: str = Query('', title="the district name"),
                        hasSocket: bool = Query(...,
                                                title="Get shops that has socket"),
                        hasWifi:  bool = Query(...,
                                               title="Get shops that has wifi"),
                        hasNoLimitedTime:  bool = Query(
                            ..., title="Get shops that has no limited time"),
                        page: int = Query(..., title="Enter page number"),
                        page_size: int = Query(..., title="Enter page size"),
                        ):
        shops = self.shop_info_service.fuzzy_get_shops(
            keyWord=keyWord, hasSocket=hasSocket, hasWifi=hasWifi, hasNoLimitedTime=hasNoLimitedTime, city=city, district=district, page=page, page_size=page_size)
        return self.handle_response(shops)
