extern crate libadvent;

fn day2(data: Vec<String>) -> (isize, isize, isize, isize) {
    let mut x = 0;
    let mut y = 0;
    let mut y2 = 0;
    let mut aim = 0;
    for step in data {
        if step.len() < 2 {
            continue;
        }
        let parts: Vec<&str> = step.split(" ").collect();
        if parts.len() != 2 {
            println!("{} had more than 2 parts", step);
            continue;
        }
        let count: isize = parts[1].parse().unwrap();
        match parts[0] {
            "forward" => {
                x += count;
                y2 += aim * count;
            }
            "down" => {
                y += count;
                aim += count;
            }
            "up" => {
                y -= count;
                aim -= count;
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
    let data = libadvent::get_data_as_vec::<String>();
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
            "forward 5".to_string(),
            "down 5".to_string(),
            "forward 8".to_string(),
            "up 3".to_string(),
            "down 8".to_string(),
            "forward 2".to_string(),
        ];
        let res = day2(data);
        assert_eq!(res.0, 15);
        assert_eq!(res.1, 10);
        assert_eq!(res.2, 150);
        assert_eq!(res.3 * res.0, 900);
    }
}
