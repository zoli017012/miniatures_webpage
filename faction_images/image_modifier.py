import json
import cv2
import numpy as np

with open('merged_with_id_fraction.json', 'r', encoding='utf-8') as f:
    figures = json.load(f)

for figure in figures:
    try:
        # 1. Beolvasás (ez is a try-ban van, így ha nincs ilyen kulcs, egyből megy tovább)
        kep_utvonal = figure['figure_img']
        img = cv2.imread(kep_utvonal)

        # 2. Átalakítás (ha az img None volt, mert nem találta a képet, itt elszáll, de a try megfogja)
        img_bgra = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)

        # 3. Maszkolás
        also_hatar = np.array([235, 235, 235])
        felso_hatar = np.array([255, 255, 255])
        feher_maszk = cv2.inRange(img, also_hatar, felso_hatar)

        # 4. Alfa nullázása
        img_bgra[feher_maszk == 255, 3] = 0

        # 5. Fájlnév kinyerése és mentés (kettős idézőjelre cserélve kívül, hogy ne adjon szintaktikai hibát)
        fajlnev = kep_utvonal.split('/')[-1].split('.')[0]
        cv2.imwrite(f"modified_figures/{fajlnev}.png", img_bgra)

    except Exception:
        # Bármi hiba van, csendben ignorálja és jön a következő kép
        continue