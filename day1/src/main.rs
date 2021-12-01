use std::env;
use std::fs;

fn get_data_as_vec_isize() -> Vec<isize> {
    let filename = match env::current_dir() {
        Ok(mut cwd) => {
            cwd.push("input");
            cwd
        }
        Err(srsly) => panic!("{:?}", srsly),
    };
    let data = fs::read_to_string(filename).expect("can't read file {:?}!");
    data.split("\n")
        .filter_map(|e| e.parse::<isize>().ok())
        .collect()
}

fn main() {
    let data = get_data_as_vec_isize();
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

    println!("part 1: incremented {}", incr);
    println!("part 2: incremented {}", incr2);
}
