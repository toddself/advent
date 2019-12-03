const { readFileSync } = require("fs");
const { join } = require("path");

const ops = {
  1: (a, b) => a + b,
  2: (a, b) => a * b
};

const magicResult = 19690720;

const data = readFileSync(join(__dirname, "input.txt"), "utf8")
  .trim()
  .split(",")
  .map(a => parseInt(a, 10));

function calculateValue(stack, noun, verb) {
  stack[1] = noun;
  stack[2] = verb;
  let opSkip = 4;

  for (let i = 0; i < stack.length; i += opSkip) {
    const inst = stack[i];
    if (inst === 99) {
      return stack[0];
    } else if (inst > 2) {
      console.log("OH NO CRASH", inst);
    }
    const currOp = ops[inst];
    const nounAddress = stack[i + 1];
    const verbAddress = stack[i + 2];
    const outAddress = stack[i + 3];
    stack[outAddress] = currOp(stack[nounAddress], stack[verbAddress]);
  }
}

const part1 = calculateValue(data.slice(0), 12, 2);
console.log("part 1", part1);

for (let noun = 0; noun < 100; noun++) {
  for (let verb = 0; verb < 100; verb++) {
    const result = calculateValue(data.slice(0), noun, verb);
    if (result === magicResult) {
      console.log("part 2", 100 * noun + verb);
    }
  }
}
