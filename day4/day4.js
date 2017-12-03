const fs = require('fs')
const contents = fs.readFileSync('input.txt', 'utf8')
// const contents = "aaaaa-bbb-z-y-x-123[abxyz]\na-b-c-d-e-f-g-h-987[abcde]\nnot-a-real-room-404[oarel]\ntotally-real-room-200[decoy]"
const input = contents.trim().split('\n')

function getChecksum (line) {
  return line.match(/\[([a-z]+)\]?/)[1]
}

function getName (line) {
  return line.match(/^([a-z-]+)?\d/)[1]
}

function getSector (line) {
  const sector = line.match(/-(\d+)?\[/)[1]
  return parseInt(sector, 10)
}

function count (name, ch) {
  const m = name.match(new RegExp(ch, 'g'))
  if (m) return m.length
  else return 0
}

function getCounts (line) {
  const checksum = getChecksum(line)
  const name = getName(line)
  const chksum = checksum.split('')

  let lastCount = count(name, chksum[0])
  let lastCh = chksum[0]
  let real = true

  const outs = []

  for (let i = 1, len = chksum.length; i < len; i++) {
    const ch = chksum[i]
    const c = count(name, ch)

    if (c > lastCount) {
      /*
      console.log(`ch ${ch}(${c}) has more than previous ${lastCh}(${lastCount})`)
      console.log(line)
      */
      outs.length = 0
      real = false
      break
    }

    if (c === lastCount && lastCh > ch) {
      /*
      console.log(`${c} = ${lastCount} and ${lastCh} is later in the alphabet than ${ch}`)
      console.log(line)
      */
      outs.length = 0
      real = false
      break
    }

    outs.push(`${lastCh}(${lastCount}) > ${ch}(${c})`)
    lastCount = c
    lastCh = ch
  }

  if (real) {
    const sec = getSector(line)
    console.log(outs.join('\n'))
    console.log('good line', line, 'sector', sec)
    console.log('--------------------')
    outs.length = 0
    return sec
  } else {
    return 0
  }
}

console.log('Sector IDs:', input.map(getCounts).reduce((a, i) => (a += i), 0))
