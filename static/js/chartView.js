export const updateChartView = manaChartData => {
    const manaBars = document.querySelectorAll('.mana-graph__fill');

    let highestNumberOfCardsWithSameManaCost = 0;

        for (let [manaCost, numberOfCards] of Object.entries(manaChartData)) {
            if(numberOfCards > highestNumberOfCardsWithSameManaCost) {
                highestNumberOfCardsWithSameManaCost = numberOfCards;
            }
        }

    manaBars.forEach(bar => {
        const manaCost = bar.dataset.mana_bar;
        const numberOfCardsWithCurrentManaCost = manaChartData[manaCost];
        const percentageManaFill = Math.floor(numberOfCardsWithCurrentManaCost / highestNumberOfCardsWithSameManaCost * 100);

        if(isNaN(percentageManaFill)) {
            bar.style.height = `0%`;
        } else {
            bar.style.height = `${percentageManaFill}%`;
        }

        const barLabelNumberOfCards = bar.previousElementSibling;
        barLabelNumberOfCards.textContent = numberOfCardsWithCurrentManaCost;
    });
}