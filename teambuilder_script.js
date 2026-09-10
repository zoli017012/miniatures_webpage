const API_URL = 'http://192.168.1.101:3001/cards';
const modalContent = document.getElementById('modalContent');
let chosenState = "Missing";
const modal = document.getElementById('myModal');
const sets = ['Összes','Alliance and Empire', 'Bounty Hunters', 'Champions of the Force', 'Clone Strike', 'Galaxy at War', 'Imperial Entanglements', 'Jedi Academy', 'Knights of the Old Republic', 'Legacy of the Force', 'Masters of the Force', 'Rebel Storm', 'Revenge of the Sith', 'The Clone Wars', 'Dark Times', 'The Force Unleashed', 'Universe']
let chosenSet = "Összes";
let chosenFraction = "Összes";
let chosenRarity = "Összes";
let chosenMaxPoint = 115
let chosenMinPoint = 0
let chosenTeamName = ''
const skills = ["Absorb Energy", "Absorb Minerals", "Accelerate", "Accurate Shot", "Advantageous Attack", "Advantageous Cover", "Affinity", "Aing-Tii Flow-Walking", "Alderaan Senator", "Ambush", "Anticipation", "Armored Spacesuit", "Artillerist", "Ataru Style", "Ataru Style Mastery", "Atlatl", "Augment Healing", "Avoid Defeat", "Battle Meditation", "Betrayal", "Black Sun", "Blast Cannon", "Blaster", "Blaster Barrage", "Blaster Rifle Upgrade", "Blaster Upgrade", "Bloodthirsty", "Bodyguard", "Bombad Gungan", "Booming Voice", "Bounty Hunter", "Bravado", "Breath Mask", "Careful Shot", "Cay'S Legacy", "Cesta", "Charging Assault", "Charging Fire", "Clamp", "Cleave", "Cloaked", "Close-Quarters Fighting", "Commander Effect", "Control Minds", "Cortosis Gauntlet", "Crack Gunner", "Crowd Fighting", "Cunning Attack", "Cyborg", "Damage Reduction", "Dark Armor", "Dark Force Spirit", "Dark Inspiration", "Dark Master", "Dark Temptation", "Deadeye", "Deadly Attack", "Deathstrike", "Deceptive", "Defensive Plates", "Dejarik", "Delta Fire Support", "Delta Shield Support", "Demolish", "Demolition Charge", "Density Projector", "Desert Skiff", "Destabilize Shields", "Diplomat", "Disintegration", "Dispassionate Killer","Disruptive", "Djem So Style", "Djem So Style Mastery", "Doctrine Of Fear", "Dominate", "Door Gimmick", "Double Attack", "Double Claw Attack", "Drain Life", "Drain Life Energy", "Draw Fire", "Droid", "Droid Coordinator", "Droid Defender", "Droid Mark", "Droid Master", "Droid Reinforements", "Electric Shock", "Electrostaff", "Elite Clone Trooper", "Emergency Life Support", "Emp Grenades", "Empathy", "Emperor'S Bodyguard", "Emplacement", "Energy Shield", "Enraging Screech", "Essence Of Life", "Eternal Hatred", "Evade", "Ewok", "Execute Order", "Final Shot", "Fire Control", "Flamethrower", "Flanking Support", "Flight", "Flurry Attack", "Flux Destiny", "Force", "Force Absorb", "Force Alter", "Force Ascetic", "Force Blast", "Force Bubble", "Force Burst", "Force Cloak", "Force Corruption", "Force Defense", "Force Empathic", "Force Grip","Force Heal", "Force Immunity", "Force Leap", "Force Lightning", "Force Phase", "Force Push", "Force Renewal", "Force Repulse", "Force Sense", "Force Spirit", "Force Storm", "Force Strike", "Force Stun", "Force Thrust", "Force Valor", "Force Weapon", "Force Whirlwind", "Force-Attuned Armor", "Fragile", "Fringe Reinforcements", "Fringe Reserves", "Frozen In Carbonite", "Furious Assault", "Galloping Attack", "Gang", "Greater Mobile Attack", "Gregarious", "Grenades", "Ground Pilot", "Gungan", "Gunner", "Hand Of The Emperor", "Harpoon Gun", "Heal", "Heavy Lift", "Heavy Weapon", "Homicidal Surgery", "Illusion", "Immediate Droid Reserve", "Immediate Droid Reserves", "Immobilizing Rend", "Imperial Knight", "Imperial Reserves", "Impulsive Force Renewal", "Impulsive Jedi Hunter", "Impulsive Momentum", "Impulsive Reprisal", "Impulsive Savagery", "Impulsive Shot", "Impulsive Sweep", "Impulsive Twin Attack", "Independent Outfit", "Industrial Repair", "Internal Strife", "Intuition", "Invibility", "Ion Gun", "Ion Shielding", "It'S A Trap!", "Jedi Bodyguard", "Jedi Hunter", "Jedi Mind Trick", "Jolt", "Karmic Luck", "Karmic Mettle", "Knight Speed", "Kouhun Infestation", "Levitation", "Lift", "Lighstaber Assault", "Lighstaber Block", "Lighstaber Throw", "Light Spirit", "Light Tutor", "Lightsaber", "Lightsaber Absorb", "Lightsaber Assault", "Lightsaber Attack", "Lightsaber Block", "Lightsaber Defense", "Lightsaber Delfect", "Lightsaber Duelist", "Lightsaber Precision", "Lightsaber Reflect", "Lightsaber Resistance", "Lightsaber Riposte", "Lightsaber Sweep", "Lightsaber Throw","Lightsbaer Block", "Loner", "Long Shot", "Machinery", "Mandalorian Conscription", "Mandalorian Hunter", "Master Of The Force", "Master Speed", "Master Tactician", "Medical Supplies", "Melee Attack", "Melee Reach", "Mercenary", "Merciless", "Mettle", "Micro-Vision", "Mighty Swing", "Mimetic Combat Processor", "Mines", "Missiles", "Mobile Attack", "Molecular Shielding", "Momentum", "Mounted Weapon", "Munitions Supplies", "Net Gun", "Never Tell Me The Odds", "New Republic/Rebel Reinforcements", "Niman Style", "None", "Ooglith Masquer", "Opportunist", "Order", "Override", "Overwhelming Force", "Painful Screech", "Palpatine'S Bodyguard", "Paralysis", "Parry", "Pathfinder", "Pawn Of The Dark Side", "Penetration", "Pheremones", "Pilot", "Playeryin Bol", "Poison", "Poisoned Blade", "Power Coupling", "Proboscises", "Programmed Target", "Protective", "Protective Aura", "Pulse Cannon", "Quadruple Attack", "Quick Reactions", "Rakghoul Disease", "Rangefinder", "Rapport", "Razorbug", "Recon", "Recovery", "Regeneration", "Relay Orders", "Rend", "Renewal", "Repair", "Republic Reserves", "Resilient", "Rig Blaster", "Rigid", "Roger Roger", "Rolling Cleave", "Sabotage", "Satchel Charge", "Savage", "Scarification", "Scramble", "Self-Destruct", "Separatist Reinforcements", "Separatist Reserves", "Sever Force", "Shaper", "Shatter Beam", "Shatterpoint", "Shields", "Shii-Cho Style", "Shockstaff", "Shockwave", "Sith Grip", "Sith Hatred", "Sith Hunger", "Sith Hunter","Sith Lightning", "Sith Rage", "Sith Sorcery", "Smuggler'S Luck", "Snare Rifle", "Sniper", "Soldier", "Sonic Attack", "Sonic Stunner", "Soresu Style", "Soresu Style Mastery", "Speed", "Spit Poison", "Splash", "Spotter", "Squad Assault", "Squad Cover", "Squad Firepower", "Stable Footing", "Steal Force", "Stealth", "Strafe Attack", "Strong-Willed", "Stun Gas", "Stun Mortar", "Surprise Move", "Swarm", "Synchronized Fire", "Synergy", "Tactics Broker", "Targeting", "Teräs Kesäi Style", "Thrawn'S Bodyguard", "Thud Bug", "Tow Cable", "Trandoshan", "Transfer Essence", "Traps", "Triple Attack", "Troop Cart", "Trooper", "Turn To The Dark Side", "Twin Attack", "Ugnaught", "Unique", "Unleash The Force", "Use The Force", "Vaapad Style", "Vaapad-Style Fighting", "Vicious Attack", "Virulent Poison", "Virulent Poison Dart", "Vonduun Crab Armor", "Wall Climber", "Wheel Form", "Wheeled", "Whirlwind Attack", "Wookiee", "Xizor'S Bodyguard", "Ysalamiri", "Yuuzhan Vong Collaborator", "Yuuzhan Vong Warrior"]
const chosen_skills = []
const excluded_skills = []
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

