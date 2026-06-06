from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import time
import re

def search_amazon(keyword):

    driver = webdriver.Chrome(
        service=Service(
            ChromeDriverManager().install()
        )
    )

    driver.get(
        f"https://www.amazon.in/s?k={keyword}"
    )

    time.sleep(8)

    soup = BeautifulSoup(
        driver.page_source,
        "html.parser"
    )

    products = []

    cards = soup.select(
        "div[data-component-type='s-search-result']"
    )

    for card in cards[:10]:

        try:

            title = card.select_one("h2 span")
            price = card.select_one(".a-price-whole")
            image = card.select_one("img")
            link = card.select_one("a[href]")

            if not (title and price):
                continue

            href = ""

            if link:
                href = link.get("href")

                if href.startswith("/"):
                    href = "https://www.amazon.in" + href

            products.append({
                "name": title.text.strip(),
                "price": re.sub(r"\D", "", price.text),
                "platform": "Amazon",
                "link": href,
                "image": image.get("src") if image else None
            })

        except:
            pass

    driver.quit()

    return products