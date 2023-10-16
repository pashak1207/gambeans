export function userStepsToPersentage(array : number[]) : {filter: string, color: string, sum: string}[] {
    const statisticData = [array?.filter(i => i <= 5).length, 
        array?.filter(i => (i >= 5 && i <= 15)).length, 
        array?.filter(i => (i >= 15 && i <= 40)).length,
        array?.filter(i => i >= 40).length]

    const filterData = ["1-5", "5-15", "15-40", "40+"]

    const colors = ["rgba(186, 237, 189, 1)", "rgba(149, 164, 252, 1)", "rgba(28, 28, 28, 1)", "rgba(177, 227, 255, 1)"]

    const total_sum = statisticData.reduce((a, b) => a + b, 0);
    

    return statisticData.map((i, index) => ({ filter: filterData[index], color: colors[index],sum: ((i / total_sum) * 100).toFixed(1)}))
}