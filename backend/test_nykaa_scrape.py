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
    "https://www.nykaa.com/search/result/?q=lipstick"
)

time.sleep(8)

soup = BeautifulSoup(
    driver.page_source,
    "html.parser"
)

for img in soup.find_all("img"):

    src = str(img)

    if "product" in src.lower():
        print(src[:500])
        print("\n----------------\n")
        break

driver.quit()