const fs = require('fs')
const data = fs.readFileSync('input.txt', 'utf8')
// const data = 'ULL\nRRDDD\nLURDL\nUUUUD'

const input = data.trim().split('\n').map(x => x.trim())

const keypad = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]

const keypad2 = [
  [null, null, 1, null, null],
  [null, 2, 3, 4, null],
  [5, 6, 7, 8, 9],
  [null, 'A', 'B', 'C', null],
  [null, null, 'D', null, null]
]

const pos = {
  x: 1,
  y: 1
}

const pos2 = {
  x: 0,
  y: 2
}

const code = []
const code2 = []

const tab = {
  U: {
    pos: 'y',
    val: -1
  },
  R: {
    pos: 'x',
    val: 1
  },
  L: {
    pos: 'x',
    val: -1
  },
  D: {
    pos: 'y',
    val: 1
  }
}

input.forEach((line) => {
  line.split('').forEach((d) => {
    const p = tab[d]
    let np = pos[p.pos] + p.val
    let np2 = pos2[p.pos] + p.val

    if (np < 0) {
      np = 0
    }

    if (np >= keypad[pos[p.pos]].length) {
      np = keypad[pos[p.pos]].length - 1
    }

    if (np2 < 0) {
      np2 = 0
    }

    if (np2 >= keypad2[pos2[p.pos]].length) {
      np2 = keypad2[pos2[p.pos]].length - 1
    }

    const testPos = Object.assign({}, pos2)
    testPos[p.pos] = np2

    if (keypad2[testPos.y][testPos.x] !== null) {
      pos2[p.pos] = np2
    }

    pos[p.pos] = np
  })

  code.push(keypad[pos.y][pos.x])
  code2.push(keypad2[pos2.y][pos2.x])
})

console.log('Door code', code.join(''))
console.log('Door code 2', code2.join(''))
