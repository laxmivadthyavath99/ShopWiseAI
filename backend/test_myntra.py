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
    "https://www.myntra.com/lipstick"
)

time.sleep(8)

soup = BeautifulSoup(
    driver.page_source,
    "html.parser"
)

products = soup.select("li.product-base")

print("Products:", len(products))

driver.quit()