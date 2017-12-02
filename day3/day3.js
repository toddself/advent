const fs = require('fs')
const input = fs.readFileSync('input.txt', 'utf8').trim().split('\n')
/*
const input = [
  '101 301 501',
  '102 302 502',
  '103 303 503',
  '201 401 601',
  '202 402 602',
  '203 403 603'
]
*/

const vals = input.map(x => x.trim().split(' ').filter(y => y.trim()).map(y => parseInt(y.trim(), 10)))

const vals2 = []
for (let i = 0, len = vals.length; i < len; i += 3) {
  for (let col = 0; col < 3; col++) {
    const triangle = []
    for (let k = 0; k < 3; k++) {
      const row = k + i
      triangle.push(vals[row][col])
    }
    vals2.push(triangle)
  }
}

let count = 0
let count2 = 0

function isValidTriangle (x, y, z) {
  const side1 = x + y
  const side2 = y + z
  const side3 = x + z

  return side1 > z && side2 > x && side3 > y
}

vals.forEach((triplet) => {
  if (isValidTriangle(...triplet)) {
    ++count
  }
})

vals2.forEach((triplet) => {
  if (isValidTriangle(...triplet)) {
    ++count2
  }
})

console.log('Part 1', count)
console.log('Part 2', count2)
