extern crate libadvent;

fn day1(data: Vec<isize>) -> (isize, isize) {
    let mut incr = 0;
    let mut incr2 = 0;

    for i in 1..data.len() {
        if data[i - 1] < data[i] {
            incr += 1
        }

        if i > 2 {
            let sum1 = data[i] + data[i - 1] + data[i - 2];
            let sum2 = data[i - 1] + data[i - 2] + data[i - 3];
            if sum1 > sum2 {
                incr2 += 1
            }
        }
    }

    (incr, incr2)
}

fn main() {
    let data = libadvent::get_data_as_vec_isize();
    let res = day1(data);
    println!("part 1: incremented {}", res.0);
    println!("part 2: incremented {}", res.1);
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_increment() {
        let data = vec![199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
        let res = day1(data);
        assert_eq!(res.0, 7);
        assert_eq!(res.1, 5);
    }
}
