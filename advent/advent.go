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

func GetDataGroups(day string) []string {
	wd, err := os.Getwd()
	if err != nil {
		panic(err)
	}
	dataFile := path.Join(wd, day, "input.txt")
	file, err := ioutil.ReadFile(dataFile)
	if err != nil {
		panic(err)
	}

	data := strings.TrimSpace(string(file))
	data = strings.ReplaceAll(string(file), "\n\n", "=")
	return strings.Split(data, "=")
}

func Contains(haystack []string, needle string) bool {
	for _, hay := range haystack {
		if hay == needle {
			return true
		}
	}
	return false
}

func ContainsInt(haystack []int, needle int) bool {
	for _, hay := range haystack {
		if hay == needle {
			return true
		}
	}
	return false
}

func Unique(haystack []string) []string {
	var out []string
	for _, v := range haystack {
		if !Contains(out, v) {
			out = append(out, v)
		}
	}
	return out
}
