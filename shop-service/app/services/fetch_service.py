import requests


class FetchService:

    def __init__(self, url: str):
        pass

    @staticmethod
    def get(url: str, data=None, headers=None):
        try:
            if data is not None and headers is not None:
                response = requests.get(url, data=data, headers=headers)
            else:
                response = requests.get(url)
            return response
        except Exception as e:
            print(e)
