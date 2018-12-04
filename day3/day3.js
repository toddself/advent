const data = require('fs').readFileSync('input.txt', 'utf8').trim().split('\n')

const claims = {}

function overlap (l1, r1, l2, r2) {
  if (l1.x > r2.x || l2.x > r1.x) return false
  if (l1.y < r2.y || l2.y < r1.y) return false
  return true
}

function area (l1, r1, l2, r2) {
  const x = Math.max(0, Math.min(r1.x, r2.x) - Math.max(l1.x, l2.x))
  const y = Math.max(0, Math.min(r1.y, r2.y) - Math.max(l1.y, l2.y))
  return x * y
}

for (const row of data) {
  const [, claim, origin, size] = row.match(/^#(\d+?) @ (\d+,\d+?): (\d+x\d+)/)
  const [originX, originY] = origin.split(',')
  const [width, height] = size.split('x')
  claims[claim] = {
    l: {
      x: originX,
      y: originY
    },
    r: {
      x: originX + width,
      y: originY + height
    }
  }
}

let acc = 0
for (const [claim, coords] of Object.entries(claims)) {
   
}
