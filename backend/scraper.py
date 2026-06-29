# from selenium import webdriver
# from selenium.webdriver.chrome.service import Service
# from webdriver_manager.chrome import ChromeDriverManager
# from selenium.webdriver.common.by import By
# import time
# import re


# def search_flipkart(keyword):
#     driver = webdriver.Chrome(
#         service=Service(
#             ChromeDriverManager().install()
#         )
#     )

#     driver.get(f"https://www.flipkart.com/search?q={keyword}")
#     time.sleep(5)

#     products = []

#     cards = driver.find_elements(By.CSS_SELECTOR, "div[data-id]")

#     # ACTUAL DATA FOR API
#     for card in cards[:10]:
#         try:
#             text = card.text
#             lines = text.split("\n")
#             name = lines[0].strip()

#             if len(name) < 3:
#                 continue

#             price_match = re.search(r"₹[\d,]+", text)
#             if price_match:
#                 price = (
#                     price_match.group()
#                     .replace("₹", "")
#                     .replace(",", "")
#                 )

#                 link = card.find_element(By.TAG_NAME, "a").get_attribute("href")
#                 image = card.find_element(By.TAG_NAME, "img").get_attribute("src")

#                 products.append({
#                     "name": name,
#                     "price": price,
#                     "platform": "Flipkart",
#                     "link": link,
#                     "image": image
#                 })

#         except:
#             pass

#     driver.quit()
#     return products
import requests
from bs4 import BeautifulSoup
import re
import os

SCRAPER_API_KEY = os.getenv("SCRAPER_API_KEY")

def search_flipkart(keyword):
    url = f"http://api.scraperapi.com?api_key={SCRAPER_API_KEY}&url=https://www.flipkart.com/search?q={keyword}"

    try:
        response = requests.get(url, timeout=60)
        soup = BeautifulSoup(response.text, "html.parser")
        products = []

        cards = soup.select("div[data-id]")

        for card in cards[:10]:
            try:
                name_tag = card.select_one("a.IRpwTa, a.s1Q9rs, div.KzDlHZ, div._4rR01T")
                price_tag = card.select_one("div._30jeq3")
                image_tag = card.select_one("img._396cs4, img.DByuf4")
                link_tag = card.select_one("a[href]")

                name = name_tag.text.strip() if name_tag else None
                if not name or len(name) < 3:
                    continue

                if not price_tag:
                    continue

                price = re.sub(r"\D", "", price_tag.text)
                href = ""
                if link_tag:
                    href = link_tag.get("href")
                    if href.startswith("/"):
                        href = "https://www.flipkart.com" + href

                products.append({
                    "name": name,
                    "price": price,
                    "platform": "Flipkart",
                    "link": href,
                    "image": image_tag.get("src") if image_tag else None
                })
            except:
                pass

        return products
    except Exception as e:
        print(f"Flipkart scraper error: {e}")
        return []