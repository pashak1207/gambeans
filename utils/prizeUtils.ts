enum Prize_type {
    SCRATCH = "SCRATCH",
    SLOT = "SLOT",
    FREE = "FREE",
    FIRST = "FIRST",
}

const PrizeUtils = {
    generatePrizeStepImage(type: Prize_type){
        const path = "/prizes/"

        switch(type){
            case Prize_type.FIRST:
                return path + "first.svg"
            case Prize_type.FREE:
                return path + "free.svg"
            case Prize_type.SLOT:
                return path + "slot.svg"
            default:
                return path + `${Math.floor(Math.random() * 7) + 1}.svg`
        }
    },

    getRandomElements(arr:any[], n:number) {
        let shuffled = arr.slice(0), i = arr.length, temp, index;

        while (i--) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }
        
        return shuffled.slice(0, n);
    },

    getRandomInt(min:number, max:number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    generateWinNumber() {
        var digit = Math.floor(Math.random() * 9) + 1;
        return parseInt(digit.toString().repeat(3));
    }
}

export default PrizeUtils