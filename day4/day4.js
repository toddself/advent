const fs = require('fs')

const required = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
let input = fs.readFileSync('input.txt', 'utf8')
  .trim()
  .replace(/\n\n/g, '=')
  .replace(/\n/g, ' ')
  .split('=')
  .filter(n => n != '')
  .map(n => n.split(' ').reduce((a, b) => {
      const [k, v] = b.split(':').map(a => a.trim())
      a[k] = v
      return a
    }, {})
  )

const eyes = 'amb blu brn gry grn hzl oth'.split(' ')
const total = input.length
let bad1 = 0
let bad2 = 0
input.forEach(passport => {
  const keys = Object.keys(passport)
  let bad = false
  if (!required.every(r => keys.includes(r))) {
    bad1++
    bad = true
  }
  for (const key of keys) {
    if (bad) continue
    const data = passport[key]
    let n
    switch (key) {
      case 'byr':
        n = parseInt(data, 10)
        if (n < 1920 || n > 2002) {
          bad = true
        }
        break
      case 'iyr':
        n = parseInt(data, 10)
        if (n < 2010 || n > 2020) {
          bad = true
        }
        break
      case 'eyr':
        n = parseInt(data, 10)
        if (n < 2020 || n > 2030) {
          bad = true
        }
        break
      case 'hgt':
        const val = parseInt(data.substr(0, data.length - 2), 10)
        if (data.endsWith('cm')) {
          if (val < 150 || val > 193) {
            bad = true
          }
        } else if (data.endsWith('in')) {
          if (val < 59 || val > 76) {
            bad = true
          }
        } else {
          bad = true
        }
        break
      case 'hcl':
        if (!data.match(/^#[a-fA-F0-9]{6}$/)) {
          bad = true
        }
        break
      case 'ecl':
        if (!eyes.includes(data)) {
          bad = true
        }
        break
      case 'pid':
        if (!data.match(/^\d{9}$/)) {
          bad = true
        }
        break
    }
  }

  if (bad) {
    bad2++
  }
})

console.log(`total ${total}, bad1 ${bad1}, good: ${total - bad1}`)
console.log(`total ${total}, bad2 ${bad2}, good: ${total - bad2}`)
