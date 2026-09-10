import cv2
from matplotlib import pyplot as plt
import numpy as np
import json
from tensorflow import keras

model = keras.models.load_model('recognizer.keras')


with open('db.json', 'r', encoding='utf-8') as f:
    figures = json.load(f)
for figure in figures:
    try:
        file_path = figure['card_img']
        img = cv2.imread(file_path, 0)
        _, img = cv2.threshold(img,200,255,cv2.THRESH_BINARY_INV)
        img = cv2.medianBlur(img, 3)
        img = img[20:150, 400:]

        contours, _ = cv2.findContours(img, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)

        best_contour = None
        max_area = 0
        h_img, w_img = img.shape

            # 4. Végigiterálunk a megtalált kontúrokon
        for cnt in contours:
            x, y, w, h = cv2.boundingRect(cnt)
            area = cv2.contourArea(cnt)

                # Szűrési feltétel: az alakzat ne érjen hozzá a kép legszéléhez!
                # Hagyunk egy kis "margót" (pl. 5 pixel), ami kiszűri a szélén lévő zajokat.
            margin = 5
            if x > margin and y > margin and (x + w) < (w_img - margin) and (y + h) < (h_img - margin):
                    
                    # Keressük a legnagyobb területű belső alakzatot
                if area > max_area:
                    max_area = area
                    best_contour = cnt

            # 5. Ha találtunk megfelelő alakzatot, vágjuk ki (crop)
        if best_contour is not None:
            x, y, w, h = cv2.boundingRect(best_contour)
            cropped_img = img[y:y+h, x:x+w]

        kernel = np.ones((2,2), np.uint8)
        cropped_img = cv2.erode(cropped_img, kernel, iterations=1)


        contours, _ = cv2.findContours(cropped_img, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
        h_img, w_img = cropped_img.shape
        raw_boxes = []

        for cnt in contours:
            x, y, w, h = cv2.boundingRect(cnt)
                
                # A külső fehér sarkokat kizárjuk azzal, hogy nem érhetnek a kép széléhez
            margin = 1
            if x > margin and y > margin and (x + w) < (w_img - margin) and (y + h) < (h_img - margin):
                    
                    # Túl pici kontúrok (pl. apró zajok) kizárása
                if w * h > 10: 
                    raw_boxes.append((x, y, w, h))

        raw_boxes = sorted(raw_boxes, key=lambda b: b[2]*b[3], reverse=True)
        final_boxes = []


        for box in raw_boxes:
            x, y, w, h = box
            is_inside = False
                
            for f_box in final_boxes:
                fx, fy, fw, fh = f_box
                    # Ellenőrizzük, hogy a jelenlegi doboz teljesen benne van-e egy már elfogadott dobozban
                if x >= fx and y >= fy and (x + w) <= (fx + fw) and (y + h) <= (fy + fh):
                    is_inside = True
                    break
                
            if not is_inside:
                final_boxes.append(box)

        final_boxes = sorted(final_boxes, key=lambda b: b[0])
            
            # --- Eredmény vizualizációja ---
            # Színessé tesszük a képet, hogy látszódjon a színes keret
        result_img = cv2.cvtColor(cropped_img, cv2.COLOR_GRAY2BGR)

        points = ''
        for i, (x, y, w, h) in enumerate(final_boxes):
            cv2.rectangle(result_img, (x, y), (x+w, y+h), (255, 0, 0), 1)
            img_test = cropped_img[y:y+h, x:x+w]
            img_test = cv2.copyMakeBorder(img_test, 5, 5, 5, 5, cv2.BORDER_CONSTANT, value=(0, 0, 0))
            img_test = cv2.resize(img_test, (28,28))
            img_test = np.reshape(img_test, (1, 28,28))
            points += str(np.argmax(model.predict(img_test)))
        figure['points'] = points
    except:
        figure['points'] = ''
        print('Valami hiba vóóót')


with open("db.json", "w", encoding="utf-8") as f:
    json.dump(figures, f, default=lambda obj: obj.__dict__, indent=4, ensure_ascii=False)





