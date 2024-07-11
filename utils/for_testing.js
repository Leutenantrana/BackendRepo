const reverse = (string) => {
    return string
        .split('')
        .reverse()
        .join("")
}

const greater = (a, b) => {
    return Number(a) > Number(b) ? a : b
}
const average = (array) => {
    const reducer = (sum, item) => {
        return sum + item
    }
    return array.length === 0 ? 0 : array.reduce(reducer, 0) / array.length
}
const dummy = (blogs) => {
    return 1
}

module.exports = {
    reverse,
    average,
    greater,
    dummy,
}