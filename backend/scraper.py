from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
import time
import re


def search_flipkart(keyword):
    driver = webdriver.Chrome(
        service=Service(
            ChromeDriverManager().install()
        )
    )

    driver.get(f"https://www.flipkart.com/search?q={keyword}")
    time.sleep(5)

    products = []

    cards = driver.find_elements(By.CSS_SELECTOR, "div[data-id]")

    # ACTUAL DATA FOR API
    for card in cards[:10]:
        try:
            text = card.text
            lines = text.split("\n")
            name = lines[0].strip()

            if len(name) < 3:
                continue

            price_match = re.search(r"₹[\d,]+", text)
            if price_match:
                price = (
                    price_match.group()
                    .replace("₹", "")
                    .replace(",", "")
                )

                link = card.find_element(By.TAG_NAME, "a").get_attribute("href")
                image = card.find_element(By.TAG_NAME, "img").get_attribute("src")

                products.append({
                    "name": name,
                    "price": price,
                    "platform": "Flipkart",
                    "link": link,
                    "image": image
                })

        except:
            pass

    driver.quit()
    return products
