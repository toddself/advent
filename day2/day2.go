package main

import (
	"errors"
	"fmt"
	"strconv"
	"strings"

	"github.com/toddself/advent/advent"
)

func parse(entry string) (low int, high int, char []rune, password []rune, err error) {
	policy := strings.Split(entry, " ")
	if len(policy) == 3 {
		highlow := strings.Split(policy[0], "-")
		low, err := strconv.Atoi(highlow[0])
		if err != nil {
			panic(err)
		}
		high, err := strconv.Atoi(highlow[1])
		if err != nil {
			panic(err)
		}
		char := []rune(strings.TrimSuffix(policy[1], ":"))
		password := []rune(policy[2])
		return low, high, char, password, nil
	} else {
		return 0, 0, nil, nil, errors.New(fmt.Sprintf("entry %+v did not contain three parts\n", policy))
	}
}

func main() {
	entries := advent.GetData("day2")
	// fmt.Printf("Entries: %+v", entries)

	goodPart1 := 0
	goodPart2 := 0
	for _, entry := range entries {
		low, high, char, password, err := parse(entry)
		if err != nil {
			fmt.Printf("%+v", err)
			continue
		}
		// fmt.Printf("min: %+v, max: %+v, char: %+v, pass: %+v\n", low, high, string(char), string(password))

		count := 0
		hasPart2 := false
		for i, r := range password {
			if r == char[0] {
				count += 1
				pos := i + 1
				if pos == low {
					// fmt.Printf("%+v matched in position %+v\n", string(r), pos)
					hasPart2 = true
				}

				if pos == high {
					// fmt.Printf("%+v matched in position %+v\n", string(r), pos)
					if hasPart2 {
						hasPart2 = false
					} else {
						hasPart2 = true
					}
				}
			}
		}

		if count >= low && count <= high {
			// fmt.Printf("password %+v has %+v %+vs\n", string(password), count, string(char))
			goodPart1 += 1
		}

		if hasPart2 {
			// fmt.Printf("password %+v has only 1 %+v in %+v or %+v\n", string(password), string(char), low, high)
			goodPart2 += 1
		}
	}
	fmt.Printf("Good part 1 passwords: %+v\n", goodPart1)
	fmt.Printf("Good part 2 passwords: %+v\n", goodPart2)
	fmt.Printf("Total passwords: %+v\n", len(entries))
}
