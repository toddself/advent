use std::fs::File;
use std::io::prelude::*;

fn main() {
  let mut f = File::open("input.txt").expect("file not found");
  let mut contents = String::new();
  f.read_to_string(&mut contents).expect("something when wrong");
  let rows: Vec<&str> = contents.trim().split("\n").collect();
  let mut sol1: i32 = 0;
  let mut sol2: i32 = 0;

  for x in 0..rows.len() {
    let row: Vec<i32> = rows[x].split("\t").filter_map(|x| x.parse().ok()).collect();
    let min = row.iter().min().unwrap();
    let max = row.iter().max().unwrap();
    sol1 = sol1 + (max - min);

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

  println!("Checksum 1: {}", sol1);
  println!("Checksum 2: {}", sol2);
}
