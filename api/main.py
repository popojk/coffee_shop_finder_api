from app.services.shop_info_service import ShopInfoService
from fastapi import FastAPI
from app.routes.shop_routes import ShopRoutes
from app.middlewares.exception import ExceptionHandlerMiddleware
from app.middlewares.timer import RequestProcessMiddleware

from apscheduler.schedulers.background import BackgroundScheduler

import uvicorn


class App():

    def __init__(self):
        self.the_api = FastAPI()

    def initialize(self):
        self.shop_routes = ShopRoutes()

        #  register routes into fast api
        self.the_api.include_router(self.shop_routes.routes)


the_app = App()
the_app.initialize()
the_app.the_api.add_middleware(ExceptionHandlerMiddleware)
the_app.the_api.add_middleware(RequestProcessMiddleware)

if __name__ == '__main__':
    shop_service = ShopInfoService()
    # update shop info once while application init
    # wait for api back to normal
    # shop_service.update_Shop_info_to_db()
    # scheduler = BackgroundScheduler()
    # scheduler.add_job(shop_service.update_shop_info, 'interval', hours=1)
    # scheduler.start()
    uvicorn.run("main:the_app.the_api", host='0.0.0.0', port=8100, reload=True)
