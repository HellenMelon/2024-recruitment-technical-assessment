use axum::{http::StatusCode, response::IntoResponse, Json};
use serde::{Deserialize, Serialize};

pub async fn process_data(Json(request): Json<DataRequest>) -> impl IntoResponse {
    // Calculate sums and return response

    let data = request.data;

    let mut string_len = 0;
    let mut int_sum = 0;

    string_len += data[0].len();
    int_sum += data[1].parse::<i32>().unwrap();
    int_sum += data[2].parse::<i32>().unwrap();
    string_len += data[4].len();
    string_len += data[5].len();

    println!("{}", string_len);
    println!("{}", int_sum);
    

    let response = DataResponse {
        string_len: string_len,
        int_sum: int_sum,
    };

    (StatusCode::OK, Json(response))
}

#[derive(Deserialize)]
pub struct DataRequest {
    // Add any fields here
    data: Vec<String>
}

#[derive(Serialize)]
pub struct DataResponse {
    // Add any fields here
    string_len: i32,
    int_sum: i32,
}
