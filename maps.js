const modalContent = document.getElementById('modalContent');
const modal = document.getElementById('myModal');
async function loadMaps() {
    const container = document.getElementById('maps-container');
    container.innerHTML = '';
    const response = await fetch('http://192.168.1.101:3001/maps');
    const maps = await response.json();
    for (let i = 0; i < maps.length; i++) {
        const map = maps[i]
        console.log(map.name)
        const img = document.createElement('img')
        img.src = map.url
        img.height = 400
        img.width = 400

        const a = document.createElement('a');
            a.href = '#';

            a.addEventListener('click', (e) => {
                e.preventDefault();
                    modalContent.innerHTML = `
                        <div class="modal-map">
                            <img src="${map.url}" alt="${map.url}" class="card-img">
                    `;
                modal.showModal();
            });
        
        a.appendChild(img)

        const wraper = document.createElement('div')
        wraper.classList.add('image-wrapper')
        wraper.appendChild(a)

        const glow = document.createElement('div')
        glow.classList.add('login-profile')
        glow.classList.add('blue-glow')
        glow.appendChild(wraper)

        const span = document.createElement('span')
        span.innerText = map.name
        glow.appendChild(span)
        container.appendChild(glow)
    }
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

loadMaps()