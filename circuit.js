'use strict'

const fs = require('fs')

function parseInstruction (ins) {
  const instruction = {}
  const shit = ins.split('->').map(x => x.trim())
  const input = shit[0]
  instruction.register = shit[1]
  const parts = input.split(' ').map(x => x.trim())
  if (parts.length === 1) {
    instruction.operator = 'STORE'
    instruction.value = parseInt(parts[0], 10) || parts[0]
  } else if (parts[0] === 'NOT') {
    instruction.operator = 'NOT'
    instruction.input1 = parts[1]
  } else {
    instruction.input1 = parts[0]
    instruction.operator = parts[1]
    instruction.input2 = parts[2]
  }

  return instruction
}

function operation (left, op, right) {
  let val
  switch (op) {
    case 'NOT':
      val = 65536 + (~left)
      break
    case 'AND':
      val = left & right
      break
    case 'OR':
      val = left | right
      break
    case 'LSHIFT':
      val = left << right
      break
    case 'RSHIFT':
      val = left >> right
      break
    default:
      break
  }
  return val
}

function pi (v) {
  return parseInt(v, 10)
}

function n (v) {
  return !Number.isNaN(pi(v, 10))
}

function runOps (operations, register) {
  let loops = 0
  let i = 0
  while (operations.length) {
    const op = operations[i]
    if (op) {
      if (op.operator === 'STORE') {
        if (n(op.value) || n(register[op.value])) {
          const val = pi(op.value) || pi(register[op.value])
          register[op.register] = val
          operations.splice(i, 1)
        }
      } else {
        const in1 = n(op.input1) ? pi(op.input1) : register[op.input1]
        const in2 = n(op.input2) ? pi(op.input2) : register[op.input2]
        if (typeof in1 !== 'undefined' && (op.operator === 'NOT' || typeof in2 !== 'undefined')) {
          const val = operation(in1, op.operator, in2)
          if (Number.isNaN(val)) {
            console.log(`what nan? ${val}`)
            process.exit()
          }
          register[op.register] = val
          operations.splice(i, 1)
        }
      }
    }
    if (i + 1 >= operations.length) {
      i = 0
    } else {
      ++i
    }
    ++loops
  }

  console.log(`stack exhausted in ${loops} loops`)
  return register
}

fs.readFile('circuit.txt', 'utf8', function (_, data) {
  // const data = '123 -> x\n456 -> y\nx AND y -> d\nx OR y -> e\nx LSHIFT 2 -> f\ny RSHIFT 2 -> g\nNOT x -> h\nNOT y -> i'
  // register should be Register { x: 123, y: 456, d: 72, e: 507, f: 492, g: 114, h: 65412, i: 65079 }
  const operations = data.trim().split('\n').filter(x => x).map(ins => parseInstruction(ins))
  const reg1 = runOps(operations.slice(0), {})
  console.log(`register a pass 1: ${reg1.a}`)
  operations.unshift({operator: 'STORE', value: reg1.a, register: 'b'})
  const reg2 = runOps(operations.slice(0), {})
  console.log(`register a pass 2: ${reg2.a}`)
})
