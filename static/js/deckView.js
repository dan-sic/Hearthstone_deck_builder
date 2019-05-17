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

function createCardElement(cardId) {

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('card-wrapper');
    imageContainer.classList.add('card-clone');
    const cardImg = document.createElement('img');
    cardImg.classList.add('fit-image');
    cardImg.setAttribute('src', `https://art.hearthstonejson.com/v1/render/latest/enUS/256x/${cardId}.png`);
    cardImg.setAttribute('data-cardid', cardId);

    imageContainer.insertAdjacentElement('beforeend', cardImg);

    return imageContainer
}

function getElementCoordinates(elem) {
  let box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}

export const animateAddingCard = (cardId, canAnimateCard) => {

    if (!canAnimateCard) return;

    const currentCard = document.querySelector(`.original-card[data-cardid="${cardId}"]`).parentElement;
    const body = document.querySelector('body');
    const cardClone = createCardElement(cardId);

    const currentCardPageX = getElementCoordinates(currentCard).left;
    const currentCardPageY = getElementCoordinates(currentCard).top;

    cardClone.style.top = `${currentCardPageY}px`;
    cardClone.style.left = `${currentCardPageX}px`;

    body.insertAdjacentElement('afterbegin', cardClone);

    cardClone.classList.add('card-animation');

    setTimeout(() => {
        body.removeChild(cardClone);
    }, 1500);
};

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
