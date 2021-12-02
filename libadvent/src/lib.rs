use std::env;
use std::fs;
use std::str::FromStr;

pub fn get_data() -> Result<String, std::io::Error> {
    let filename = match env::current_dir() {
        Ok(mut cwd) => {
            cwd.push("input");
            cwd
        }
        Err(srsly) => panic!("{:?}", srsly),
    };
    fs::read_to_string(filename)
}

pub fn get_data_as_vec<T: FromStr>() -> Vec<T> {
    let data = get_data().unwrap();
    data.split("\n")
        .filter_map(|e| e.parse::<T>().ok())
        .collect()
}
