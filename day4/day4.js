const fs = require('fs')
const content = fs.readFileSync('input.txt', 'utf8').trim().split('\n')
/*
const content = 'aa bb cc dd ee\naa bb cc dd aa\naa bb cc dd aaa\n'.trim()
const content = 'abcde fghij\nabcde xyz ecdab\na ab abc abd abf abj\niiii oiii ooii oooi oooo\noiii ioii iioi iiio'.trim().split('\n')
*/
console.log('part 1:', content.filter(line => {
  const l = line.split(' ').map(x => x.trim())
  return l.length === [...new Set(l)].length
}).length)

console.log('part 2:', content.filter(line => {
  const l = line.split(' ').map(x => x.trim()).map(x => x.split('').sort().join(''))
  return l.length === [...new Set(l)].length
}).length)
