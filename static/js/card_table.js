
const state = {};

function download(){
  return fetch('https://api.hearthstonejson.com/v1/30103/enUS/cards.collectible.json')
  .then(function(response) {
    return response.json();
  });
}

function changePage(event){
    let button = event.target.id;

    let set;
    if (state.subSet == "neutral"){
        set = 1;
    }else{
        set = 0;
    }

    if (button == "previous" && state.pageNumber[set]>0){
        state.pageNumber[set] -= 1;
    }
    if (button == "next" && state.pageNumber[set] < state.maxPage-1){
        state.pageNumber[set] += 1;
    }
    printCards();
}

function selectCard(e) {
    const cardId = e.target.dataset.cardid;
    cardData = state.cards.filter(card => card.id === cardId);
    console.log(cardData[0]);
}

function selectSubSet(e){
    state.subSet = e.target.name;
    printCards();
}

function printCards(){
    cards = filterCards();
    manipulateDom(cards);
}

function filterCards(){
    cards = state.cards.filter(function(card) {
        return card.cardClass == state.subSet.toUpperCase();
    });

    let filterField = document.getElementById('filter');
    cards = cards.filter(function(card) {
        return card.name.toUpperCase().indexOf(filterField.value.toUpperCase()) > -1;

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
    let set;
    if (state.subSet == "neutral"){
        set = 1;
    }else{
        set = 0;
    }

    let cardsPerPage = 6;
    if (cards.length < 6){
        cardsPerPage = cards.length;
    }
    let display = '';
    for(let i=0;i<cardsPerPage;i++){
        const cardId = cards[i + state.pageNumber[set] * 6].id;
        card = `
            <div>
                <img src='https://art.hearthstonejson.com/v1/render/latest/enUS/256x/${cardId}.png' data-cardid=${cardId}>
            </div>
        `
        display += card;
    }

    let cardList = document.getElementById('cards');
    let page = document.getElementById('page');
    let mPage = document.getElementById('maxPage');

    state.maxPage = Math.floor(cards.length / 6);

    cardList.innerHTML = display;
    page.innerHTML = state.pageNumber[set];
    mPage.innerHTML = state.maxPage;
}

async function main(){
    state.cards = await download();
    state.pageNumber = [0,0];
    state.subSet = document.getElementById('class').name;

    let cardList = document.getElementById('cards');
    let tab1 = document.getElementById('class');
    let tab2 = document.getElementById('neutral');

    cardList.addEventListener('click', selectCard);
    tab1.addEventListener('click', selectSubSet);
    tab2.addEventListener('click', selectSubSet);

    printCards();
}

main();