use std::num::ParseIntError;
use std::str::FromStr;

extern crate libadvent;

#[derive(Debug)]
struct Step {
    direction: String,
    count: isize,
}

impl FromStr for Step {
    type Err = ParseIntError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let parts: Vec<&str> = s.split(" ").collect();
        let direction = match parts.get(0) {
            Some(d) => d.to_string(),
            None => "".to_string(),
        };
        let count = match parts.get(1) {
            Some(c) => c.parse()?,
            None => "a".parse()?,
        };
        Ok(Step { direction, count })
    }
}

fn day2(data: Vec<Step>) -> (isize, isize, isize, isize) {
    let mut x = 0;
    let mut y = 0;
    let mut y2 = 0;
    let mut aim = 0;
    for step in data {
        match step.direction.as_str() {
            "forward" => {
                x += step.count;
                y2 += aim * step.count;
            }
            "down" => {
                y += step.count;
                aim += step.count;
            }
            "up" => {
                y -= step.count;
                aim -= step.count;
            }
            x => {
                println!("{} was not a valid direction", x);
                continue;
            }
        };
    }
    (x, y, x * y, y2)
}

fn main() {
    let data = libadvent::get_data_as_vec::<Step>();
    let res = day2(data);
    println!("part 1: total depth {}", res.2);
    println!("part 2: total depth {}", res.3 * res.0);
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_depth() {
        let data = vec![
            Step {
                direction: "forward".to_string(),
                count: 5,
            },
            Step {
                direction: "down".to_string(),
                count: 5,
            },
            Step {
                direction: "forward".to_string(),
                count: 8,
            },
            Step {
                direction: "up".to_string(),
                count: 3,
            },
            Step {
                direction: "down".to_string(),
                count: 8,
            },
            Step {
                direction: "forward".to_string(),
                count: 2,
            },
        ];
        let res = day2(data);
        assert_eq!(res.0, 15);
        assert_eq!(res.1, 10);
        assert_eq!(res.2, 150);
        assert_eq!(res.3 * res.0, 900);
    }
}
