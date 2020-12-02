package advent

import (
	"io/ioutil"
	"os"
	"path"
	"strconv"
	"strings"
)

func GetData(day string) []string {
	wd, err := os.Getwd()
	if err != nil {
		panic(err)
	}
	dataFile := path.Join(wd, day, "input.txt")
	data, err := ioutil.ReadFile(dataFile)
	if err != nil {
		panic(err)
	}
	d := strings.TrimSpace(string(data))
	return strings.Split(d, "\n")
}

func GetDataAsInt(day string) []int {
	entries := []int{}
	lines := GetData(day)
	for _, n := range lines {
		if val, err := strconv.Atoi(n); err == nil {
			entries = append(entries, val)
		}
	}

	return entries
}
