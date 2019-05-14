export default class ChartModel {
    constructor() {
        this.zeroMana = 0;
        this.oneMana = 0;
        this.twoMana = 0;
        this.threeMana = 0;
        this.fourMana = 0;
        this.fiveMana = 0;
        this.sixMana = 0;
        this.sevenMana = 0;
    }

    addMana(manaValue) {
        switch(manaValue) {
            case 0:
                this.zeroMana += 1;
                break;
            case 1:
                this.oneMana += 1;
                break;
            case 2:
                this.twoMana += 1;
                break;
            case 3:
                this.threeMana += 1;
                break;
            case 4:
                this.fourMana += 1;
                break;
            case 5:
                this.fiveMana += 1;
                break;
            case 6:
                this.sixMana += 1;
                break;
            case 7:
                this.sevenMana += 1;
                break;
        }
    }

    removeMana(manaValue) {
                switch(manaValue) {
            case 0:
                this.zeroMana -= 1;
                break;
            case 1:
                this.oneMana -= 1;
                break;
            case 2:
                this.twoMana -= 1;
                break;
            case 3:
                this.threeMana -= 1;
                break;
            case 4:
                this.fourMana -= 1;
                break;
            case 5:
                this.fiveMana -= 1;
                break;
            case 6:
                this.sixMana -= 1;
                break;
            case 7:
                this.sevenMana -= 1;
                break;
        }
    }

    getChartValues() {
        return this
    }
}