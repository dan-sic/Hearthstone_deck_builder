export const displayCurrentDeck = deckData => {
    const deckTableBody = document.querySelector('.deck__body');

    deckTableBody.innerHTML = '';

    for (let card of deckData) {
        const cardRowHtml = generateCardRow(card);
        deckTableBody.insertAdjacentHTML('afterbegin', cardRowHtml)
    }
};

function generateCardRow(cardData) {
    const { name, occurance, id, cost, rarity } = cardData;
    const cardRowHtml = `
        </tr data-card-id="${id}">
            <td class="deck__card-name" data-card-id="${id}" >
                <span><span class="deck__card-name--${rarity}">${name}</span> x ${occurance}</span>
            </td>
            <td class="deck__mana-cost">
                <span>${cost}</span>
                <span class="deck__mana-icon"></span>
            </td>
        </tr>
    `;
    return cardRowHtml
}

export const showCardSnippet = () => {
    const target = event.target;
    const id = target.getAttribute('data-card-id');
    if(id) {
        const card = document.getElementById('card');
        card.innerHTML = `
    	<img src='https://art.hearthstonejson.com/v1/render/latest/enUS/256x/${id}.png'>
    `
        card.style.display = "block";
        const posX = event.clientX+1;
        const posY = event.clientY+1;

        card.style.left = `${posX}px`;
        card.style.top = `${posY}px`;
    }
}

export const hideCardSnippet = () => {
    const btn = document.getElementById('card');
	btn.style.display = "none";
}