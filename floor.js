'use strict'
const fs = require('fs')

fs.readFile('floor.txt', 'utf8', function (_, data) {
  data = data.trim()
  let floor = 0
  let posFound = false
  data.split('').forEach((chr, idx) => {
    chr === '(' ? ++floor : --floor
    if (floor === -1 && !posFound) {
      console.log(`position ${idx + 1}`)
      posFound = true
    }
  })
  console.log(`floor: ${floor}`)
})
