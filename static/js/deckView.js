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
            <td class="deck__card-name">
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