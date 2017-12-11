/*
const input = `b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10`.trim().split('\n')
*/
const input = require('fs').readFileSync('input.txt', 'utf8').trim().split('\n')

const registers = {}
let high

function getRegister (reg) {
  if (registers.hasOwnProperty(reg)) {
    return registers[reg]
  }
  registers[reg] = 0
  return 0
}

input.forEach((line) => {
  const [t, op, v, , s, compare, sv] = line.split(' ')
  const value = parseInt(v, 10)
  const sValue = parseInt(sv, 10)
  const source = getRegister(s)
  const proceed = eval(`${source} ${compare} ${sValue}`) // eslint-disable-line 
  if (proceed) {
    const curr = getRegister(t)
    if (op === 'inc') registers[t] = curr + value
    else registers[t] = curr - value
  }
  if (typeof high === 'undefined') {
    high = registers[t]
  } else if (high < registers[t]) {
    high = registers[t]
  }
})

console.log(registers)
console.log(high)
