const inputTxt = require('fs').readFileSync('input.txt', 'utf8')
// const inputTxt = '0\t2\t7\t0\n'
const inputs = inputTxt.trim().split('\t').map(x => parseInt(x, 10))
let blocks = inputs.slice(0)
const states = []
let count = 0
let loop = true

function findMaxIndex (arr) {
  let prev = -1
  let idx = 0

  for (let i = 0, len = arr.length; i < len; i++) {
    if (prev < arr[i]) {
      prev = arr[i]
      idx = i
    }
  }

  return idx
}

function makeState (bank) {
  const len = bank.length
  let curr = findMaxIndex(bank)
  let dist = bank[curr]
  bank[curr] = 0

  while (dist > 0) {
    curr = (curr + 1) % len
    bank[curr] += 1
    --dist
  }

  return bank
}

do {
  blocks = makeState(blocks.slice(0))
  if (states.includes(blocks.join(','))) loop = false
  states.push(blocks.join(','))
  ++count
} while (loop === true)

console.log('Loops to duplicate state', count)
const last = states.length - 1
const first = states.findIndex(state => state === states[last])
console.log(`${states[last]} first appears at ${first}, loop length is ${last - first}`)
