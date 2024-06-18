from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.shop_routes import ShopRoutes
from app.middlewares.exception import ExceptionHandlerMiddleware
from app.middlewares.timer import RequestProcessMiddleware

from dotenv import load_dotenv


class App():

    def __init__(self):
        self.the_api = FastAPI()

    def initialize(self):
        self.shop_routes = ShopRoutes()
        #  register routes into fast api
        self.the_api.include_router(self.shop_routes.routes)


the_app = App()
the_app.initialize()
the_app.the_api.add_middleware(CORSMiddleware, allow_origins=['*'])
the_app.the_api.add_middleware(ExceptionHandlerMiddleware)
the_app.the_api.add_middleware(RequestProcessMiddleware)
