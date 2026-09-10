const port = 3001;
const API_URL = 'http://192.168.1.101:3001/cards';
const modalContent = document.getElementById('modalContent');
let chosenState = "Missing";
const modal = document.getElementById('myModal');
const sets = ['Összes','Alliance and Empire', 'Bounty Hunters', 'Champions of the Force', 'Clone Strike', 'Galaxy at War', 'Imperial Entanglements', 'Jedi Academy', 'Knights of the Old Republic', 'Legacy of the Force', 'Masters of the Force', 'Rebel Storm', 'Revenge of the Sith', 'The Clone Wars', 'Dark Times', 'The Force Unleashed', 'Universe']
let chosenSet = "Összes";
let chosenFraction = "Összes";
let chosenRarity = "Összes";
let chosenProfile = 'zoli';
let loggedIn = false;
let characters = []
const rarities = ["Összes", "Common", "Uncommon", "Rare", "Very Rare"]
const fractions = ["Összes", "rebel", "empire", "fringe", "old_republic", "sith", "republic", "separatist", "new_republic", "mandalorian", "wong",]
const container = document.getElementById('card-container');
const fractions_map = {
    "Összes" : "Összes",
    "Nem ismert" : "Nem ismert",
    "rebel" : "Rebel",
    "empire" : "Imperial",
    "fringe" : "Fringe",
    "old_republic" : "Old Republic",
    "sith" : "Sith",
    "separatist" : "Separatist",
    "new_republic" : "New Republic",
    "mandalorian" : "Mandalorian",
    "wong" : "Yuuzhan Vong",
    "republic" : "Republic"
}

const set_ids = {
    "Összes" : 1,
    "Masters of the Force" : 2,
    "Dark Times" : 3,
    "Galaxy at War" : 4,
    "Jedi Academy" : 5,
    "Imperial Entanglements" : 6,
    "The Clone Wars": 7,
    "Knights of the Old Republic" : 8,
    "Legacy of the Force" : 9,
    "The Force Unleashed" : 10,
    "Alliance and Empire" : 11,
    "Bounty Hunters" : 12,
    "Champions of the Force" : 13,
    "Universe" : 14,
    "Revenge of the Sith" : 15,
    "Clone Strike" : 16,
    "Rebel Storm" : 17
}

async function loadChars(){
    const response = await fetch(API_URL);
    characters = await response.json();
}

async function init(){
    await loadChars()
    await loadCardsByState("Missing", "Összes", "Összes", 115)
    await fillSideList()
    chosenProfile = sessionStorage.getItem('chosenProfile');
}

async function loadCard(card_to_be_loaded, onCardClick){
    const card = document.createElement('div')
    card.classList.add('card')
    
    const cardBg = document.createElement('img')
    cardBg.classList.add('card-bg')
    
    if (card_to_be_loaded.rarity == 'Common'){
        cardBg.src = 'figure_backgrounds/common.png' // Módosítsd, ha más a fájlnév!
    }
    else if(card_to_be_loaded.rarity == 'Uncommon'){
        cardBg.src = 'figure_backgrounds/uncommon.png'
    }
    else if(card_to_be_loaded.rarity == 'Rare'){
        cardBg.src = 'figure_backgrounds/rare.png'
    }
    else{
        cardBg.src = 'figure_backgrounds/veryrare.png'
    }
    
    
    card.appendChild(cardBg)

    const cardContent = document.createElement('div')
    cardContent.classList.add('card-content')

            // --- BAL FELSŐ SAROK: Kedvenc gomb ---
    const fav_button = document.createElement('button')
    fav_button.classList.add('fav-btn')
    fav_button.innerHTML = '⭐' // Itt használhatsz FontAwesome ikont is, pl. '<i class="fas fa-heart"></i>'
    fav_button.title = "Hozzáadás a kedvencekhez"
    fav_button.onclick = () => addCharToFavorites(card_to_be_loaded.id)
    cardContent.appendChild(fav_button)

            // --- JOBB FELSŐ SAROK: Pontszám ---
    const point = document.createElement('div')
    point.classList.add('point-badge')
    point.textContent = card_to_be_loaded.points
    cardContent.appendChild(point)

            // --- KÖZÉPSŐ TARTALOM: Név és Ritkaság ---
    const name = document.createElement('p')
    name.classList.add('char-name')
    name.textContent = card_to_be_loaded.name
    cardContent.appendChild(name)

    const rarity = document.createElement('p')
    rarity.classList.add('char-rarity')
    rarity.textContent = card_to_be_loaded.rarity
    cardContent.appendChild(rarity)

            // Link / Modal beállítása
    const a = document.createElement('a');
    a.href = '#';

            a.addEventListener('click', (e) => {
                e.preventDefault();
                onCardClick(card_to_be_loaded)
            });

            // Figura képe
    const img = document.createElement('img')
    img.src = card_to_be_loaded.figure_img
    img.classList.add('figure-img') // FONTOS: Megkapja a CSS osztályt!

    a.appendChild(img)
            
            // A linket (benne a képpel) a TARTALOMHOZ adjuk hozzá
    cardContent.appendChild(a)
    if (chosenState == "Owned"){
        const q = document.createElement('span')
        q.innerText = card_to_be_loaded.quantity
        q.classList.add('quantity-span')
        cardContent.appendChild(q)
    }
            

    const span = document.createElement('span')
    span.innerText = fractions_map[card_to_be_loaded.fraction]
    span.classList.add('faction-badge')
    // Span hozzáadása a TARTALOMHOZ
    cardContent.appendChild(span)

    // Végül: a kész tartalom dobozt hozzáadjuk a kártyához
    card.appendChild(cardContent)

    // Kártyát hozzáadjuk a konténerhez
    container.appendChild(card)
}

