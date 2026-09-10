import requests
from bs4 import BeautifulSoup
import json
from urllib.parse import urljoin

class Figure:
    def __init__(self, name, rarity, fig_img_url):
        self.name = name
        self.rarity = rarity
        self.fig_img_url = figure_img_url

base_url = 'https://www.minisgallery.com'
figura_lista = []

with requests.Session() as session:
    res = session.get(urljoin(base_url,'/index.php?id=star-wars-miniatures-core-sets'))
    soup = BeautifulSoup(res.content, 'html.parser')
    contents = soup.find_all('div', class_='tabsMenuContainerSingle')
    for item in contents[0].find_all('a'):
        set_url = urljoin(base_url,item.get('href'))

        set_res = session.get(set_url)
        set_soup = BeautifulSoup(set_res.content, 'html.parser')
        set_contents = set_soup.find_all('div', class_='galleryContainer')
        set_contents = set_contents[0].find_all('div', class_='miniboxStandard')
        for item in set_contents:
            figure_name = item.find('div', class_='miniName').text
            figure_rarity = item.find('div', class_='miniRarity').text
            figure_img_url = urljoin(base_url,item.find('div', class_='miniImage').find('a').get('href'))

            fig_img_res = session.get(figure_img_url)
            fig_img_soup = BeautifulSoup(fig_img_res.content, 'html.parser')
            contents = fig_img_soup.find_all('div', class_='imagesRightBox')
            figure_img_url = urljoin(base_url, contents[0].find('img').get('src'))

            figura_lista.append(Figure(figure_name, figure_rarity, figure_img_url))

with open("figurak.json", "w", encoding="utf-8") as f:
    json.dump(figura_lista, f, default=lambda obj: obj.__dict__, indent=4, ensure_ascii=False)