package main

import (
	"fmt"
	"strconv"
	"strings"

	"github.com/toddself/advent/advent"
)

func parseIns(s string) (ins string, count int) {
	splits := strings.Split(s, " ")
	ins = splits[0]
	count, err := strconv.Atoi(splits[1])
	if err != nil {
		panic(err)
	}
	return ins, count
}

func hasLaterIns(haystack []int, ins int) bool {
	for _, c := range haystack {
		if c > ins {
			return true
		}
	}
	return false
}

func main() {
	entries := advent.GetData("day8")
	// entries := []string{"nop +0", "acc +1", "jmp +4", "acc +3", "jmp -3", "acc -99", "acc +1", "jmp -4", "acc +6"}

	acc := 0
	pos := 0
	maxIns := len(entries)
	seen := make([]int, 0, maxIns)
	for true {
		if advent.ContainsInt(seen, pos) {
			fmt.Printf("Part 1 Accumulator is %+v\n", acc)
			break
		}

		entry := entries[pos]

		ins, count := parseIns(entry)

		if ins == "nop" {
			seen = append(seen, pos)
			pos++
		} else if ins == "acc" {
			seen = append(seen, pos)
			pos++
			acc += count
		} else if ins == "jmp" {
			seen = append(seen, pos)
			pos += count
		}
	}

	acc2 := 0
	pos2 := 0
	currChange := 0
	skipChange := 0
	madeChange := false
	seen2 := make([]int, 0, maxIns)
	for pos2 < maxIns {
		entry := entries[pos2]
		ins, count := parseIns(entry)

		if ins == "nop" {
			seen = append(seen2, pos2)
			next := pos2 + 1
			if next < maxIns && hasLaterIns(seen2, next) && !madeChange && currChange != skipChange {
				// make it a jmp instead
				fmt.Printf("entry was nop, changing to jmp %+v\n", count)
				pos2 += count
				madeChange = true
				currChange++
			} else {
				pos2++
			}
		} else if ins == "acc" {
			seen2 = append(seen2, pos2)
			pos2++
			acc2 += count
		} else if ins == "jmp" {
			seen2 = append(seen2, pos2)
			next := pos2 + count
			if next < maxIns && hasLaterIns(seen2, next) && !madeChange && currChange != skipChange {
				fmt.Printf("entry was jmp, changing to nop %+v\n", count)
				pos2++
				madeChange = true
				currChange++
			} else {
				pos2 += count
			}
		}
	}

	fmt.Printf("Accumulator 2: %+v", acc2)

}
