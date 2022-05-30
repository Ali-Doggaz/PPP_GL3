import os
from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.chrome.options import Options
import time
import autoit
import csv
from selenium.webdriver.common.keys import Keys
from .BOT import chromedriver

def load(data_path):
    data = dict()
    os.chdir(data_path)
    try: #If the file exists
        with open('Descriptions_File','r') as f:
            reader =csv.DictReader(f, delimiter=',')
            for row in reader:
                url = row['url']
                data[url] = row['description']
        f.close()
    except Exception: #if the file doesn't exit, return an empty dict
        return data

    return data

def save(Descriptions, path):  # Save the new added Descriptions
    '''
    :param dict(Descriptions), containing each picture's name and its corresponding caption :
    :return:
    stores the dict content in a .txt file
    '''

    os.chdir(path)
    with open('Descriptions_File.txt', 'w+') as f:
        f.write("url,description\n")
        mycsv = csv.writer(f)
        for url in Descriptions.keys():
            mycsv.writerow([url, Descriptions[url]])

def upload(username1,password1, ImagePath, description):
    mobile_emulation = {
        "deviceMetrics": { "width": 360, "height": 640, "pixelRatio": 3.0 },
        "userAgent": "Mozilla/5.0 (Linux; Android 7.0; SM-A310F Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.91 Mobile Safari/537.36" }
    chrome_options = Options()
    chrome_options.add_experimental_option("mobileEmulation", mobile_emulation)

    driver = webdriver.Chrome(chromedriver,chrome_options = chrome_options)

    #Login

    driver.get('https://www.instagram.com/accounts/login/')
    time.sleep(2)
    driver.find_element_by_name("username").send_keys(username1)
    driver.find_element_by_name("password").send_keys(password1)
    driver.find_element_by_xpath('/html/body/div[1]/section/main/div[1]/div/div/div[2]/form/div[1]/div[6]/button').click()
                                
    time.sleep(3)

    driver.get('https://www.instagram.com/' + username1)

    #upload
    ActionChains(driver).move_to_element( driver.find_element_by_xpath("""/html/body/div[1]/section/nav[2]/div/div/div/div/div/div[3]""")).click().perform()
    handle = "[CLASS:#32770; TITLE:Open]"
    autoit.win_wait(handle, 3)
    time.sleep(1)
    autoit.control_set_text(handle, "Edit1", ImagePath)
    autoit.control_click(handle, "Button1")

    time.sleep(2)

    driver.find_element_by_xpath("""//*[@id="react-root"]/section/div[1]/header/div/div[2]/button""").click()

    time.sleep(2)

    txt = driver.find_element_by_class_name('_472V_')
    txt.send_keys('')
    txt = driver.find_element_by_class_name('_472V_')

    txt.send_keys(description)
    txt.send_keys(Keys.ENTER)
    time.sleep(1)
    driver.find_element_by_xpath("""//*[@id="react-root"]/section/div[1]/header/div/div[2]/button""").click()
    time.sleep(5)
    #Remove the Uploaded picture
    os.remove(ImagePath)
    #Close Chrome
    driver.close()