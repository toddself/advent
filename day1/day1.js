const data = require('fs').readFileSync('./input.txt', 'utf8').trim().split('\n').filter(x => x)
const vals = []

const part1 = data.reduce((acc, val) => {
  acc = eval(`${acc}${val}`)
  vals.push(acc)
  return acc
}, 0)

console.log('part 1:', part1)

let part2 = part1
while (true) {
  data.forEach((val) => {
    part2 = eval(`${part2}${val}`)
    if (vals.includes(part2)) {
      console.log('part 2:', part2)
      process.exit()
    }
    vals.push(part2)
  })
}
