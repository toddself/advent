package main

import (
	"fmt"

	"github.com/toddself/advent/advent"
)

func getPos(x int, row string) string {
	return string(row[x])
}

func getTreeCount(xStep, yStep int, entries []string) int {
	x := 0
	y := 0
	tree := "#"
	slopeHeight := len(entries)
	treeCount := 0

	for y < slopeHeight {
		row := entries[y]
		if square := getPos(x, row); square == tree {
			fmt.Printf("tree found at %+v,%+v. row: %+v\n", x, y, row)
			treeCount += 1
		}
		rowLen := len(row)
		x = x + xStep
		if x >= rowLen {
			x = x % rowLen
		}
		y = y + yStep
	}

	return treeCount
}

func main() {
	entries := advent.GetData("day3")

	part1 := getTreeCount(3, 1, entries)
	fmt.Printf("Part 1: total trees: %+v\n", part1)

	part2_1 := getTreeCount(1, 1, entries)
	part2_3 := getTreeCount(5, 1, entries)
	part2_4 := getTreeCount(7, 1, entries)
	part2_5 := getTreeCount(1, 2, entries)
	product := part2_1 * part1 * part2_3 * part2_4 * part2_5

	fmt.Printf("1,1: %+v, 3,1: %+v, 5,1: %+v, 7,1: %+v, 1,2: %+v, total: %+v\n", part2_1, part1, part2_3, part2_4, part2_5, product)
}
