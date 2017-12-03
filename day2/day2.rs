use std::fs::File;
use std::io::prelude::*;

fn main() {
  let mut f = File::open("input.txt").expect("file not found");
  let mut contents = String::new();
  f.read_to_string(&mut contents).expect("something when wrong");
  let rows: Vec<Vec<i32>> = contents.trim().split("\n").map(|row| row.split("\t").filter_map(|x| x.parse().ok()).collect()).collect();
  let mut sol2: i32 = 0;

  let checksum1 = rows.iter().fold(0, |acc, row| acc + (row.iter().max().unwrap() - row.iter().min().unwrap()));
  println!("Checksum 1: {}", checksum1);

  for x in 0..rows.len() {
    let row = &rows[x];
    let lim = row.len();
    for i in 0..lim {
      let v = row[i];
      for j in 0..lim {
        if i != j {
          if v % row[j] == 0 {
            sol2 = sol2 + (v / row[j]);
          }
        }
      }
    }
  }

  println!("Checksum 2: {}", sol2);
}
