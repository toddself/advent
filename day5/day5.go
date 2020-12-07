package main

import (
	"fmt"
	"sort"

	"github.com/toddself/advent/advent"
)

func main() {
	entries := advent.GetData("day5")
	// entries := []string{"FBFBBFFRLR", "BFFFBBFRRR", "FFFBBBFRRR", "BBFFBBFRLL"}

	rowMin := 0
	rowMax := 127
	colMin := 0
	colMax := 7
	seats := []int{}
	maxSeat := 0
	mySeat := 0

	for _, entry := range entries {
		for _, r := range entry {
			if r == 'F' {
				rowMax = ((rowMax - rowMin) / 2) + rowMin
			} else if r == 'B' {
				rowMin = rowMax - ((rowMax - rowMin) / 2)
			} else if r == 'L' {
				colMax = ((colMax - colMin) / 2) + colMin
			} else if r == 'R' {
				colMin = colMax - ((colMax - colMin) / 2)
			}
		}
		id := (rowMin * 8) + colMin
		seats = append(seats, id)
		if maxSeat < id {
			maxSeat = id
		}
		rowMin = 0
		rowMax = 127
		colMin = 0
		colMax = 7
	}

	sl := len(seats)
	sort.Ints(seats[:])
	for i, seat := range seats {
		if i+1 < sl {
			if seat+2 == seats[i+1] {
				mySeat = seat + 1
			}
		}
	}

	fmt.Printf("maxSeat: %+v, my seat: %+v\n", maxSeat, mySeat)
}
