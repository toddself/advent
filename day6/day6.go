package main

import (
	"fmt"
	"strings"

	"github.com/toddself/advent/advent"
)

func countDupes(str string) int {
	count := 0
	countMap := make(map[string]int)
	people := strings.Split(strings.TrimSpace(str), "\n")
	groupCount := len(people)
	for _, person := range people {
		for _, v := range strings.Split(person, "") {
			if _, ok := countMap[v]; !ok {
				countMap[v] = 1
			} else {
				countMap[v] += 1
			}
		}
	}

	for _, v := range countMap {
		if v == groupCount {
			count += 1
		}
	}
	return count
}

func main() {
	entries := advent.GetDataGroups("day6")
	// entries := []string{"abc", "a\nb\nc", "ab\nac", "a\na\na\na", "b"}

	part1 := 0
	part2 := 0

	for _, entry := range entries {
		e := strings.ReplaceAll(entry, "\n", "")
		u := advent.Unique(strings.Split(e, ""))
		part1 += len(u)
		part2 += countDupes(entry)
	}

	fmt.Printf("part 1: %+v\n", part1)
	fmt.Printf("part 2: %+v\n", part2)
}
