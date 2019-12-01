const { readFileSync } = require("fs");
const { join } = require("path");

function getFuel(weight) {
  const fuel = Math.floor(weight / 3) - 2;
  return fuel;
}

function getFuelForFuel(weight, total) {
  const fuel = getFuel(weight);
  if (fuel < 0) return total;
  total += fuel;
  return getFuelForFuel(fuel, total);
}

function sum(a, x) {
  return (a += x);
}

const a = readFileSync(join(__dirname, "./input.txt"), "utf8")
  .trim()
  .split("\n")
  .map(a => parseInt(a, 10))
  .map(getFuel);

const b = a.map(a => getFuelForFuel(a, 0));

console.log("Fuel total:", a.reduce(sum, 0));
console.log("Fuel for fuel:", b.reduce(sum, 0) + a.reduce(sum, 0));
