const modalContent = document.getElementById('modalContent');
const modal = document.getElementById('myModal');
async function loadMaps() {
    const container = document.getElementById('maps-container');
    container.innerHTML = '';
    const url_1 = 'mos_elsewhere.jpg'
    const url_2 = 'sewers.jpg'
    const url_3 = 'Droid Factory.jpg'

    const img_1 = document.createElement('img')
    img_1.src = url_1
    img_1.height = 400
    img_1.width = 400

    const img_2 = document.createElement('img')
    img_2.src = url_2
    img_2.height = 400
    img_2.width = 400

    const img_3 = document.createElement('img')
    img_3.src = url_3
    img_3.height = 400
    img_3.width = 400

    const a_1 = document.createElement('a');
            a_1.href = '#';

            a_1.addEventListener('click', (e) => {
                e.preventDefault();
                    modalContent.innerHTML = `
                        <div class="modal-map">
                            <img src="${url_1}" alt="${url_1}" class="card-img">
                    `;
                modal.showModal();
            });
    
    const a_2 = document.createElement('a');
            a_2.href = '#';

            a_2.addEventListener('click', (e) => {
                e.preventDefault();
                    modalContent.innerHTML = `
                        <div class="modal-map">
                            <img src="${url_2}" alt="${url_2}" class="card-img">
                    `;
                modal.showModal();
            });
    const a_3 = document.createElement('a');
            a_3.href = '#';

            a_3.addEventListener('click', (e) => {
                e.preventDefault();
                    modalContent.innerHTML = `
                        <div class="modal-map">
                            <img src="${url_3}" alt="${url_3}" class="card-img">
                    `;
                modal.showModal();
            });
    a_1.appendChild(img_1)
    a_2.appendChild(img_2)
    a_3.appendChild(img_3)
    container.appendChild(a_1)
    container.appendChild(a_2)
    container.appendChild(a_3)
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