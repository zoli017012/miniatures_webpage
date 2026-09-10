import cv2
import pytesseract
from matplotlib import pyplot as plt

import json

skills = ['Force']

with open('db.json', 'r', encoding='utf-8') as f:
    cards = json.load(f)

for card in cards:
    pytesseract.pytesseract.tesseract_cmd = r'C:\\Program Files\\Tesseract-OCR\\tesseract.exe'
    try:
        if 'Commander Effect' in card['skill_set']:
            image_path = card['card_img']
            image = cv2.imread(image_path)
            image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

            extracted_text = pytesseract.image_to_string(image_rgb)

            commander_effect = extracted_text.split('Commander Effect')[1]
            for word in commander_effect.split(' '):
                if word in skills:
                    print(word)
    except:
        print('Nem sikerült')


with open("db_with_skills.json", "w", encoding="utf-8") as f:
    json.dump(cards, f, default=lambda obj: obj.__dict__, indent=4, ensure_ascii=False)
