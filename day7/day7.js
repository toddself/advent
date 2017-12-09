let input = require('fs').readFileSync('input.txt', 'utf8').trim().split('\n')
/*
let input = `pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)`.trim().split('\n')
*/

const nodeList = []

class Node {
  constructor (name, weight, children) {
    this.name = name
    this._weight = weight
    this.children = children || []
    this.parent = null
  }

  get weight () {
    return this._weight + this.children.reduce((a, c) => (a += c.weight), 0)
  }
}

function parseLine (line) {
  const [name, w, , ...rest] = line.split(' ')
  const weight = parseInt(w.substr(1, w.length - 2), 10)
  const children = rest.join('').split(',').filter(x => x)
  return {name, weight, children}
}

function makeNode (line) {
  const data = parseLine(line)
  const node = new Node(data.name, data.weight)
  if (data.children.length > 0) {
    node.children = data.children.map((child) => {
      let idx = input.findIndex((x) => {
        return x.startsWith(child)
      })

      if (idx === -1) {
        idx = nodeList.findIndex((node) => {
          return node.name === child
        })

        if (idx === -1) {
          console.log('CANNOT FIND NODE', child)
          console.log(nodeList, input)
          process.exit(1)
        }

        const childNode = nodeList.splice(idx, 1)[0]
        childNode.parent = node
        return childNode
      }

      const line = input.splice(idx, 1)[0]
      const childNode = makeNode(line, node)
      childNode.parent = node
      return childNode
    })
  }
  nodeList.push(node)
  return node
}

while (input.length !== 0) {
  makeNode(input.pop())
}

const root = nodeList.filter((node) => node.parent === null)[0]
console.log('root node', root.name)

function balance (node) {
  if (node.children.length === 0) {
    return
  }
  const weights = node.children.map(c => ({name: c.name, weight: c.weight}))
  if (new Set(weights.map(w => w.weight)).size !== 1) {
    console.log(node.name, 'children', weights)
    node.children.map((c) => {
      console.log('gonna try to balance', c.name, c._weight)
      balance(c)
    })
  }
}

balance(root)
