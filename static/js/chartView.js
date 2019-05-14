export const updateChartView = chartData => {
    const manaBars = document.querySelectorAll('.mana-graph__fill');

    let maxManaValue = 0;

        for (let [key, value] of Object.entries(chartData)) {
            if(value > maxManaValue) {
                maxManaValue = value;
            }
        }

    manaBars.forEach(bar => {
        const barManaName = bar.dataset.mana_bar;
        const percentageManaFill = Math.floor(chartData[barManaName] / maxManaValue * 100);
        if(isNaN(percentageManaFill)) {
            bar.style.height = `0%`;
        } else {
            bar.style.height = `${percentageManaFill}%`;
        }

        const cardsNumber = bar.previousElementSibling;
        cardsNumber.textContent = chartData[barManaName]
    });
}