const minRange = document.getElementById('min-range');
const maxRange = document.getElementById('max-range');
const minInput = document.getElementById('min-input');
const maxInput = document.getElementById('max-input');
const sliderProgress = document.getElementById('slider-progress');
const minBubble = document.getElementById('min-bubble');
const maxBubble = document.getElementById('max-bubble');
const sliderMax = parseInt(minRange.max);
const priceGap = 5; 

async function applyPointFilter(minVal, maxVal) {
    chosenMinPoint = minVal;
    chosenMaxPoint = maxVal;
    
    // Mivel a dupla csúszkánál buborékok írják ki az értéket, a #point_show span-ra 
    // valószínűleg már nincs szükség a felületen. Ha mégis, itt frissítheted:
    // const point_span = document.querySelector('#point_show');
    // if(point_span) point_span.innerText = minVal + " - " + maxVal;

    // FONTOS: A loadCardsByState függvényed paraméterlistáját (vagy a belső logikáját) 
    // is módosítanod kell, hogy kezelje a chosenMinPoint-ot is!
    await loadCardsByState();
}

async function loadChars(){
    const response = await fetch(API_URL);
    characters = await response.json();
    
}
function sortCharsByPointAsc(){
    characters.sort((a,b) => a.points - b.points);
    loadCardsByState()
}

