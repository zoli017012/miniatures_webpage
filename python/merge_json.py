import json
from urllib.parse import urljoin
import re
'''
class Figure:
    def __init__(self, id, name, set_name, rarity, figure_img, card_img, state, quantity):
        self.id = id
        self.name = name
        self.set_name = set_name
        self.rarity = rarity
        self.figure_img = figure_img
        self.card_img = card_img
        self.state = state
        self.quantity = quantity

figures_url = 'figures.json'
cards_url = 'cards.json'
figure_list = []
with open(figures_url, 'r', encoding='utf-8') as f:
    figures = json.load(f)
with open(cards_url, 'r', encoding='utf-8') as f:
    cards = json.load(f)
identifier = 0
for figure in figures:
    i = 0
    figure_name_alternative = figure['name'].replace(', ', ' (')
    figure_name_alternative += ')'
    while i < len(cards) and cards[i]['name'] != figure['name'] and figure_name_alternative != cards[i]['name']:
        i += 1
    if i < len(cards):
        figure_list.append(Figure(identifier, figure['name'], cards[i]['set_name'], figure['rarity'], urljoin('figure_images/',figure['fig_img_url'].split('/')[-1]), urljoin('card_images/',cards[i]['img_url'].split('/')[-1]), 'Missing', 0))
    else:
        figure_list.append(Figure(identifier, figure['name'], 'Nem ismert', figure['rarity'], urljoin('figure_images/',figure['fig_img_url'].split('/')[-1]), 'Nem elérhető', 'Missing', 0))
    identifier += 1

with open("merged_with_id.json", "w", encoding="utf-8") as f:
    json.dump(figure_list, f, default=lambda obj: obj.__dict__, indent=4, ensure_ascii=False)



import json
from urllib.parse import urljoin
import re

db_url = 'db.json'
skills_url = 'figurak_with_skillset.json'
with open(db_url, 'r', encoding='utf-8') as f:
    db = json.load(f)
with open(skills_url, 'r', encoding='utf-8') as f:
    skills = json.load(f)
szamlalo = 0
for figure in db:
    i = 0
    db_name = re.sub('\W+','', figure['name']).lower()
    while i < len(skills):
        skill_name = re.sub('\W+','', skills[i]['name']).lower()
        if db_name == skill_name:
            break
        else:
            i += 1
    if i < len(skills):
        figure['skill_set'] = skills[i]['skill_list']
        szamlalo += 1
    else:
        print(db_name+"-nél nem sikerült")
print(szamlalo)
with open("skill_db_newest.json", "w", encoding="utf-8") as f:
    json.dump(db, f, default=lambda obj: obj.__dict__, indent=4, ensure_ascii=False)



import json
with open('skill_db_newest_2.json', 'r', encoding='utf-8') as f:
    db = json.load(f)
for figure in db:
    figure['skill_set'] = [re.sub(r'[0-9+]', '', x).title().strip() for x in figure['skill_set']]

with open("skill_db_newest_3.json", "w", encoding="utf-8") as f:
    json.dump(db, f, default=lambda obj: obj.__dict__, indent=4, ensure_ascii=False)

import json
with open('skill_db_newest_3.json', 'r', encoding='utf-8') as f:
    db = json.load(f)

skills = set()
for figure in db:
    for s in figure['skill_set']:
        skills.add(s)

for skill in sorted(skills):
    print('"'+skill+'"', end=', ')
'''


import json
with open('skill_db_newest_3.json', 'r', encoding='utf-8') as f:
    db = json.load(f)
names = set()
for figure in db:
    name = figure['name']
    if name not in names:
        names.add(name)
    else:
        print(name)