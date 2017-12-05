const fs = require('fs')
const content = fs.readFileSync('input.txt', 'utf8').trim().split('\n')

const compareUnique = (l) => (l.length === (new Set(l).size))
const sortWord = (w) => w.split('').sort().join('')
const splitLine = (l) => l.split(' ')

console.log('part 1:', content.map(splitLine).filter(compareUnique).length)
console.log('part 2:', content.map(splitLine).map(x => x.map(sortWord)).filter(compareUnique).length)