function sortCharsByPointDesc(){
    characters.sort((a,b) => b.points - a.points);
    loadCardsByState()
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
    
    if (card_to_be_loaded.state != "Owned"){
        cardBg.style.filter = "grayscale(100%)";
    }
    
    card.appendChild(cardBg)

    const cardContent = document.createElement('div')
    cardContent.classList.add('card-content')

            // --- BAL FELSŐ SAROK: Kedvenc gomb ---
    const fav_button = document.createElement('button')
    fav_button.classList.add('fav-btn')
    fav_button.innerHTML = '<i class="fa-solid fa-user-plus"></i>' // Itt használhatsz FontAwesome ikont is, pl. '<i class="fas fa-heart"></i>'
    fav_button.title = "Hozzáadás a kedvencekhez"
    fav_button.onclick = () => addCharToTeam(card_to_be_loaded.id, card_to_be_loaded.points, card_to_be_loaded.fraction ,chosenTeamName)
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

    if (card_to_be_loaded.state != "Owned"){
        img.style.filter = "grayscale(100%)";
    }

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

async function loadCardsByState() {
    if(chosenTeamName != ''){
        const team_response = await fetch('http://192.168.1.101:3001/teams');
        const team_data = await team_response.json();
        
        const chosenTeam = team_data.find(x => x.name == chosenTeamName)
        console.log('lefutott'+" "+chosenTeam.name)
        container.innerHTML = '';
        for(let i = 0; i < characters.length; i++){
            card_to_be_loaded = characters[i]
            let include_checker = (arr, target) => target.every(v => arr.includes(v));
            let exclude_checker = (arr, target) => !target.some(v => arr.includes(v));
            if ((card_to_be_loaded.fraction == chosenTeam.fraction || card_to_be_loaded.fraction == 'fringe') && (card_to_be_loaded.points >= chosenMinPoint) && (card_to_be_loaded.points <= chosenMaxPoint) && (card_to_be_loaded.fraction == chosenFraction || chosenFraction == 'Összes') && include_checker(card_to_be_loaded.skill_set, chosen_skills) && exclude_checker(card_to_be_loaded.skill_set, excluded_skills)){
                loadCard(card_to_be_loaded, (card_info) => {
                    modalContent.innerHTML = `
                            <div class="modal-card">
                                <img src="${card_info.card_img}" alt="${card_info.name}" class="card-img">
                                
                                
                            </div>
                        `;
                    modal.showModal();
                    listExistingTeamsForChar();
                    })
            }
        }
    }
    else{
        container.innerHTML = '';
        for(let i = 0; i < characters.length; i++){
            card_to_be_loaded = characters[i]
            let include_checker = (arr, target) => target.every(v => arr.includes(v));
            let exclude_checker = (arr, target) => !target.some(v => arr.includes(v));
            if ((card_to_be_loaded.points >= chosenMinPoint) && (card_to_be_loaded.points <= chosenMaxPoint) && (card_to_be_loaded.fraction == chosenFraction || chosenFraction == 'Összes') && include_checker(card_to_be_loaded.skill_set, chosen_skills) && exclude_checker(card_to_be_loaded.skill_set, excluded_skills)){
                loadCard(card_to_be_loaded, (card_info) => {
                    modalContent.innerHTML = `
                            <div class="modal-card">
                                <img src="${card_info.card_img}" alt="${card_info.name}" class="card-img">
                                
                                
                            </div>
                        `;
                    modal.showModal();
                    listExistingTeamsForChar();
                    })
            }
        }
    }
}

async function init(){
    await loadChars()
    await loadCardsByState()
    await fillSideList()
    await listExistingTeams()
    
    // Kezdeti állapot beállítása betöltéskor
    updateUI(parseInt(minRange.value), parseInt(maxRange.value));

    // Listenerek hozzáadása
    minRange.addEventListener('input', handleRangeInput);
    maxRange.addEventListener('input', handleRangeInput);
    minInput.addEventListener('change', handleNumberInput); // 'change', hogy csak befejezett gépelés után frissítsen
    maxInput.addEventListener('change', handleNumberInput);
    minRange.addEventListener('change', handleRangeChange);
    maxRange.addEventListener('change', handleRangeChange);
    
    updateUI(parseInt(minRange.value), parseInt(maxRange.value));
}

async function addCharToTeam(id, points, fraction ,team_name) {
    const team_response = await fetch('http://192.168.1.101:3001/teams');
    const team_data = await team_response.json();

    let chosenTeam = team_data.find(x => x.name == team_name)
    if(chosenTeam.fraction == fraction || fraction == 'fringe'){
        chosenTeam.members.push(id)
        const updated_points = Number(chosenTeam.current_points) + Number(points)
        
        await fetch(`http://192.168.1.101:3001/teams/${chosenTeam.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
            body: JSON.stringify({
            members: chosenTeam.members,
            current_points: updated_points
            })
        });

        modal.close()
    }
    else{
        alert(fractions_map[fraction]+" karaktert próbáltál hozzáadni "+fractions_map[chosenTeam.fraction]+" csapathoz")
    }
    
}

async function removeCharFromTeam(id, team_name){
    console.log(id+"removed from"+team_name)
    const team_response = await fetch('http://192.168.1.101:3001/teams');
    const team_data = await team_response.json();
    
    const char_response = await fetch(`http://192.168.1.101:3001/cards/${id}`);
    const char_data = await char_response.json();
    const points = char_data.points

    let chosenTeam = team_data.find(x => x.name == team_name)
    const index = chosenTeam.members.indexOf(id)
    chosenTeam.members.splice(index,1)
    const updated_points = Number(chosenTeam.current_points) - Number(points)
        
        await fetch(`http://192.168.1.101:3001/teams/${chosenTeam.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
            body: JSON.stringify({
            members: chosenTeam.members,
            current_points: updated_points
            })
        });

        modal.close()
        loadTeam(team_name)
}

async function fillSideList(){
    const response = await fetch(`http://192.168.1.101:3001/collections_data`);
    const collection_stats = await response.json();

    const fraction_list = document.querySelector('#fraction_list')
    const skill_list = document.querySelector('#skill_list')

    fraction_list.innerHTML = ''


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
            console.log(chosenFraction)
            loadCardsByState()
        })
        
        element.appendChild(a)
        fraction_list.appendChild(element)
    }
    // --- FRAKCIÓK (FRACTIONS) ---
    for (let i = 0; i < skills.length; i++) {
        const element = document.createElement('li');
        // Ha a frakció megegyezik a jelenleg kiválasztottal, kapja meg az active osztályt generáláskor
        if (skills[i] === chosenRarity) {
            element.classList.add('active');
        }

        const a = document.createElement('a')
        a.innerText = skills[i]
        a.href = '#'
        
        element.addEventListener('click', (event) => {
            event.preventDefault(); // Megakadályozza az ugrálást
            
            // 2. Ráadjuk az 'active' osztályt a kattintott elemre
            if(element.classList.contains('skill-include')){
                const index = chosen_skills.indexOf(skills[i])
                chosen_skills.splice(index, 1)
                element.classList.remove('skill-include');
                
                excluded_skills.push(skills[i])
                element.classList.add('skill-exclude');
            }
            else if(element.classList.contains('skill-exclude')){
                const index = excluded_skills.indexOf(skills[i])
                excluded_skills.splice(index, 1)
                element.classList.remove('skill-exclude');
            }
            else{
                chosen_skills.push(skills[i])
                element.classList.add('skill-include');
            }
            loadCardsByState()
        })
        
        element.appendChild(a)
        skill_list.appendChild(element)
    }

}

function changeTeam(){
    const team_name = document.querySelector('#team-selector')
    chosenTeamName = team_name.value

    loadTeam()
}

async function loadTeam(element) {
    
    const point_stat = document.querySelector('#point_stat')
    point_stat.style.visibility = "visible";

    const team_response = await fetch('http://192.168.1.101:3001/teams');
    const team_data = await team_response.json();

    const chosenTeam = team_data.find(x => x.name == chosenTeamName)
    point_stat.innerHTML = chosenTeam.point+"/"+chosenTeam.current_points
    container.innerHTML = '';
    for (let i = 0; i < chosenTeam.members.length; i++) {
        const card_to_be_loaded = characters.find(x => x.id == chosenTeam.members[i])
        loadCard(card_to_be_loaded, (card_info) => {
                modalContent.innerHTML = `
                        <div class="modal-card">
                            <img src="${card_info.card_img}" alt="${card_info.name}" class="card-img">
                            
                            <div class="card-controls">
                                <!-- Állapot választó -->
                                <div class="control-group">
                                    <button onclick="removeCharFromTeam('${card_info.id}', '${chosenTeamName}')" class="sw-btn">Törlés a csapatból</button>
                                </div>
                            </div>
                        </div>
                    `;
                modal.showModal();
        })
        const buttons = document.querySelectorAll(".fav-btn")
        let btn = buttons[buttons.length - 1]
        btn.innerHTML = '<i class="fa-solid fa-trash"></i>'
        btn.onclick = () => removeCharFromTeam(card_to_be_loaded.id, chosenTeamName)
    }

    
}

async function loadProfileTeams(element) {
    const team_response = await fetch('http://192.168.1.101:3001/teams');
    const team_data = await team_response.json();

    const teams = team_data.filter(x => x.owner == sessionStorage.getItem('chosenProfile'))
    container.innerHTML = '';
    teams.forEach(team => {
        const team_card = document.createElement('div')
        team_card.classList.add("team-card")
        team_card.onclick = () => {
            chosenTeamName = team.name
            loadTeam()
        }

        const cardBg = document.createElement('img')
        cardBg.classList.add('team-card-bg')
        cardBg.src = 'team_backgrounds\\rebel.png'
        team_card.appendChild(cardBg)

        const teamContent = document.createElement('div')
        teamContent.classList.add('team-content')

        const img = document.createElement('img')
        img.src = characters.find(x => x.id == team.members[0]).figure_img
        img.classList.add('figure-team-img')
        teamContent.appendChild(img)

        const team_name = document.createElement('h3')
        team_name.innerText = team.name
        team_name.classList.add('team-name')
        teamContent.appendChild(team_name)

        const team_faction = document.createElement('span')
        team_faction.innerText = team.fraction
        team_faction.classList.add('team-faction')
        teamContent.appendChild(team_faction)

        const team_point = document.createElement('span')
        team_point.innerText = "Pontszám: "+team.point
        team_point.classList.add('team-point')
        teamContent.appendChild(team_point)

        team_card.appendChild(teamContent)
        container.appendChild(team_card)
    });
}

function filterCards() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const cardName = card.querySelector('p').textContent.toLowerCase();
        if (cardName.includes(searchValue)) {
            card.style.display = "grid";
        } else {
            card.style.display = "none";
        }
    });
}

