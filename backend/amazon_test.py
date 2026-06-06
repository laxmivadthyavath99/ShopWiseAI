from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time

driver = webdriver.Chrome(
    service=Service(
        ChromeDriverManager().install()
    )
)

driver.get(
    "https://www.amazon.in/s?k=iphone"
)

time.sleep(8)

print(driver.title)

input("Press Enter...")
driver.quit()