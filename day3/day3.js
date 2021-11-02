const { readFileSync } = require("fs");
const { join } = require("path");

const data = readFileSync(join(__dirname, "input.txt"), "utf8")
  .trim()
  .split("\n");

const wire1 = data[0].split(",");
const wire2 = data[1].split(",");
/*
const wire1 = "R75,D30,R83,U83,L12,D49,R71,U7,L72".split(",");
const wire2 = "U62,R66,U55,R34,D71,R55,D58,R83".split(",");

const wire1 = "R8,U5,L5,D3".split(",");
const wire2 = "U7,R6,D4,L4".split(",");
*/
const paths = {};

function followWire(wire, paths) {
  let currX = 0;
  let currY = 0;
  const len = wire.length;
  for (let i = 0; i < len; i++) {
    const inst = wire[i];
    const dir = inst[0];
    const dist = parseInt(inst.slice(1), 10);
    switch (dir) {
      case "U":
        for (let j = 0; j < dist; j++) {
          currY++;
          markPath(currX, currY);
        }
        break;
      case "R":
        for (let j = 0; j < dist; j++) {
          currX++;
          markPath(currX, currY);
        }
        break;
      case "L":
        for (let j = 0; j < dist; j++) {
          currX--;
          markPath(currX, currY);
        }
        break;
      case "D":
        for (let j = 0; j < dist; j++) {
          currY--;
          markPath(currX, currY);
        }
        break;
    }
  }

  function markPath(x, y) {
    const coord = `${x},${y}`;
    if (paths[coord]) paths[coord] = "X";
    else paths[coord] = "-";
  }
}

function shortestDistance(paths) {
  let matchDistance = Infinity;
  Object.keys(paths).forEach(key => {
    if (paths[key] === "X") {
      const [x, y] = key.split(",").map(a => Math.abs(parseInt(a, 10)));
      console.log("x and y", x, y);
      const dist = x + y;
      console.log("Match", key, "dist", dist);
      if (dist < matchDistance) matchDistance = dist;
    }
  });
  return matchDistance;
}

followWire(wire1, paths);
followWire(wire2, paths);

console.log("Part 1: Shortest distance", shortestDistance(paths));
