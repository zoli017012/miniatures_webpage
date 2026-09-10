import json
from datetime import datetime
with open('skill_db_newest_3.json', 'r', encoding='utf-8') as f:
    db = json.load(f)


for figure in db:
    if figure['state'] == "Owned":
        figure['date_of_addition'] = datetime.today().strftime('%Y-%m-%d')
    else:
        figure['date_of_addition'] = "not_owned"

with open("db.json", "w", encoding="utf-8") as f:
    json.dump(db, f, default=lambda obj: obj.__dict__, indent=4, ensure_ascii=False)
