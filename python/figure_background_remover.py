import cv2
import numpy as np
import os
for file_path in os.listdir('failed_figures'):
    # 1. Kép betöltése
    img = cv2.imread("failed_figures//"+file_path)
    name = "failed_figures_done//"+file_path.split('.')[0]+".png"
    if img is None:
        print("Hiba a kép betöltésekor!")
        exit()

    img_bgra = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)

    also_hatar = np.array([230, 230, 230])
    felso_hatar = np.array([255, 255, 255])

    feher_maszk = cv2.inRange(img, also_hatar, felso_hatar)

    img_bgra[feher_maszk == 255, 3] = 0

    cv2.imwrite(name, img_bgra)
'''
img = cv2.imread("failed_figures\\elite-hoth-trooper-fu.jpg")
name = "failed_figures_done//elite-hoth-trooper-fu.png"


img_bgra = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)

also_hatar = np.array([230, 230, 230])
felso_hatar = np.array([255, 255, 255])

feher_maszk = cv2.inRange(img, also_hatar, felso_hatar)

img_bgra[feher_maszk == 255, 3] = 0

cv2.imwrite(name, img_bgra)
'''