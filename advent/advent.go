package advent

import (
	"io/ioutil"
	"os"
	"path"
	"strconv"
	"strings"
)

func GetData(day string) []int {
	wd, err := os.Getwd()
	if err != nil {
		panic(err)
	}
	dataFile := path.Join(wd, day, "input.txt")
	data, err := ioutil.ReadFile(dataFile)
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