function filterSkills() {
    const searchInput = document.getElementById('skill_search');
    const skill_elements = document.querySelectorAll('#skill_list li');
    
    const searchValue = searchInput.value.toLowerCase();
    skill_elements.forEach(skill => {
        // A textContent kiolvassa az <li> és a benne lévő <a> szövegét is
        const skillName = skill.textContent.toLowerCase();
        
        if (skillName.includes(searchValue)) {
            // Ha van egyezés, üres stringet adunk át. 
            // Ez visszaállítja az <li> eredeti "list-item" display értékét.
            skill.style.display = ""; 
        } else {
            // Ha nincs egyezés, elrejtjük
            skill.style.display = "none";
        }
    });
}

function showCreationWindow(){
    modalContent.innerHTML = `
                        <!-- Ezt a wappert helyezd a modalod belsejébe -->
                        <div class="sw-modal-form-wrapper">
                            <div class="sw-form-container">
                                <h2 class="sw-form-title">Csapat adatok</h2>
                                
                                <form action="#" method="POST" class="sw-form-element">
                                    
                                    <div class="sw-form-group">
                                        <label class="sw-form-label" for="teamName">Csapatnév</label>
                                        <input class="sw-form-input" type="text" id="teamName" name="teamName" placeholder="Pl.: Zsivány Egyes" required>
                                    </div>

                                    <div class="sw-form-group">
                                        <label class="sw-form-label" for="faction">Frakció</label>
                                        <select class="sw-form-select" id="faction" name="faction" required>
                                            <option value="" disabled selected>Válassz frakciót...</option>
                                            <option value="rebel">Rebel</option>
                                            <option value="empire">Imperial</option>
                                            <option value="old_republic">Old Republic</option>
                                            <option value="sith">Sith</option>
                                            <option value="republic">Republic</option>
                                            <option value="separatist">Separatist</option>
                                            <option value="new_republic">New Republic</option>
                                            <option value="wong">Yuuzhan Vong</option>
                                            <option value="mandalorian">Mandalorian</option>
                                        </select>
                                    </div>

                                    <div class="sw-form-group">
                                        <label class="sw-form-label" for="score">Pontszám</label>
                                        <input class="sw-form-input" type="number" id="score" name="score" min="0" placeholder="0" required>
                                    </div>

                                    <button type="button" class="sw-form-submit-btn" onclick="createTeam()">Létrehozás</button>
                                    
                                </form>
                            </div>
                        </div>
                    `;
    modal.showModal();
}

