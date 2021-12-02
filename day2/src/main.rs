extern crate libadvent;

fn day2(data: Vec<&str>) -> (isize, isize, isize) {
    let mut x = 0;
    let mut y = 0;
    for step in data {}
    (0, 0, 0)
}

fn main() {
    let data = libadvent::get_data_as_vec::<Vec<&str>, &str>();
    let res = day2(data);
    println!("part 1: total depth {}", res.2);
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_depth() {
        let data = vec![
            "forward 5",
            "down 5",
            "forward 8",
            "up 3",
            "down 8",
            "foward 2",
        ];
        let res = day2(data);
        assert_eq!(res.0, 15);
        assert_eq!(res.1, 10);
        assert_eq!(res.2, 150);
    }
}
