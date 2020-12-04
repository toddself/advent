package main

import (
	"fmt"
	"regexp"
	"strconv"
	"strings"

	"github.com/toddself/advent/advent"
)

func getPassports(entries []string) []map[string]string {
	var passports []map[string]string
	current := ""
	for _, row := range entries {
		if row != "" {
			current = fmt.Sprintf("%v %v\n", current, row)
		} else {
			pass := make(map[string]string)
			for _, field := range strings.Split(strings.TrimSpace(current), " ") {
				data := strings.Split(field, ":")
				if len(data) == 2 {
					pass[data[0]] = data[1]
				} else {
					fmt.Printf("invalid passport: %+v\n", current)
				}
			}
			passports = append(passports, pass)
			current = ""
		}
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
	requiredFields := []string{"ecl", "pid", "eyr", "hcl", "byr", "iyr", "hgt"}
	validColor := regexp.MustCompile(`^#[A-Fa-f0-9]{6}$`)
	validPid := regexp.MustCompile(`^[0-9]{9}$`)
	validEye := "ambblubrngrygrnhzloth"
	entries := advent.GetData("day4")
	passports := getPassports(entries)
	totalPassports := len(passports)

	invalidPart1Count := 0
	invalidPart2Count := 0
	invalid := false
	invalidPart2 := false
	for _, passport := range passports {
		fmt.Printf("passport: %+v\n", passport)
		for _, required := range requiredFields {
			if data, ok := passport[required]; !ok && !invalid {
				invalidPart1Count++
				invalidPart2Count++
				invalid = true
				invalidPart2 = true
			} else if !invalid && !invalidPart2 {
				switch required {
				case "byr":
					birthyear := dataAsInt(data)
					if birthyear < 1920 || birthyear > 2002 {
						fmt.Printf("%+v invalid %+v\n", required, data)
						invalidPart2 = true
						invalidPart2Count++
					}
				case "iyr":
					issueYear := dataAsInt(data)
					if issueYear < 2010 || issueYear > 2020 {
						fmt.Printf("%+v invalid %+v\n", required, data)
						invalidPart2 = true
						invalidPart2Count++
					}
				case "eyr":
					expirationYear := dataAsInt(data)
					if expirationYear < 2020 || expirationYear > 2030 {
						fmt.Printf("%+v invalid %+v\n", required, data)
						invalidPart2 = true
						invalidPart2Count++
					}
				case "hgt":
					if strings.Contains(data, "cm") {
						cm := dataAsInt(strings.TrimSuffix(data, "cm"))
						if cm < 150 || cm > 193 {
							fmt.Printf("%+v invalid %+v\n", required, data)
							invalidPart2 = true
							invalidPart2Count++
						}
					} else if strings.Contains(data, "in") {
						in := dataAsInt(strings.TrimSuffix(data, "in"))
						if in < 59 || in > 76 {
							fmt.Printf("%+v invalid %+v\n", required, data)
							invalidPart2 = true
							invalidPart2Count++
						}
					} else {
						fmt.Printf("%+v invalid %+v\n", required, data)
						invalidPart2 = true
						invalidPart2Count++
					}
				case "hcl":
					if !validColor.MatchString(data) {
						fmt.Printf("%+v invalid %+v\n", required, data)
						invalidPart2 = true
						invalidPart2Count++
					}
				case "ecl":
					if !strings.Contains(validEye, data) {
						fmt.Printf("%+v invalid %+v\n", required, data)
						invalidPart2 = true
						invalidPart2Count++
					}
				case "pid":
					if !validPid.MatchString(data) {
						fmt.Printf("%+v invalid %+v\n", required, data)
						invalidPart2 = true
						invalidPart2Count++
					}
				}
			}
		}
		invalid = false
		invalidPart2 = false
	}

	fmt.Printf("valid passports, part 1: %+v\n", (totalPassports - invalidPart1Count))
	fmt.Printf("valid passports, part 2: %+v\n", (totalPassports - invalidPart2Count))
}
