export function isNumeric(num: any): boolean {
    if (typeof num === 'number') {
        return true
    }

    if (typeof num !== 'string') {
        return false
    }

    return !isNaN(+num) && !isNaN(parseFloat(num))
}
