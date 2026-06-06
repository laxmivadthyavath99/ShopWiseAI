from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
import time


def search_flipkart(keyword):

    driver = webdriver.Chrome(
        service=Service(
            ChromeDriverManager().install()
        )
    )

    driver.get(
        f"https://www.flipkart.com/search?q={keyword}"
    )

    time.sleep(5)

    products = []

    cards = driver.find_elements(
        By.CSS_SELECTOR,
        "div[data-id]"
    )

    for card in cards[:10]:

        try:

            name = card.find_element(
                By.XPATH,
                ".//*[contains(text(),'Apple iPhone')]"
            ).text

            price = card.find_element(
                By.XPATH,
                ".//*[contains(text(),'₹')]"
            ).text

            products.append({
                "name": name,
                "price": price.replace("₹", "").replace(",", ""),
                "platform": "Flipkart"
            })

        except:
            pass

    driver.quit()

    return products