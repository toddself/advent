use std::num::ParseIntError;
use std::str::FromStr;

extern crate libadvent;

#[derive(Debug)]
enum Direction {
    Forward,
    Down,
    Up,
    Undefined,
}

#[derive(Debug)]
struct Step {
    direction: Direction,
    count: isize,
}

impl FromStr for Step {
    type Err = ParseIntError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let parts: Vec<&str> = s.split(" ").collect();
        let direction = match parts.get(0) {
            Some(d) => match *d {
                "forward" => Direction::Forward,
                "down" => Direction::Down,
                "up" => Direction::Up,
                _ => Direction::Undefined,
            },
            None => Direction::Undefined,
        };
        let count = match parts.get(1) {
            Some(c) => c.parse()?,
            None => "a".parse()?,
        };
        Ok(Step { direction, count })
    }
}

fn day2(data: Vec<Step>) -> (isize, isize) {
    let mut x = 0;
    let mut y = 0;
    let mut y2 = 0;
    for step in data {
        match step.direction {
            Direction::Forward => {
                x += step.count;
                y2 += y * step.count;
            }
            Direction::Down => y += step.count,
            Direction::Up => y -= step.count,
            Direction::Undefined => {}
        };
    }
    (x * y, x * y2)
}

fn main() {
    let data = libadvent::get_data_as_vec::<Step>(None);
    let res = day2(data);
    println!("part 1: total depth {}", res.0);
    println!("part 2: total depth {}", res.1);
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_depth() {
        let data = libadvent::get_data_as_vec::<Step>(Some("test-input"));
        let res = day2(data);
        assert_eq!(res.0, 150);
        assert_eq!(res.1, 900);
    }
}
