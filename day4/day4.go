package main

import (
	"fmt"
	"io/ioutil"
	"regexp"
	"strconv"
	"strings"

	"github.com/toddself/advent/advent"
)

func getPassports() []map[string]string {
	var passports []map[string]string

	file, err := ioutil.ReadFile("day4/input.txt")
	if err != nil {
		panic(err)
	}

	data := strings.TrimSpace(string(file))
	data = strings.ReplaceAll(string(file), "\n\n", "=")
	data = strings.ReplaceAll(data, "\n", " ")

	for _, row := range strings.Split(data, "=") {
		pass := make(map[string]string)
		for _, field := range strings.Split(strings.TrimSpace(row), " ") {
			data := strings.Split(field, ":")
			if len(data) == 2 {
				pass[strings.TrimSpace(data[0])] = strings.TrimSpace(data[1])
			} else {
				fmt.Printf("invalid passport: %+v\n", row)
			}
		}
		passports = append(passports, pass)
	}
	return passports
}

func dataAsInt(data string) int {
	i, err := strconv.Atoi(data)
	if err != nil {
		return -1
	}
	return i
}

func main() {
	requiredFields := []string{"byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"}
	validColor := regexp.MustCompile(`^#[A-Fa-f0-9]{6}$`)
	validPid := regexp.MustCompile(`^[0-9]{9}$`)
	validYear := regexp.MustCompile(`^\d{4}$`)
	validEye := []string{"amb", "blu", "brn", "gry", "grn", "hzl", "oth"}

	passports := getPassports()
	totalPassports := len(passports)

	invalidPart1Count := 0
	invalidPart2Count := 0

	for _, passport := range passports {
		bad := false

		for _, req := range requiredFields {
			if _, ok := passport[req]; !ok {
				bad = true
			}
		}

		if bad {
			invalidPart1Count += 1
		}

		// if the keys exist, validate for part2
		if !bad {
			for _, required := range requiredFields {
				data := passport[required]
				switch required {
				case "byr":
					birthyear := dataAsInt(data)
					if validYear.MatchString(data) && (birthyear < 1920 || birthyear > 2002) {
						bad = true
					}
				case "iyr":
					issueYear := dataAsInt(data)
					if validYear.MatchString(data) && (issueYear < 2010 || issueYear > 2020) {
						bad = true
					}
				case "eyr":
					expirationYear := dataAsInt(data)
					if validYear.MatchString(data) && (expirationYear < 2020 || expirationYear > 2030) {
						bad = true
					}
				case "hgt":
					if strings.HasSuffix(data, "cm") {
						cm := dataAsInt(strings.TrimSuffix(data, "cm"))
						if cm < 150 || cm > 193 {
							bad = true
						}
					} else if strings.HasSuffix(data, "in") {
						in := dataAsInt(strings.TrimSuffix(data, "in"))
						if in < 59 || in > 76 {
							bad = true
						}
					} else {
						bad = true
					}
				case "hcl":
					if !validColor.MatchString(data) {
						bad = true
					}
				case "ecl":
					if !advent.Contains(validEye, data) {
						bad = true
					}
				case "pid":
					if !validPid.MatchString(data) {
						bad = true
					}
				}
			}
		}

		if bad {
			invalidPart2Count++
		}
	}

	fmt.Printf("total passports: %+v\n", totalPassports)
	fmt.Printf("valid passports, bad: %+v, part 1: %+v\n", invalidPart1Count, (totalPassports - invalidPart1Count))
	fmt.Printf("valid passports, bad: %+v, part 2: %+v\n", invalidPart2Count, (totalPassports - invalidPart2Count))
}
