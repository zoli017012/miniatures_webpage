import os
import requests

# 1. Megadjuk a mappa nevét (lehet egy vagy akár több szintű is, pl. 'kepek/rebel')
mentesi_mappa = 'figure_images'

# 2. Létrehozzuk a mappát. 
# Az exist_ok=True a varázsszó: ha a mappa már létezik, nem fog hibát dobni a program.
os.makedirs(mentesi_mappa, exist_ok=True)

import json

fajlnev = 'merged_2.json'

with open(fajlnev, 'r', encoding='utf-8') as f:
    adatok = json.load(f)

for figura in adatok:
    aktualis_url = figura['figure_img']
    
    response = requests.get(aktualis_url)
    
    if response.status_code == 200:
        file_name = aktualis_url.split('/')[-1]
        teljes_utvonal = os.path.join(mentesi_mappa, file_name)
        with open(teljes_utvonal, 'wb') as f:
            f.write(response.content)