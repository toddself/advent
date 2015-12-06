'use strict'

const fs = require('fs')

function parseCoord (coord) {
  const nums = coord.split(',').map(x => parseInt(x, 10))
  const coords = {
    x: nums[0],
    y: nums[1]
  }
  return coords
}

function parseIns (ins) {
  if (ins.startsWith('turn')) {
    ins = ins.substr(5)
  }
  const parts = ins.split(' ')
  const instruction = {
    action: parts[0],
    start: parseCoord(parts[1]),
    end: parseCoord(parts[3])
  }
  return instruction
}

function makeGrid () {
  const gridLen = 1000
  const grid = []
  for (let i = 0; i < gridLen; i++) {
    grid.push(Array(gridLen).fill(0))
  }
  return grid
}

function countLit (grid) {
  let lit = 0
  grid.forEach(row => row.forEach(cell => cell === 1 ? ++lit : 0))
  return lit
}

function countBright (grid) {
  return grid.reduce((acc, row) => acc += row.reduce((acc, cell) => acc += cell, 0), 0)
}

fs.readFile('lights.txt', 'utf8', function (_, data) {
  // data = 'turn on 0,0 through 999,999\ntoggle 0,0 through 999,0\nturn off 499,499 through 500,500'
  // the above should make 998996 lights turn on. all 1000000 on, then 1000 off and then 4 off
  // data = 'turn on 0,0 through 0,0\ntoggle 0,0 through 999,999'
  // the above data should make a brightness of 2000001
  const grid = makeGrid()
  const grid2 = makeGrid()

  data.split('\n').filter(x => x).forEach(function (row) {
    const instruction = parseIns(row)
    const startRow = instruction.start.y
    const rowLen = instruction.end.y
    const startColumn = instruction.start.x
    const columnLen = instruction.end.x
    for (let i = startRow; i <= rowLen; i++) {
      for (let j = startColumn; j <= columnLen; j++) {
        if (instruction.action === 'on') {
          grid[i][j] = 1
          grid2[i][j] += 1
        } else if (instruction.action === 'off') {
          grid[i][j] = 0
          grid2[i][j] -= 1
          grid2[i][j] = Math.max(0, grid2[i][j])
        } else if (instruction.action === 'toggle') {
          grid[i][j] = grid[i][j] === 1 ? 0 : 1
          grid2[i][j] += 2
        }
      }
    }
  })

  const lit = countLit(grid)
  const brightness = countBright(grid2)
  console.log(`lit ${lit}, bright ${brightness}`)
})
