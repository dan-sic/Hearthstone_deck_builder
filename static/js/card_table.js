var pageNumber = 0;
var maxPage;
const state = {};

function download(){
  return fetch('https://api.hearthstonejson.com/v1/30103/enUS/cards.collectible.json')
  .then(function(response) {
    return response.json();
  });
}

function changePage(event){
    let button = event.target.id;
    if (button == "previous" && pageNumber>0){
        pageNumber--;
    }
    if (button == "next" && pageNumber < maxPage-1){
        pageNumber++;
    }
    main();
}

function selectCard(e) {
    const cardId = e.target.dataset.cardid;
    cardData = state.cards.filter(card => card.id === cardId);
    console.log(cardData[0]);
}

async function main(){
    state.cards = await download();

    state.cards = state.cards.filter(function(card) {
        let div = document.getElementById('cardClass');
        let cardClass = div.getAttribute('data-name').toUpperCase();
        return card.cardClass == cardClass;
    });

    state.cards.sort(function (a, b) {
        if (a.cost < b.cost){
            return -1;
        }
        if (a.cost > b.cost){
            return 1;
        }
        return 0;
    });

    maxPage = Math.floor(state.cards.length / 6);

    let display = '';

    let cardList = document.getElementById('cards');
    let page = document.getElementById('page');

    for(let i=0;i<6;i++){
        const cardId = state.cards[i + pageNumber * 6].id;
        card = `
            <div>
                <img src='https://art.hearthstonejson.com/v1/render/latest/enUS/256x/${cardId}.png' data-cardid=${cardId}>
            </div>
        `
        display += card;
    }

    cardList.innerHTML = display;
    page.innerHTML = pageNumber;

    cardList.addEventListener('click', selectCard)




}

main();