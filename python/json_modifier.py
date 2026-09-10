import json


with open('merged_with_id_fraction.json', 'r', encoding='utf-8') as f:
    figures = json.load(f)

for figure in figures:
    figure['figure_img']= figure['figure_img'].split('.')[0]+'.png'

with open("merged_with_id.json", "w", encoding="utf-8") as f:
    json.dump(figures, f, default=lambda obj: obj.__dict__, indent=4, ensure_ascii=False)