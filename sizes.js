'use strict'
const fs = require('fs')

fs.readFile('sizes.txt', 'utf8', function (_, data) {
  // data = '1x1x10\n2x3x4'
  // output on that data should be 48 ribbon, 101 paper
  const input = data.split('\n').filter(x => x)
  const totalRibbon = input.reduce((acc, box) => {
    const dims = box.split('x').map(x => parseInt(x, 10)).sort((a, b) => a - b)
    const vol = dims.reduce((a, side) => a *= side, 1)
    const total = dims.slice(0, 2).reduce((a, side) => a += side + side, 0) + vol
    acc += total
    return acc
  }, 0)

  const totalPaper = input.reduce((acc, box) => {
    const dims = box.split('x').map(x => parseInt(x, 10))
    const sides = [dims[0] * dims[1], dims[0] * dims[2], dims[1] * dims[2]].sort((a, b) => a - b)
    const total = sides.reduce((a, side) => a += side * 2, 0) + sides[0]
    acc += total
    return acc
  }, 0)
  console.log(`ribbon: ${totalRibbon} paper: ${totalPaper}`)
})
