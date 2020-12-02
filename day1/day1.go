package main

import (
	"fmt"

	"github.com/toddself/advent/advent"
)

func main() {
	day1 := false
	day2 := false
	data := advent.GetData("day1")
	for _, op1 := range data {
		for _, op2 := range data {
			if !day1 && op1+op2 == 2020 {
				day1 = true
				fmt.Printf("Part 1: Op1 %v, Op2 %v, Sum: %v\n", op1, op2, op1*op2)
			}
			for _, op3 := range data {
				if !day2 && op1+op2+op3 == 2020 {
					day2 = true
					fmt.Printf("Part 2: Op1 %v, Op2 %v, Op3 %v, Sum: %v\n", op1, op2, op3, op1*op2*op3)
				}
			}
		}
	}
}
