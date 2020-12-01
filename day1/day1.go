package main

import (
	"fmt"
	"io/ioutil"
	"strconv"
	"strings"
)

func getData() []int {
	data, err := ioutil.ReadFile("input.txt")
	if err != nil {
		panic(err)
	}

	entries := []int{}
	lines := strings.Split(string(data), "\n")
	for _, n := range lines {
		if val, err := strconv.Atoi(n); err == nil {
			entries = append(entries, val)
		}
	}

	return entries
}

func main() {
	data := getData()
	for _, op1 := range data {
		for _, op2 := range data {
			if op1+op2 == 2020 {
				fmt.Printf("Part 1: Op1 %v, Op2 %v, Sum: %v\n", op1, op2, op1*op2)
			}
			for _, op3 := range data {
				if op1+op2+op3 == 2020 {
					fmt.Printf("Part 2: Op1 %v, Op2 %v, Op3 %v, Sum: %v\n", op1, op2, op3, op1*op2*op3)
				}
			}
		}
	}
}
