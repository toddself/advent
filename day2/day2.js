Array.prototype.min = function () { return this.reduce((a, x) => a < x ? a : x, this[0])}
Array.prototype.max = function () { return this.reduce((a, x) => a > x ? a : x, this[0])}
var input = require('fs').readFileSync('input.txt', 'utf8').trim().split('\n').map(x => x.split('\t').map(x => parseInt(x, 10)))
const checksum1 = input.reduce((a, b) => (a = a + (b.max() - b.min())), 0)
const checksum2 = input.reduce((acc, row) => acc += row.reduce((acc, el, i) => acc = el / row.find((el2, j) => i !== j && el % el2 === 0) || acc, 0), 0)

console.log('Checksum 1:', checksum1)
console.log('Checksum 2:', checksum2)
