const content = require('fs').readFileSync('input.txt', 'utf8')
// const content = '0\n3\n0\n1\n-3'
const jumps = content.trim().split('\n').map(x => parseInt(x, 10))
const jumps2 = jumps.slice(0)

let idx = 0
let steps = 0

while (idx < jumps.length) {
  const next = idx + jumps[idx]
  jumps[idx]++
  idx = next
  steps++
}

console.log('exit 1 in', steps)

idx = 0
steps = 0

while (idx < jumps2.length) {
  const next = idx + jumps2[idx]
  if (jumps2[idx] >= 3) {
    jumps2[idx] --
  } else {
    jumps2[idx]++
  }
  idx = next
  steps++
}

console.log('exit 2 in', steps)
