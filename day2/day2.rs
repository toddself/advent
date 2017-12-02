use std::fs::File;
use std::io::prelude::*;

fn main() {
  let mut f = File::open("input.txt").expect("file not found");
  let mut contents = String::new();
  f.read_to_string(&mut contents).expect("something when wrong");
  let rows: Vec<&str> = contents.split("\n").collect();
  let len = rows.len();
  let strings: Vec<Vec<&str>> = rows.iter().filter_map(|x| x.split("").collect()).collect();

  let mut grid: Vec<Vec<i32>> = rows.iter().split("").collect();

  for x in 0..len {
    let row_string: Vec<_> = rows[x].split("").collect();
    let new_row: Vec<i32> = row_string.iter().filter_map(|x| x.parse().ok()).collect();
    grid.push(new_row)
  }


  println!("{:?}", grid)
}
