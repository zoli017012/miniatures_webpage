async function load(id) {
    const response = await fetch(`http://192.168.1.101:3001/cards/${id}`);
    const data = await response.json();
    const point = data.points
    const url = data.card_img
    document.body.innerHTML = ''

    const span = document.createElement('span')
    span.innerText = data.id

    const text_box = document.createElement('input')
    text_box.value = ''

    const h1 = document.createElement('h1')
    h1.innerText = point

    const img = document.createElement('img')
    img.src = url

    btn_next = document.createElement('button')
    btn_next.innerText = 'Következő'
    btn_next.onclick = () => load(id + 1)

    btn_modify = document.createElement('button')
    btn_modify.innerText = 'Módosítás'
    btn_modify.onclick = () => modify(id, text_box.value)

    document.body.appendChild(h1)
    document.body.appendChild(img)
    document.body.appendChild(btn_next)
    document.body.appendChild(text_box)
    document.body.appendChild(btn_modify)
    document.body.appendChild(span)
}

async function modify(id, new_value) {
    await fetch(`http://192.168.1.101:3001/cards/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ points: new_value })
  });
}

load(640)