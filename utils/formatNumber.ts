export function formatNumber(num: number): string {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(2) + 'М';
    } else if (num >= 10000) {
        return (num / 1000).toFixed(0) + 'К';
    } else if (num > 999) {
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    } else {
        return num.toString();
    }
}