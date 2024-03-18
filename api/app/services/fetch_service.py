import requests

class FetchService:

  def __init__(self, url: str):
      pass

  @staticmethod
  def get(url: str):
    try:
      response = requests.get(url)
      if response.status_code == 200:
        data = response.json()
        return data
    except Exception as e:
      print(e)
