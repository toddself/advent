extern crate libadvent;

fn get_bit(num: usize, x: usize) -> bool {
    num & (1 << x) != 0
}

fn day3(data: Vec<String>) -> (usize, isize) {
    let len = data.len();
    let counter = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let counts = data
        .into_iter()
        .filter_map(|x| usize::from_str_radix(x.as_str(), 2).ok())
        .fold(counter, |mut acc, num| {
            for i in 0..16 {
                if get_bit(num, i) {
                    acc[15 - i] += 1
                }
            }
            acc
        });

    let mut gamma = String::new();
    let mut epsilon = String::new();
    for c in counts {
        if c == 0 {
            continue;
        }
        if c > (len - c) {
            gamma.push('1');
            epsilon.push('0');
        } else {
            gamma.push('0');
            epsilon.push('1');
        }
    }

    let gamma = usize::from_str_radix(gamma.as_str(), 2).unwrap();
    let epsilon = usize::from_str_radix(epsilon.as_str(), 2).unwrap();

    (gamma * epsilon, 0)
}

fn main() {
    let data = libadvent::get_data_as_vec::<String>(None);
    let res = day3(data);
    println!("part 1: power consumption {}", res.0);
    println!("part 2: power consumption {}", res.1);
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_day() {
        let data = libadvent::get_data_as_vec::<String>(Some("test-input"));
        let res = day3(data);
        assert_eq!(res.0, 198);
    }
}
