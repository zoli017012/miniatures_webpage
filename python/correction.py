
import json

fajlnev = 'db.json'

with open(fajlnev, 'r', encoding='utf-8') as f:
    figures = json.load(f)

for figure in figures:
    counter = 0
    for fig2 in figures:
        if figure['card_img'] == fig2['card_img']:
            counter += 1
    if counter > 1:
        print(figure['name'])