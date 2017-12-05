use std::fs::File;
use std::io::prelude::*;

fn main() {
  let mut f = File::open("input.txt").expect("file not found");
  let mut contents = String::new();
  f.read_to_string(&mut contents).expect("something when wrong");
  let rows: Vec<Vec<*str>> = contents.trim().split("\n").map(|x| x.split("").map(|x| x.trim())).collect()).collect());

  let deduped = rows.filter(|line| line.len() = line.clone().sort().dedupe().len()).len();
  println!("part 1: {}", deduped);
}

