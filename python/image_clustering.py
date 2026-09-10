import json
import cv2
import numpy as np
from sklearn.cluster import KMeans
from matplotlib import pyplot as plt

url = 'merged_with_id.json'

templates = {
    'fringe' : cv2.imread('faction_images\\fringe.png', 0),
    'empire' : cv2.imread('faction_images\\empire.png', 0),
    'mandalorian' : cv2.imread('faction_images\\mandalorian.png', 0),
    'new_republic' : cv2.imread('faction_images\\new_republic.png', 0),
    'old_republic' : cv2.imread('faction_images\\old_republic.png', 0),
    'rebel' : cv2.imread('faction_images\\rebel.png', 0),
    'republic' : cv2.imread('faction_images\\republic.png', 0),
    'separatist' : cv2.imread('faction_images\\separatist.png', 0),
    'sith' : cv2.imread('faction_images\\sith.png', 0),
    'wong' : cv2.imread('faction_images\\wong.png', 0)
}

def find_best_template_multiscale(crop_img, templates, scale_range=(0.8, 1.2), steps=9):
    best_match_key = None
    best_score = -1.0

    # Létrehozzuk a skálázási tényezőket (pl. 0.8, 0.85, 0.9 ... 1.2)
    scales = np.linspace(scale_range[0], scale_range[1], steps)

    for key, template in templates.items():
        th, tw = template.shape[:2]

        for scale in scales:
            # Sablon átméretezése az aktuális skálára
            resized_w = int(tw * scale)
            resized_h = int(th * scale)
            
            # Elkerüljük, hogy a sablon nagyobb legyen, mint maga a kivágott kép
            if resized_h > crop_img.shape[0] or resized_w > crop_img.shape[1]:
                continue

            resized_template = cv2.resize(template, (resized_w, resized_h))

            # Illesztés
            res = cv2.matchTemplate(crop_img, resized_template, cv2.TM_CCOEFF_NORMED)
            _, max_val, _, _ = cv2.minMaxLoc(res)

            if max_val > best_score:
                best_score = max_val
                best_match_key = key

    return best_match_key, best_score

with open(url, 'r', encoding='utf-8') as f:
    cards = json.load(f)

for card in cards:
    img = cv2.imread(card['card_img'], 0)
    try:
        res, _ = find_best_template_multiscale(img, templates)
        card['fraction'] = res
    except:
        card['fraction'] = 'Nem ismert'



with open("merged_with_id_fraction.json", "w", encoding="utf-8") as f:
    json.dump(cards, f, default=lambda obj: obj.__dict__, indent=4, ensure_ascii=False)
