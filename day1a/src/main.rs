use std::fs::File;
use std::io::prelude::*;

fn main() {
  let mut f = File::open("input.txt").expect("file not found");
  let mut contents = String::new();
  f.read_to_string(&mut contents).expect("something when wrong");
  let as_strings: Vec<_> = contents.split("").collect();
  let numbers: Vec<i32> = as_strings.iter().filter_map(|x| x.parse().ok()).collect();

  let lim = numbers.len();
  let mut compare = lim / 2;
  let mut total = 0;

  for x in 0..lim {
    if numbers[x] == numbers[compare] {
      total = total + numbers[x];
    }

    compare = (compare + 1) % lim
  }

  println!("{}", total)
}