modal.addEventListener('click', (event) => {
    const rect = modal.getBoundingClientRect();
    const isClickOutside = 
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom;

    if (isClickOutside) {
        modal.close();
    }
})

function changeProfile(){
    const profile_text = document.querySelector('#profile_name')
    if (chosenProfile == 'zoli'){
        chosenProfile = 'attila'
        profile_text.innerText = 'attila'
    }
    else{
        chosenProfile = 'zoli'
        profile_text.innerText = 'zoli'
    }
}

async function changeStateOfFigure(figure_id, new_state, collection_name) {
  let new_quantity = 1
  let new_date = "not_owned"
  if (new_state == 'Missing' || new_state == 'Wanted'){
      new_quantity = 0
  }
  else{
      new_date = new Date().toLocaleDateString('en-CA');
  }
  await fetch(`http://192.168.1.101:3001/cards/${figure_id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      state: new_state,
      quantity : new_quantity,
      date_of_addition: new_date
    })
  });
  if(new_state == "Owned"){
    updateCollection(collection_name, true)
    updateCollectionAll(true)
  }
  else if (new_state == "Missing"){
    updateCollection(collection_name, false)
    updateCollectionAll(false)
  }
  
  modal.close();
  await loadChars()
  await loadCardsByState(chosenState, chosenFraction, chosenRarity)
}

async function updateCollectionAll(addition) {
    const response = await fetch(`http://192.168.1.101:3001/collections_data/1`);
    const data = await response.json();
    
    let newOwned;
    if (addition){
        newOwned = data.owned + 1;
    }
    else{
        newOwned = data.owned - 1;
    }

    await fetch(`http://192.168.1.101:3001/collections_data/1`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            owned: newOwned
        })
    });
    fillSideList()
}

async function updateCollection(collection, addition) {
    const id = set_ids[collection];

    // 1. Lekérjük az aktuális elemet, hogy megtudjuk a pontos 'owned' értéket
    const response = await fetch(`http://192.168.1.101:3001/collections_data/${id}`);
    const data = await response.json();
    
    // 2. Megnöveljük a lekért értéket 1-gyel
    let newOwned;
    if (addition){
        console.log("összeadás")
        newOwned = data.owned + 1;
    }
    else{
        console.log("kivonás")
        newOwned = data.owned - 1;
    }

    // 3. Elküldjük a frissítést a PATCH kéréssel
    await fetch(`http://192.168.1.101:3001/collections_data/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            owned: newOwned
        })
    });
    fillSideList()
}

async function changeQuantityAdd(buttonElement, figure_id) {
  // A gomb melletti input mező megkeresése
  const inputElement = buttonElement.parentElement.querySelector('.qty-input');
  
  let newQuantity = Number(inputElement.value) + 1;
  inputElement.value = newQuantity; // Képernyő frissítése

  // Szerver frissítése
  await fetch(`http://192.168.1.101:3001/cards/${figure_id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity: newQuantity })
  });
}

