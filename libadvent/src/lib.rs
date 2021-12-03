use std::env;
use std::fs;
use std::path::PathBuf;
use std::str::FromStr;

pub fn get_filename(f: Option<&str>) -> PathBuf {
    let mut cwd = match env::current_dir() {
        Ok(cwd) => cwd,
        Err(srsly) => panic!("{:?}", srsly),
    };

    match f {
        Some(p) => {
            let tc = PathBuf::from(p);
            if tc.is_absolute() {
                cwd = tc
            } else {
                cwd.push(p)
            }
        }
        None => {
            cwd.push("input");
        }
    };
    cwd
}

pub fn get_data(fname: Option<&str>) -> Result<String, std::io::Error> {
    let filename = get_filename(fname);
    fs::read_to_string(filename)
}

pub fn get_data_as_vec<T: FromStr>(fname: Option<&str>) -> Vec<T> {
    let data = get_data(fname).unwrap();
    data.split("\n")
        .filter_map(|e| e.parse::<T>().ok())
        .collect()
}
