fn main() {
  let input: i64 = 277678;
  let mut shell: i64 = -1;
  let mut end: i64 = 0;
  let mut num_per_side: i64 = 0;
  let mut capture_next = true;
  let mut x = 0;

  while capture_next {
    let sq = (x as f64).sqrt();
    let sqi = sq as i64;
    if sq.fract() == 0.0 && sqi % 2 != 0 && capture_next {
      shell = shell + 1;
      if x > input {
        capture_next = false;
        end = x; 
        num_per_side = sqi - 1;
      }
    }
    x = x + 1;
  }


  let mut start: i64 = end - num_per_side;
  let mut l = true;

  while l {
    if start < input {
      l = false
    } else {
      end = start;
      start = end - num_per_side;
    }
  }

  let center = start + (num_per_side / 2).abs();
  let distance = (input - center).abs();

  println!("input: {}\nshell: {}\nstart: {}\nend: {}\ncenter: {}\ndistance to center: {}\nnum per side: {}", input, shell, start, end, center, distance, num_per_side); 
  println!("Distance to center: {}", distance + shell);
}
