var pageNumber = [0,0];
var maxPage;
var subSet = document.getElementById('class').name;
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
    if (subSet == "neutral"){
        set = 1;
    }else{
        set = 0;
    }

    if (button == "previous" && pageNumber[set]>0){
        pageNumber[set] -= 1;
    }
    if (button == "next" && pageNumber[set] < maxPage-1){
        pageNumber[set] += 1;
    }
    display();
}

function selectCard(e) {
    const cardId = e.target.dataset.cardid;
    cardData = state.cards.filter(card => card.id === cardId);
    console.log(cardData[0]);
}

function selectSubSet(e){
    subSet = e.target.name;
    display();
}

function display(){
    cards = state.cards.filter(function(card) {
        return card.cardClass == subSet.toUpperCase();
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

    let set;
    if (subSet == "neutral"){
        set = 1;
    }else{
        set = 0;
    }

    let display = '';
    for(let i=0;i<6;i++){
        const cardId = cards[i + pageNumber[set] * 6].id;
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

    cardList.innerHTML = display;
    page.innerHTML = pageNumber[set];
    mPage.innerHTML = Math.floor(cards.length / 6);
}

async function main(){
    state.cards = await download();

    let cardList = document.getElementById('cards');
    let tab1 = document.getElementById('class');
    let tab2 = document.getElementById('neutral');

    cardList.addEventListener('click', selectCard);
    tab1.addEventListener('click', selectSubSet);
    tab2.addEventListener('click', selectSubSet);

    display();
}

main();