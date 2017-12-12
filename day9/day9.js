/*
const input = `{{<a!>},{<a!>},{<a!>},{<ab>}}`.trim().split('\n')
const input = `{}
{{{}}}
{{},{}}
{{{},{},{{}}}}
{<a>,<a>,<a>,<a>}
{{<ab>},{<ab>},{<ab>},{<ab>}}
{{<!!>},{<!!>},{<!!>},{<ab>}}
{{<a!>},{<a!>},{<a!>},{<ab>}}`.trim().split('\n')
*/
const input = require('fs').readFileSync('input.txt', 'utf8').trim().split('\n')

function countGroups (line) {
  const groupStack = []
  const garbageStack = []
  let garbValue = 0

  function inGarb () {
    return (garbageStack.length % 2 !== 0)
  }

  let ptr = 0
  do {
    const ch = line[ptr]
    // console.log('ch', ch)

    if (inGarb() && ch === '!') {
      ptr++
      // console.log('negating', line[ptr])
    } else {
      if (ch === '{') {
        if (!inGarb()) {
          // console.log('open group')
          groupStack.push(ch)
        } else {
          garbValue++
        }
      } else if (ch === '}') {
        if (!inGarb()) {
          // console.log('close group')
          groupStack.push(ch)
        } else {
          garbValue++
        }
      } else if (ch === '<') {
        if (!inGarb()) {
          // console.log('open garb')
          garbageStack.push(ch)
        } else {
          garbValue++
        }
      } else if (ch === '>') {
        // console.log('close garb')
        garbageStack.push(ch)
      } else if (inGarb()) {
        garbValue++
      }
    }
    ptr++
  } while (ptr < line.length)

  let tokenValue = 1
  const groupValue = groupStack.reduce((acc, ch) => {
    if (ch === '{') {
      acc += tokenValue
      tokenValue++
    } else {
      tokenValue--
    }
    return acc
  }, 0)

  // console.log('line', line, 'group', groupStack, 'garb', garbageStack, 'value', groupValue)
  return {groupValue, garbValue}
}

const vals = input.reduce((acc, line) => {
  const vals = countGroups(line)
  acc.groups += vals.groupValue
  acc.garb += vals.garbValue
  return acc
}, {groups: 0, garb: 0})

console.log(vals)