async function updateQuantityInput(inputElement, figure_id) {
  let newQuantity = Number(inputElement.value);

  // Megakadályozzuk a negatív számokat
  if (newQuantity < 0 || isNaN(newQuantity)) {
    newQuantity = 0;
    inputElement.value = 0;
  }

  // Szerver frissítése a kézzel beírt számmal
  await fetch(`http://192.168.1.101:3001/cards/${figure_id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity: newQuantity })
  });
}

async function changeQuantitySubtract(buttonElement, figure_id) {
  // A gomb melletti input mező megkeresése
  const inputElement = buttonElement.parentElement.querySelector('.qty-input');
  
  let newQuantity = Number(inputElement.value) - 1;
  inputElement.value = newQuantity; // Képernyő frissítése

  // Szerver frissítése
  await fetch(`http://192.168.1.101:3001/cards/${figure_id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity: newQuantity })
  });
}

async function loadCardsByState(state, fraction, rarity) {
    chosenState = state

    container.innerHTML = '';
    
    for(let i = 0; i < characters.length; i++){
        card_to_be_loaded = characters[i]
        if (card_to_be_loaded.state == state && (card_to_be_loaded.set_name == chosenSet || chosenSet == 'Összes') && (card_to_be_loaded.fraction == chosenFraction || chosenFraction == 'Összes') && (card_to_be_loaded.rarity == chosenRarity || chosenRarity == "Összes") || chosenState == "All") {
            
            loadCard(card_to_be_loaded, (card_info) => {
                if (chosenState == 'Owned'){
                    modalContent.innerHTML = `
                        <div class="modal-card">
                            <img src="${card_info.card_img}" alt="${card_info.name}" class="card-img">
                            
                            <div class="card-controls">
                                <!-- Állapot választó -->
                                <div class="control-group">
                                    <label>Állapot:</label>
                                    <select class="state-select" onchange="changeStateOfFigure('${card_info.id}', this.value, '${card_info.set_name}')">
                                        <option value="" selected disabled hidden>Válassz állapotot...</option>
                                        <option value="Missing" ${card_info.state === 'Missing' ? 'selected' : ''}>Hiányzik</option>
                                        <option value="Owned" ${card_info.state === 'Owned' ? 'selected' : ''}>Megvan</option>
                                        <option value="Wanted" ${card_info.state === 'Wanted' ? 'selected' : ''}>Kell</option>
                                    </select>
                                </div>

                                <!-- Mennyiség beállító -->
                                <div class="control-group">
                                    <label>Mennyiség:</label>
                                    <div class="quantity-control">
                                        <button class="qty-btn" onclick="changeQuantitySubtract(this, '${card_info.id}')">-</button>
                                        <input type="number" 
                                            class="qty-input" 
                                            value="${card_info.quantity || 0}" 
                                            min="0" 
                                            onchange="updateQuantityInput(this, '${card_info.id}')">
                                        <button class="qty-btn" onclick="changeQuantityAdd(this, '${card_info.id}')">+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                }
                else if(chosenState == "Missing" || chosenState == "Wanted"){
                    modalContent.innerHTML = `
                        <div class="modal-card">
                            <img src="${card_info.card_img}" alt="${card_info.name}" class="card-img">
                            
                            <div class="card-controls">
                                <!-- Állapot választó -->
                                <div class="control-group">
                                    <label>Állapot:</label>
                                    <select class="state-select" onchange="changeStateOfFigure('${card_info.id}', this.value, '${card_info.set_name}')">
                                        <option value="" selected disabled hidden>Válassz állapotot...</option>
                                        <option value="Missing" ${card_info.state === 'Missing' ? 'selected' : ''}>Hiányzik</option>
                                        <option value="Owned" ${card_info.state === 'Owned' ? 'selected' : ''}>Megvan</option>
                                        <option value="Wanted" ${card_info.state === 'Wanted' ? 'selected' : ''}>Kell</option>
                                    </select>
                                </div>
                            </div>
                            <button onclick="keresesInditasa('${card_info.name}')" class="sw-btn">Karakter vásárlás</button>
                        </div>
                    `;
                }
                else{
                    modalContent.innerHTML = `
                        <div class="modal-card">
                            <img src="${card_info.card_img}" alt="${card_info.name}" class="card-img">
                            
                            <div class="card-controls">
                                <!-- Állapot választó -->
                                <div class="control-group">
                                    <label>Csapat:</label>
                                    <select class="state-select" id="char-to-team" onchange="addCharToTeam('${card_info.id}', this.value)">
                                        <option value="" selected disabled hidden>Válassz csapatot...</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    `;
                }
                modal.showModal();
                })
            
        }
    }
}

async function loadFavoriteCards() {
    const response = await fetch(`http://192.168.1.101:3001/favorites/${chosenProfile}`);
    const datas = await response.json();
    const favorite_card_ids = datas.favorite_cards;
        
    container.innerHTML = '';
    
    for(let i = 0; i < favorite_card_ids.length; i++){
        card_to_be_loaded = characters.find(x => x.id == favorite_card_ids[i])
        if ((card_to_be_loaded.set_name == chosenSet || chosenSet == 'Összes') && (card_to_be_loaded.fraction == chosenFraction || chosenFraction == 'Összes') && (card_to_be_loaded.rarity == chosenRarity || chosenRarity == "Összes") || chosenState == "All") {
            loadCard(card_to_be_loaded, (card_info) => {
                modalContent.innerHTML = `
                        <div class="modal-card">
                            <img src="${card_info.card_img}" alt="${card_info.name}" class="card-img">
                        </div>
                    `;
                modal.showModal();
                })
        }
        
    }
}

async function removeCharFromFavorites(id){
    const response = await fetch(`http://192.168.1.101:3001/favorites/${chosenProfile}`);
    const datas = await response.json();
    const favorite_card_ids = datas.favorite_cards;
    const index = favorite_card_ids.indexOf(id)
    favorite_card_ids.splice(index,1)
    
    await fetch(`http://192.168.1.101:3001/favorites/${chosenProfile}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      favorite_cards: favorite_card_ids
    })
  });
  modal.close()
  loadFavoriteCards()
}

async function addCharToFavorites(id){
    const response = await fetch(`http://192.168.1.101:3001/favorites/${chosenProfile}`);
    const datas = await response.json();
    let favorite_card_ids = datas.favorite_cards;
    let deleted = false
    if(favorite_card_ids.includes(id)){
        const index = favorite_card_ids.indexOf(id)
        favorite_card_ids.splice(index,1)
        deleted = true
    }
    else{
        favorite_card_ids.push(id)   
    }
    
    
    await fetch(`http://192.168.1.101:3001/favorites/${chosenProfile}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      favorite_cards: favorite_card_ids
    })
  });
  if(deleted == true){
    loadFavoriteCards()
  }
}

function keresesInditasa(name) {
    const keresettSzo = name+" wotc sw miniatures";
            
    const url = `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(keresettSzo)}`;
            
    window.open(url, '_blank');
}

async function addCharToTeam(id, team_name) {
    
    console.log(id+" added to "+team_name)
    const team_response = await fetch('http://192.168.1.101:3001/teams');
    const team_data = await team_response.json();

    let chosenTeam = team_data.find(x => x.name == team_name)
    chosenTeam.members.push(id)
    
    await fetch(`http://192.168.1.101:3001/teams/${chosenTeam.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      members: chosenTeam.members,
    })
  });
}

async function fillSideList(){
    const response = await fetch(`http://192.168.1.101:3001/collections_data`);
    const collection_stats = await response.json();

    const set_list = document.querySelector('#set_list')
    const fraction_list = document.querySelector('#fraction_list')
    const rarity_list = document.querySelector('#rarity_list')

    set_list.innerHTML = ''
    fraction_list.innerHTML = ''

    // --- KIEGÉSZÍTŐK (SETS) ---
    for (let i = 0; i < sets.length; i++) {
        const element = document.createElement('li');
        
        // Ha a kategória megegyezik a jelenleg kiválasztottal, kapja meg az active osztályt generáláskor
        if (sets[i] === chosenSet) {
            element.classList.add('active');
        }

        const a = document.createElement('a')
        a.innerText = sets[i]+" ("+collection_stats[set_ids[sets[i]]-1].missing+"/"+collection_stats[set_ids[sets[i]]-1].owned+")"
        a.href = '#'
        
        element.addEventListener('click', (event) => {
            event.preventDefault(); // Megakadályozza, hogy a '#' miatt az oldal tetejére ugorjon a nézet
            
            // 1. Végigmegyünk az összes kiegészítő menüponton, és levesszük róluk az 'active' osztályt
            const allItems = set_list.querySelectorAll('li');
            allItems.forEach(item => item.classList.remove('active'));
            
            // 2. Ráadjuk az 'active' osztályt a kattintott elemre
            element.classList.add('active');

            // A te eredeti logikád
            chosenSet = sets[i]
            loadCardsByState(chosenState, chosenFraction, chosenRarity)
        })
        
        element.appendChild(a)
        set_list.appendChild(element)
    }

    // --- FRAKCIÓK (FRACTIONS) ---
    for (let i = 0; i < fractions.length; i++) {
        const element = document.createElement('li');
        
        // Ha a frakció megegyezik a jelenleg kiválasztottal, kapja meg az active osztályt generáláskor
        if (fractions[i] === chosenFraction) {
            element.classList.add('active');
        }

        const a = document.createElement('a')
        a.innerText = fractions_map[fractions[i]]
        a.href = '#'
        
        element.addEventListener('click', (event) => {
            event.preventDefault(); // Megakadályozza az ugrálást
            
            // 1. Végigmegyünk az összes frakció menüponton, és levesszük róluk az 'active' osztályt
            const allItems = fraction_list.querySelectorAll('li');
            allItems.forEach(item => item.classList.remove('active'));
            
            // 2. Ráadjuk az 'active' osztályt a kattintott elemre
            element.classList.add('active');

            // A te eredeti logikád
            chosenFraction = fractions[i]
            loadCardsByState(chosenState, chosenFraction, chosenRarity)
        })
        
        element.appendChild(a)
        fraction_list.appendChild(element)
    }
    // --- FRAKCIÓK (FRACTIONS) ---
    for (let i = 0; i < rarities.length; i++) {
        const element = document.createElement('li');
        // Ha a frakció megegyezik a jelenleg kiválasztottal, kapja meg az active osztályt generáláskor
        if (rarities[i] === chosenRarity) {
            element.classList.add('active');
        }

        const a = document.createElement('a')
        a.innerText = rarities[i]
        a.href = '#'
        
        element.addEventListener('click', (event) => {
            event.preventDefault(); // Megakadályozza az ugrálást
            
            // 1. Végigmegyünk az összes frakció menüponton, és levesszük róluk az 'active' osztályt
            const allItems = rarity_list.querySelectorAll('li');
            allItems.forEach(item => item.classList.remove('active'));
            
            // 2. Ráadjuk az 'active' osztályt a kattintott elemre
            element.classList.add('active');

            // A te eredeti logikád
            chosenRarity = rarities[i]
            loadCardsByState(chosenState, chosenFraction, chosenRarity)
        })
        
        element.appendChild(a)
        rarity_list.appendChild(element)
    }

}

function filterCards() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const cardName = card.querySelector('p').textContent.toLowerCase();
        if (cardName.includes(searchValue)) {
            console.log(cardName)
            card.style.display = "grid";
        } else {
            card.style.display = "none";
        }
    });
}

