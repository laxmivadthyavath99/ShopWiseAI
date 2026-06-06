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

soup = BeautifulSoup(driver.page_source, "html.parser")

count = 0

for link in soup.find_all("a", href=True):

    href = link.get("href")

    if "/p/" in href:

        print(href)

        count += 1

        if count == 5:
            break

driver.quit()