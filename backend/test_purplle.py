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
    "https://www.purplle.com/search?text=lipstick"
)

time.sleep(15)

soup = BeautifulSoup(
    driver.page_source,
    "html.parser"
)

print("Links:", len(soup.find_all("a")))

for link in soup.find_all("a", href=True)[:30]:
    print(link["href"])

driver.quit()