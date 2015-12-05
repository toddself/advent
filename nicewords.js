'use strict'

const fs = require('fs')

const bad = ['ab', 'cd', 'pq', 'xy']
const badLen = bad.length
const vowel = ['a', 'e', 'i', 'o', 'u']
const vowelLen = vowel.length

function hasBad (word) {
  for (let j = 0; j < badLen; j++) {
    if (word.includes(bad[j])) {
      return true
    }
  }
  return false
}

function vowels (word) {
  let count = 0
  for (let i = 0; i < vowelLen; i++) {
    let re = new RegExp(`[^${vowel[i]}]`, 'g')
    count += word.replace(re, '').length
  }

  return count >= 3
}

function hasDupe (word) {
  for (let i = 1; i < word.length; i++) {
    if (word[i] === word[i - 1]) {
      return true
    }
  }
  return false
}

function hasPairs (word) {
  for (let i = 1; i < word.length; i++) {
    const pair = `${word[i - 1]}${word[i]}`
    for (let j = 1; j < word.length; j++) {
      const pair2 = `${word[j - 1]}${word[j]}`
      if (pair === pair2 && ((j < i - 1) || (j > i + 1))) {
        return true
      }
    }
  }
  return false
}

function repeatSkip (word) {
  for (let i = 2; i < word.length; i++) {
    if (word[i - 2] === word[i]) {
      return true
    }
  }
  return false
}

fs.readFile('nicewords.txt', 'utf8', function (_, data) {
  // data = 'ugknbfddgicrmopn\naaa\njchzalrnumimnmhp\nhaegwjzuvuyypxyu\ndvszwmarrgswjxmb'
  // nice should have only 2 good words in above list
  // data = 'qjhvhtzxzqqjkmpb\nxxyxx\nuurcxstgmygtbstg\nieodomkazucvgmuy'
  // nice2 should have one 2 good words in the above list
  const words = data.split('\n')
  let nice = 0
  let nice2 = 0
  for (let i = 0, len = words.length; i < len; i++) {
    const word = words[i]
    if (!hasBad(word) && hasDupe(word) && vowels(word)) {
      ++nice
    }
    if (hasPairs(word) && repeatSkip(word)) {
      ++nice2
    }
  }
  console.log(`nice words ${nice}`)
  console.log(`nice2 words ${nice2}`)
})
