import json
from google import genai
from pydantic import BaseModel

# 1. Kimeneti séma definiálása
class SquadMember(BaseModel):
    id: str
    name: str
    points: int
    role_in_team: str

class SquadRecommendation(BaseModel):
    team_name: str
    total_points: int
    strategy_summary: str
    squad: list[SquadMember]

client = genai.Client(api_key="AIzaSyCzR1UdNRwaKWV5sSZLxQQ7RIltADDGrww")

prompt = f"""
Itt van a rendelkezésre álló karakterek listája JSON formátumban:

FELADAT:
Állíts össze egy versenyképes 'Separatist' csapatot az alábbi szabályok szerint:
- A csapat összértéke legfeljebb 250 pont lehet.
- Legyen benne legalább egy Commander egység.
- Előnyben részesítendő képességek: 'Melee Attack' és 'Synchronized Fire'.
- Használd ki az egységek közötti szinergiákat.
"""

response = client.models.generate_content(
    model='gemini-3.6-flash',
    contents=prompt,
    config={
        'response_mime_type': 'application/json',
        'response_schema': SquadRecommendation,
    },
)

print(response.text)