function chooseProfileAttila(){
    sessionStorage.setItem('chosenProfile', 'attila');
    sessionStorage.setItem('loggedIn', 'true');
}
function chooseProfileZoli(){
    sessionStorage.setItem('chosenProfile', 'zoli');
    sessionStorage.setItem('loggedIn', 'true');
}


document.addEventListener('DOMContentLoaded', () => {
    // Adatok kiolvasása
    const savedProfile = sessionStorage.getItem('chosenProfile');
    const isLoggedIn = sessionStorage.getItem('loggedIn') === 'true';
});

function sortCharsByDateDesc() {
    characters.sort((a, b) => {
        if (a.date_of_addition === "not_owned") return 1;
        if (b.date_of_addition === "not_owned") return -1;
        
        return b.date_of_addition.localeCompare(a.date_of_addition);
    });
    
    loadCardsByState(chosenState, chosenFraction, chosenRarity);
}

function sortCharsByDateAsc() {
    characters.sort((a, b) => {
        if (a.date_of_addition === "not_owned") return 1;
        if (b.date_of_addition === "not_owned") return -1;
        
        return a.date_of_addition.localeCompare(b.date_of_addition);
    });
    console.log(characters)
    loadCardsByState(chosenState, chosenFraction, chosenRarity);
}

function applyOrdering(value){
    if(value == "score-asc"){
        sortCharsByPointAsc()
    }
    else if(value == "score-desc"){
        sortCharsByPointDesc()
    }
    else if(value == "date-asc"){
        sortCharsByDateAsc()
    }
    else if(value == "date-desc"){
        sortCharsByDateDesc()
    }
}



