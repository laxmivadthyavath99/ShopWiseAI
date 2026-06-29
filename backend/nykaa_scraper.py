# from selenium import webdriver
# from selenium.webdriver.chrome.service import Service
# from webdriver_manager.chrome import ChromeDriverManager
# from bs4 import BeautifulSoup
# import time
# import re


# def scrape_nykaa(keyword):
#     driver = webdriver.Chrome(
#         service=Service(
#             ChromeDriverManager().install()
#         )
#     )

#     driver.get(f"https://www.nykaa.com/search/result/?q={keyword}")
#     time.sleep(8)

#     soup = BeautifulSoup(driver.page_source, "html.parser")
#     products = []

#     for link in soup.find_all("a", href=True):
#         href = link.get("href")

#         if "/p/" not in href:
#             continue

#         text = link.get_text(" ", strip=True)

#         if len(text) < 10:
#             continue

#         price_match = re.search(r"₹[\d,]+", text)
#         if not price_match:
#             continue

#         price = (
#             price_match.group()
#             .replace("₹", "")
#             .replace(",", "")
#         )

#         if href.startswith("/"):
#             href = "https://www.nykaa.com" + href

#         image = None
#         img = link.find("img")
#         if img:
#             image = img.get("src")

#         products.append({
#             "name": text.split("₹")[0].strip(),
#             "price": price,
#             "platform": "Nykaa",
#             "link": href,
#             "image": image
#         })

#         if len(products) == 10:
#             break

#     driver.quit()
#     return products

import requests
from bs4 import BeautifulSoup
import re
import os

SCRAPER_API_KEY = os.getenv("SCRAPER_API_KEY")

def scrape_nykaa(keyword):
    url = f"http://api.scraperapi.com?api_key={SCRAPER_API_KEY}&url=https://www.nykaa.com/search/result/?q={keyword}"

    try:
        response = requests.get(url, timeout=60)
        soup = BeautifulSoup(response.text, "html.parser")
        products = []

        for link in soup.find_all("a", href=True):
            href = link.get("href")

            if "/p/" not in href:
                continue

            text = link.get_text(" ", strip=True)
            if len(text) < 10:
                continue

            price_match = re.search(r"₹[\d,]+", text)
            if not price_match:
                continue

            price = price_match.group().replace("₹", "").replace(",", "")

            if href.startswith("/"):
                href = "https://www.nykaa.com" + href

            image = None
            img = link.find("img")
            if img:
                image = img.get("src")

            products.append({
                "name": text.split("₹")[0].strip(),
                "price": price,
                "platform": "Nykaa",
                "link": href,
                "image": image
            })

            if len(products) == 10:
                break

        return products
    except Exception as e:
        print(f"Nykaa scraper error: {e}")
        return []