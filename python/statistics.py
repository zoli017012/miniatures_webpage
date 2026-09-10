import json
with open('db.json', 'r', encoding='utf-8') as f:
    figures = json.load(f)

commons = 0
uncommons = 0
rares = 0
very_rares = 0
quantity = 0

i = 0
for figure in figures:
    if figure['rarity'] == 'Common':
        commons += 1
    elif figure['rarity'] == 'Uncommon':
        uncommons += 1
    elif figure['rarity'] == 'Rare':
        rares += 1
    elif figure['rarity'] == 'Very Rare':
        very_rares += 1
    else:
        print(figure['name'])
    if figure['quantity'] > 0:
        quantity += figure['quantity']
    i += 1
print(i)

print(commons)
print(uncommons)
print(rares)
print(very_rares)

for figure in figures:
    count = 0
    for fig in figures:
        if fig['name'] == figure['name']:
            count += 1
    if count > 1:
        print(figure['name'])