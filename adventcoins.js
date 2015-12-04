'use strict'

const crypto = require('crypto')
const input = 'yzbqklnj'
let i = 0
let found5 = false
let found6 = false
do {
  const sum = crypto.createHash('md5').update(`${input}${i}`).digest('hex')

  if (sum.startsWith('00000') && !found5) {
    console.log(`five zero sum: ${sum}, key: ${i}`)
    found5 = true
  }

  if (sum.startsWith('000000') && !found6) {
    console.log(`six zero sum: ${sum}, key: ${i}`)
    found6 = true
  }

  ++i
} while (!found5 || !found6)