async function listExistingTeams() {
    const response = await fetch(`http://192.168.1.101:3001/teams`);
    const team_data = await response.json();
    const team_selector = document.querySelector('#team-selector')
    team_selector.innerHTML = ''
    const empty_option = document.createElement('option')
    empty_option.hidden = true;
    empty_option.value = "None";
    empty_option.innerText = "Válassz csapatot"
    team_selector.appendChild(empty_option)
    for (let i = 0; i < team_data.length; i++) {
        if (team_data[i].owner == sessionStorage.getItem('chosenProfile')){
            const team_option = document.createElement('option')
            team_option.value = team_data[i].name
            team_option.innerText = team_data[i].name
            team_selector.appendChild(team_option)
        }
        
    }
}

async function listExistingTeamsForChar() {
    const response = await fetch(`http://192.168.1.101:3001/teams`);
    const team_data = await response.json();

    const team_selector = document.querySelector('#char-to-team')
    team_selector.innerHTML = ''
    const empty_option = document.createElement('option')
    empty_option.hidden = true;
    empty_option.innerText = "Válassz csapatot"
    team_selector.appendChild(empty_option)
    for (let i = 0; i < team_data.length; i++) {
        if (team_data[i].owner == sessionStorage.getItem('chosenProfile')){
            const team_option = document.createElement('option')
            team_option.value = team_data[i].name
            team_option.innerText = team_data[i].name

            team_selector.appendChild(team_option)
        }
    }
    
}

