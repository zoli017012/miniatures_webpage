import os
import json

class Map:
    def __init__(self, name, url):
        self.name = name
        self.url = url
maps = []
for file in os.listdir('maps'):
    name = file.split('.')[0]
    url = "maps//"+file
    maps.append(Map(name, url))

with open("maps.json", "w", encoding="utf-8") as f:
    json.dump(maps, f, default=lambda obj: obj.__dict__, indent=4, ensure_ascii=False)