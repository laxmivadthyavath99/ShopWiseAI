# from selenium import webdriver
# from selenium.webdriver.chrome.service import Service
# from webdriver_manager.chrome import ChromeDriverManager
# from bs4 import BeautifulSoup
# import time
# import re

# def search_myntra(keyword):

#     driver = webdriver.Chrome(
#         service=Service(
#             ChromeDriverManager().install()
#         )
#     )

#     driver.get(
#         f"https://www.myntra.com/{keyword}"
#     )

#     time.sleep(8)

#     soup = BeautifulSoup(
#         driver.page_source,
#         "html.parser"
#     )

#     products = []

#     cards = soup.select("li.product-base")

#     for card in cards[:10]:

#         try:

#             brand = card.select_one("h3.product-brand")
#             name = card.select_one("h4.product-product")
#             price = card.select_one("span.product-discountedPrice")
#             link = card.select_one("a")
#             image = card.select_one("img")

#             if not (brand and name and price):
#                 continue

#             products.append({
#                 "name": f"{brand.text} {name.text}",
#                 "price": re.sub(r"\D", "", price.text),
#                 "platform": "Myntra",
#                 "link": "https://www.myntra.com/" + link["href"],
#                 "image": image.get("src") if image else None
#             })

#         except:
#             pass

#     driver.quit()

#     return products

import requests
from bs4 import BeautifulSoup
import re
import os

SCRAPER_API_KEY = os.getenv("SCRAPER_API_KEY")

def search_myntra(keyword):
    url = f"http://api.scraperapi.com?api_key={SCRAPER_API_KEY}&url=https://www.myntra.com/{keyword}"

    try:
        response = requests.get(url, timeout=60)
        soup = BeautifulSoup(response.text, "html.parser")
        products = []

        cards = soup.select("li.product-base")

        for card in cards[:10]:
            try:
                brand = card.select_one("h3.product-brand")
                name = card.select_one("h4.product-product")
                price = card.select_one("span.product-discountedPrice")
                link = card.select_one("a")
                image = card.select_one("img")

                if not (brand and name and price):
                    continue

                products.append({
                    "name": f"{brand.text} {name.text}",
                    "price": re.sub(r"\D", "", price.text),
                    "platform": "Myntra",
                    "link": "https://www.myntra.com/" + link["href"],
                    "image": image.get("src") if image else None
                })
            except:
                pass

        return products
    except Exception as e:
        print(f"Myntra scraper error: {e}")
        return []