async function createTeam(){
    const teamNameInput = document.getElementById('teamName').value;
    const factionInput = document.getElementById('faction').value;
    const scoreInput = parseInt(document.getElementById('score').value, 10);

    const teamData = {
                name: teamNameInput,
                fraction : factionInput,
                point: scoreInput,
                members: [],
                current_points: 0,
                owner: sessionStorage.getItem('chosenProfile')
            };
    const response = await fetch("http://192.168.1.101:3001/teams", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(teamData)
                });
    modal.close();
    listExistingTeams()
}

async function deleteTeam(){
    const teamNameInput = document.getElementById('teamNameChange').value;
    
    const team_response = await fetch("http://192.168.1.101:3001/teams");
    const team_data = await team_response.json();
    
    team_for_delete = team_data.find(x => x.name == chosenTeamName)

    const response = await fetch(`http://192.168.1.101:3001/teams/${team_for_delete.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                  });
    modal.close();
    loadCardsByState();
    listExistingTeams();
}

async function modifyTeam(){
    const teamNameInput = document.getElementById('teamNameChange').value;
    const factionInput = document.getElementById('factionChange').value;
    const scoreInput = parseInt(document.getElementById('scoreChange').value, 10);
    
    const team_response = await fetch("http://192.168.1.101:3001/teams");
    const team_data = await team_response.json();
    
    team_for_change = team_data.find(x => x.name == chosenTeamName)

    const response = await fetch(`http://192.168.1.101:3001/teams/${team_for_change.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      name: teamNameInput,
                      fraction: factionInput,
                      point : scoreInput
                    })
                  });
    modal.close();
}

