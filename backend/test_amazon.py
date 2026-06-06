from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import time

driver = webdriver.Chrome(
    service=Service(
        ChromeDriverManager().install()
    )
)

driver.get(
    "https://www.amazon.in/s?k=lipstick"
)

time.sleep(8)

soup = BeautifulSoup(
    driver.page_source,
    "html.parser"
)

products = soup.select(
    "div[data-component-type='s-search-result']"
)
for product in products[:1]:
    link = product.select_one("a[href]")

if link:
    href = link.get("href")

    if href.startswith("/"):
        href = "https://www.amazon.in" + href

    print("Link:", href)
driver.quit()