var pageNumber = 0;
var maxPage;

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

async function main(){
    let cards = await download();

    cards = cards.filter(function(card) {
       return ( card.type == "MINION" || card.type == "SPELL" ) && card.cardClass == "MAGE";
    });

    maxPage = Math.floor(cards.length / 6);

    let display = '';

    let cardList = document.getElementById('cards');
    let page = document.getElementById('page');

    for(let i=0;i<6;i++){
        display += cards[i + pageNumber * 6].name;
        display += `<img src='https://art.hearthstonejson.com/v1/render/latest/enUS/256x/${cards[i + pageNumber * 6].id}.png'>`;
    }

    cardList.innerHTML = display;
    page.innerHTML = pageNumber;

}

main();