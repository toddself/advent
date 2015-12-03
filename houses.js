'use strict'

const fs = require('fs')

fs.readFile('houses.txt', 'utf8', function (_, data) {
  // data = '^v^v^v^v^v'
  // given the above input, results should be 2 and 11
  const grid = {}
  const dirs = data.split('')
  let x = 0
  let y = 0
  const grid2 = {}
  const pos = {
    santa: {x: 0, y: 0},
    robo: {x: 0, y: 0}
  }
  grid2[`0,0`] = 2
  grid[`${x},${y}`] = 1
  dirs.forEach(function (dir, idx) {
    const move = idx % 2 === 0 ? 'santa' : 'robo'
    switch (dir) {
      case '>':
        ++x
        ++pos[move].x
        break
      case '<':
        --x
        --pos[move].x
        break
      case 'v':
        ++y
        ++pos[move].y
        break
      case '^':
        --y
        --pos[move].y
        break
      default:
        break
    }
    const update = `${x},${y}`
    const update2 = `${pos[move].x},${pos[move].y}`
    grid[update] ? grid[update] += 1 : grid[update] = 1
    grid2[update2] ? grid2[update2] += 1 : grid2[update2] = 1
  })

  console.log(`houses receiving a gift in year one: ${Object.keys(grid).length}`)
  console.log(`houses receiving a gift in year two: ${Object.keys(grid2).length}`)
})
