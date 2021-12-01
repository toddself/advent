use std::env;
use std::fs;

pub fn get_data_as_vec_isize() -> Vec<isize> {
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