async function showModifyingWindow(){
    const team_response = await fetch("http://192.168.1.101:3001/teams");
    const team_data = await team_response.json();
    
    team_for_change = team_data.find(x => x.name == chosenTeamName)
    
    modalContent.innerHTML = `
                        <!-- Ezt a wappert helyezd a modalod belsejébe -->
                        <div class="sw-modal-form-wrapper">
                            <div class="sw-form-container">
                                <h2 class="sw-form-title">Csapat módosítása</h2>
                                
                                <form action="#" method="POST" class="sw-form-element">
                                    
                                    <div class="sw-form-group">
                                        <label class="sw-form-label" for="teamNameChange">Csapatnév</label>
                                        <input class="sw-form-input" type="text" id="teamNameChange" name="teamNameChange" value="${team_for_change.name}" required>
                                    </div>

                                    <div class="sw-form-group">
                                        <label class="sw-form-label" for="factionChange">Frakció</label>
                                        <select class="sw-form-select" id="factionChange" name="factionChange" required>
                                            <option value="" disabled selected>Válassz frakciót...</option>
                                            <option value="rebel">Rebel</option>
                                            <option value="empire">Imperial</option>
                                            <option value="old_republic">Old Republic</option>
                                            <option value="sith">Sith</option>
                                            <option value="republic">Republic</option>
                                            <option value="separatist">Separatist</option>
                                            <option value="new_republic">New Republic</option>
                                            <option value="wong">Yuuzhan Vong</option>
                                            <option value="mandalorian">Mandalorian</option>
                                        </select>
                                    </div>

                                    <div class="sw-form-group">
                                        <label class="sw-form-label" for="score">Pontszám</label>
                                        <input class="sw-form-input" type="number" id="scoreChange" name="scoreChange" min="0" value="${team_for_change.point}" required>
                                    </div>

                                    <button type="button" class="sw-form-submit-btn" onclick="modifyTeam()">Módosítás</button>
                                    <button type="button" class="sw-form-submit-btn" onclick="deleteTeam()">Csapat törlése</button>
                                    
                                </form>
                            </div>
                        </div>
                    `;
    document.getElementById('factionChange').value = team_for_change.fraction;
    modal.showModal();
}

