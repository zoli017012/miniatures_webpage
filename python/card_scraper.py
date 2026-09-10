import requests
from bs4 import BeautifulSoup
import json
from urllib.parse import urljoin

class Figure:
    def __init__(self, name, set_name, img_url, skill_list):
        self.name = name
        self.img_url = img_url
        self.set_name = set_name
        self.skill_list = skill_list
figurak_listaja = []

base_url = 'https://www.rebelscum.com'
set_list = ['Alliance and Empire', 'Bounty Hunters', 'Champions of the Force', 'Clone Strike', 'Galaxy at War', 'Imperial Entanglements', 'Jedi Academy', 'Knights of the Old Republic', 'Legacy of the Force', 'Masters of the Force', 'Rebel Storm', 'Revenge of the Sith', 'The Clone Wars', 'Dark Times', 'The Force Unleashed', 'Universe']
card_1 = ['Rebel Storm', 'Clone Strike', 'Revenge of the Sith', 'Universe', 'Champions of the Force', 'The Force Unleashed', 'Legacy of the Force']

with requests.Session() as session:
        res = session.get(urljoin(base_url, '/swminis.asp'))
        soup = BeautifulSoup(res.content, 'html.parser')
        contents = soup.find_all('div', class_='pa_menu')

        for item in contents[0].find_all('li'):
            href = item.find('a').get('href')
            
            set_url = urljoin(base_url, href)
            set_name = item.text.strip()
            
            if set_name in set_list:
                set_res = session.get(set_url)
                set_soup = BeautifulSoup(set_res.content, 'html.parser')
                set_contents = set_soup.find_all('div', class_='pa_menu')
                print(f"Vizsgálat alatt: {set_name}")
                
                for figure in set_contents[0].find_all('li'):
                    try:
                        fig_href = figure.find('a').get('href')
                    except:
                        print('Valami hiba de leszarom xd')
                    
                    figure_url = urljoin(base_url, fig_href)
                    figure_name = figure.text.strip()

                    lis = session.get(figure_url)
                    lis_soup = BeautifulSoup(lis.content, 'html.parser')
                    lis_contents = lis_soup.find_all('li')
                    i = len(lis_contents)-1
                    skill_list = []
                    while i > 0 and not('FORUM' in str(lis_contents[i])):
                        skill_list.append((str(lis_contents[i])[4:len(lis_contents[i])-6]))
                        i-=1

                    figure_res = session.get(figure_url)
                    figure_soup = BeautifulSoup(figure_res.content, 'html.parser')
                    figure_contents = figure_soup.find_all('div', id='content-mainarea-pages')
                    try:
                        index = 1 if set_name in card_1 else 2
                        img_url = urljoin(base_url,figure_contents[0].find_all('a')[index].get('href'))

                        img = session.get(img_url)
                        img_soup = BeautifulSoup(img.content, 'html.parser')
                        img_contents = img_soup.find_all('img')
                        img_url = urljoin(base_url,img_contents[2].get('src'))

                                                                                                                                                             
                        
                        figurak_listaja.append(Figure(figure_name[3:], set_name, img_url, skill_list))
                    except:
                        print(f'Nem sikerült {figure_name} karakter kártyáját lekérni')
                    

with open("figurak_with_skillset.json", "w", encoding="utf-8") as f:
    json.dump(figurak_listaja, f, default=lambda obj: obj.__dict__, indent=4, ensure_ascii=False)
