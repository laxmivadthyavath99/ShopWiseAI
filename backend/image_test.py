from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
import time

driver = webdriver.Chrome(
    service=Service(
        ChromeDriverManager().install()
    )
)

driver.get("https://www.flipkart.com/search?q=iphone")

time.sleep(5)

cards = driver.find_elements(
    By.CSS_SELECTOR,
    "div[data-id]"
)

img = cards[0].find_element(
    By.TAG_NAME,
    "img"
)

print(img.get_attribute("src"))

input("Press Enter...")
driver.quit()