async function changePointCriteria(p) {
    const point_span = document.querySelector('#point_show')
    chosenMaxPoint = Number(p.value)
    loadCardsByState()
    point_span.innerText = p.value
}

    // Frissíti a kék sávot és a buborékok pozícióját/szövegét
function updateUI(minVal, maxVal) {
        // Százalékos pozíciók kiszámítása
        const minPercent = (minVal / sliderMax) * 100;
        const maxPercent = (maxVal / sliderMax) * 100;

        // Kék sáv (progress) szélességének és pozíciójának beállítása
        sliderProgress.style.left = minPercent + "%";
        sliderProgress.style.right = (100 - maxPercent) + "%";

        // Buborékok frissítése
        minBubble.style.left = minPercent + "%";
        minBubble.innerText = minVal;
        
        maxBubble.style.left = maxPercent + "%";
        maxBubble.innerText = maxVal;
    }

    // Eseménykezelő a csúszkákhoz
function handleRangeInput(e) {
        let minVal = parseInt(minRange.value);
        let maxVal = parseInt(maxRange.value);

        // Megakadályozzuk, hogy a két csúszka átlépje egymást
        if (maxVal - minVal < priceGap) {
            if (e.target.id === "min-range") {
                minRange.value = maxVal - priceGap;
                minVal = parseInt(minRange.value);
            } else {
                maxRange.value = minVal + priceGap;
                maxVal = parseInt(maxRange.value);
            }
        }

        // Számmezők szinkronizálása
        minInput.value = minVal;
        maxInput.value = maxVal;
        
        updateUI(minVal, maxVal);
    }

async function handleRangeChange(e) {
        let minVal = parseInt(minRange.value);
        let maxVal = parseInt(maxRange.value);
        
        // Hívjuk a kártyákat betöltő logikádat
        await applyPointFilter(minVal, maxVal);
    }
    
    // Eseménykezelő a szám beviteli mezőkhöz
async function handleNumberInput(e) {
        let minVal = parseInt(minInput.value) || 0;
        let maxVal = parseInt(maxInput.value) || 0;

        // Értékek határok között tartása és átfedés ellenőrzése
        if (maxVal - minVal >= priceGap && maxVal <= sliderMax && minVal >= 0) {
            if (e.target.id === "min-input") {
                minRange.value = minVal;
            } else {
                maxRange.value = maxVal;
            }
            updateUI(minVal, maxVal); // UI frissítése
            
            // Itt egyből tölthetjük a kártyákat, mert a számmező "change" eseménye
            // eleve csak akkor fut le, ha kikattint a mezőből vagy entert üt
            await applyPointFilter(minVal, maxVal); 
        }
    }

function applyOrdering(value){
    if(value == "score-asc"){
        sortCharsByPointAsc()
    }
    else if(value == "score-desc"){
        sortCharsByPointDesc()
    }
}
