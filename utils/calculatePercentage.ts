export function calculatePercentage(oldValue:number, newValue:number):number {
    let percentage = ((newValue - oldValue) / oldValue) * 100;
    
    if(!isFinite(percentage)){
        return 0
    }    
    
    return parseFloat(percentage % 1 === 0 ? percentage.toFixed(0) : percentage.toFixed(2));
}