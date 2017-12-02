const fs = require('fs')
const input = fs.readFileSync('input.txt', 'utf8').trim().split(',').map(x => x.trim())
// const input = 'R8, R4, R4, R8'.trim().split(',').map(x => x.trim())

const counter = [0, 0, 0, 0]
const dirAsNum = {
  R: 1,
  L: 3
}

let last = 0
let pos = [0, 0]
let found = false

const visited = {
  '0,0': true
}

function calc () {
  const updown = Math.abs(counter[0] - counter[2])
  const leftright = Math.abs(counter[1] - counter[3])
  return updown + leftright
}

input.forEach((d) => {
  const turn = d[0].toUpperCase()
  const blocks = parseInt(d.substr(1), 10)
  const dirNum = dirAsNum[turn]

  last = (last + dirNum) % counter.length
  const index = last % 2
  const step = last === 0 || last === 1 ? 1 : -1

  if (!found) {
    for (let i = 0; i < blocks; i++) {
      pos[index] = pos[index] + step
      if (visited[pos.join(',')]) {
        console.log('Part 2 total', Math.abs(pos[0] + pos[1]))
        found = true
        break
      }
      visited[pos.join(',')] = true
    }
  }

  counter[last] += blocks
})

console.log('Part 1 total', calc())
