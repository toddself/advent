use std::fs::File;
use std::io::prelude::*;

fn main() {
  let mut f = File::open("input.txt").expect("file not found");
  let mut contents = String::new();
  f.read_to_string(&mut contents).expect("something when wrong");
  let as_strings: Vec<_> = contents.split("").collect();
  let mut numbers: Vec<i32> = as_strings.iter().filter_map(|x| x.parse().ok()).collect();

  if numbers.first() == numbers.last() {
    let first = numbers.first().unwrap().clone();
    numbers.push(first);
  }

  let mut prev = numbers.first().unwrap().clone();
  let mut total = 0;
  let lim = numbers.len();
  for x in 1..lim {
    if prev == numbers[x] {
      total = prev + total;
    }
    prev = numbers[x]
  }

  println!("{}", total)
}
