import DeckModel from './DeckModel.js';
import { updateChartView } from './chartView.js';
import { displayCurrentDeck } from './deckView.js';

const state = {};
let deckData;

function download(){
  return fetch('https://api.hearthstonejson.com/v1/30103/enUS/cards.collectible.json')
  .then(function(response) {
    return response.json();
  });
}

function changePage(event){
    const selectedBtn = event.target.closest('[data-js="page-btn"]');
    let button = selectedBtn.id;

    let set = state.subSet == "neutral" ? 1: 0;

    if (button == "previous" && state.pageNumber[set]>0){
        state.pageNumber[set] -= 1;
    }
    if (button == "next" && state.pageNumber[set] < state.maxPage){
        state.pageNumber[set] += 1;
    }
    printCards();
}

function displayDeckInfo() {
    const cardNumberElement = document.getElementById('cards-number');
    const numberOfCardsInDeck = deckData.getNumberOfCardsInDeck();
    cardNumberElement.textContent = numberOfCardsInDeck;
}

function selectCardHandler(e) {
    e.preventDefault();

    const isElementNotCard = !e.target.dataset.cardid;
    if(isElementNotCard) {
        return false;
    }

    const cardId = e.target.dataset.cardid;

    const isRightMouseClick = e.type === 'contextmenu';
    if(isRightMouseClick) {
        deckData.removeCardFromDeck(cardId);
    } else {
        deckData.addCardToDeck(cardId);
    }

    const chartValues = deckData.deckManaChart;
    updateChartView(chartValues);
    displayCurrentDeck(deckData.deck);

    displayDeckInfo();


    return false
}

function removeCardFromDeck(e) {
    const selectedCard = e.target.closest('.deck__card-name');
    if (selectedCard) {
        const cardId = selectedCard.dataset.cardId;
        deckData.removeCardFromDeck(cardId);
        const chartValues = deckData.deckManaChart;
        updateChartView(chartValues);
        displayCurrentDeck(deckData.deck);

        displayDeckInfo();
    }
}

function selectSubSet(e){
    state.subSet = e.target.name;
    printCards();
}

function printCards(){
    let cards = filterCards();
    manipulateDom(cards);
}

function checkBoxChange(event) {
    let checkBox = event.target;
    let mechanic = checkBox.id.toUpperCase();
    if (mechanic) {
        if (checkBox.checked) {
            state.mechanics.push(mechanic);
        } else {
            let i = state.mechanics.indexOf(mechanic);
            state.mechanics.splice(i, 1);
        }
        printCards();
    }
}

function filterCards(){
    let cards = state.cards.filter(function(card) {
        return card.cardClass == state.subSet.toUpperCase();
    });

    let textField = document.getElementById('filter');
    cards = cards.filter(function(card) {
        return card.name.toUpperCase().indexOf(textField.value.toUpperCase()) > -1;

    });

    let selectField = document.getElementById('select');
    cards = cards.filter(function(card) {
        if(selectField.value == "default") return true;
        if(selectField.value == "even") return card.cost%2==0;
        if(selectField.value == "odd") return card.cost%2==1;
        if(selectField.value == "8+") return card.cost>=8
        return card.cost==selectField.value;
    });
    cards = cards.filter(function(card) {
        if (state.mechanics.length>0){
            return state.mechanics.some(function (v) {
                if(card.mechanics)
                    return card.mechanics.indexOf(v) >= 0;
                if(card.referencedTags)
                    return card.referencedTags.indexOf(v) >= 0;
                return false;
            });
        }
        return true;
    });

    cards.sort(function (a, b) {
        if (a.cost < b.cost){
            return -1;
        }
        if (a.cost > b.cost){
            return 1;
        }
        return 0;
    });
    return cards;
}

function manipulateDom(cards){
    let set = state.subSet == "neutral" ? 1: 0;

    let cardsPerPage = 6;
    if (cards.length < 6){
        cardsPerPage = cards.length;
        state.pageNumber[set] = 0;
    }
    let display = '';

    for(let i=0;i<6;i++){
        let card;
        if(i<cardsPerPage) {
            const cardId = cards[i + state.pageNumber[set] * 6].id;
            card = `
                <div class="col-md-4 col-sm-6">
                    <div class="card-wrapper">
                        <img src='https://art.hearthstonejson.com/v1/render/latest/enUS/256x/${cardId}.png' data-cardid=${cardId} class="fit-image" ">
                    </div>
               </div>
            `;
        }
        if (card) {
            display += card;
        }

    }

    let cardList = document.getElementById('cards');
    let page = document.getElementById('page');
    let mPage = document.getElementById('maxPage');

    const max = Math.floor(cards.length / 6)-1;
    state.maxPage = max > 0 ? max : 0;

    cardList.addEventListener('click', selectCardHandler)
    cardList.addEventListener('contextmenu', selectCardHandler, false)

    cardList.innerHTML = display;
    page.innerHTML = state.pageNumber[set];
    mPage.innerHTML = state.maxPage;


}

function loadMechanicsFilter(checkboxes){
    let uniqueMechanics = ['Adapt', 'Battlecry', 'Charge', 'Choose One', 'Combo', 'Deathrattle', 'Discover', 'Divine Shield',
        'Echo', 'Freeze', 'Immune', 'Inspire', 'Joust', 'Lackey', 'Lifesteal', 'Magnetic', 'Overkill', 'Overload', 'Poisonous',
        'Quest', 'Recruit', 'Rush', 'Secret', 'Silence', 'Spellpower'/*Spell Damage*/, 'Start of Game', 'Stealth', 'Summon', 'Taunt', 'Transform',
        'Twinspell', 'Windfury]'];

    let display = '';

    for(let i in uniqueMechanics){
        let checkBox = `
            <label for="${uniqueMechanics[i]}">
                <input type="checkbox" id="${uniqueMechanics[i]}"/>${uniqueMechanics[i]}</label>
        `;

        display += checkBox;
    }

    checkboxes.innerHTML = display;
}

async function main(){
    state.cards = await download();
    deckData = new DeckModel(state.cards);
    state.pageNumber = [0,0];
    state.mechanics = [];
    state.subSet = document.getElementById('class').name;

    let tab1 = document.getElementById('class');
    let tab2 = document.getElementById('neutral');
    let nextBtn = document.getElementById('next');
    let previousBtn = document.getElementById('previous');
    let filter = document.getElementById('filter');
    let select = document.getElementById('select');
    let checkboxes = document.getElementById('checkboxes');
    let deckBody = document.querySelector('[data-js="deck__body"]');

    loadMechanicsFilter(checkboxes);

    tab1.addEventListener('click', selectSubSet);
    tab2.addEventListener('click', selectSubSet);

    nextBtn.addEventListener('click', changePage);
    previousBtn.addEventListener('click', changePage);
    filter.addEventListener('keyup', printCards);
    select.addEventListener('change', printCards);
    checkboxes.addEventListener('click', checkBoxChange);
    deckBody.addEventListener('click', removeCardFromDeck)

    displayDeckInfo();
    printCards();
}


main();